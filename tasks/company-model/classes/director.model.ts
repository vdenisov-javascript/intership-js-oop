import { Project, Company, Department } from './';
import * as helpers from '../shared/helpers';


export class Director {

  private static maxProjectsForDay = 4;
  private static variantsForProject = {
    type: [ 'web', 'mobile' ],
    level: [ 1, 2, 3 ]
  };

  // departments
  public webDepartment: Department;
  public mobileDepartment: Department;
  public testingDepartment: Department;

  // projects in buffer
  public newProjects: Array<Project>;
  public awaitingProjects: Array<Project>;
  public completedProjects: Array<Project>;

  constructor(
    public name: string
  ) {
    this.newProjects = [];
    this.awaitingProjects = [];
    this.completedProjects = [];
  }

  // get access to departments
  public manage(company: Company, ...departmentsNames: Array<string>) {
    departmentsNames.forEach((depName: string) => {
      this[ depName ] = company[ depName ];
    });
  }

  // get (generate) new projects
  public getNewProjects(count?: number) {
    if (!count) {
      count = Math.floor(
        Math.random() * Director.maxProjectsForDay 
      );
    }
    
    for (let i = 0; i <= count; i ++) {
      this.newProjects.push(
        new Project(
          // random type
          helpers.getRandomElementFromArray( Director.variantsForProject.type ),
          // random level
          helpers.getRandomElementFromArray( Director.variantsForProject.level ),
        )
      );
    }
  }

  // distribute new projects to departments
  public distributeNewProjects() {
    const buffer = [];
    this.newProjects.forEach((proj: Project) => {
      const success = this.transferProject( proj );
      // console.log('success', success);
      if (!success) buffer.push(proj);
    });
    this.newProjects = [];
    this.awaitingProjects.push( ...buffer );
  }

  // distribute awaiting projects to departments
  public distributeAwaitingProjects() {
    const buffer = [];
    this.awaitingProjects.forEach((proj: Project) => {
      const success = this.transferProject( proj );
      if (!success) buffer.push(proj);
    });

    this.awaitingProjects = [ ...buffer ];
  }

  // check type of project and transfer it to department
  // if this department has enough resources
  private transferProject(proj: Project) {
    let chosenDepart: Department;

    if (proj.status === 'new') {
      chosenDepart = (proj.type === 'web') ? this.webDepartment : this.mobileDepartment;
    } else {
      chosenDepart = this.testingDepartment;
    }

    const isDepartHasResources = chosenDepart.checkResourcesForProject(proj);
    
    if (isDepartHasResources) {
      // chosenBuffer.push(proj);
      chosenDepart.currentProjects.push(proj);
      chosenDepart.beginExecutionOfProject(proj);
      return true;
    } else {
      return false;
    }
  }

  public hireEmployeesForAwaitingProjects() {
    const needToHire = { web: 0, mobile: 0, testing: 0 };

    for (const proj of this.awaitingProjects) {
      if (proj.status === 'new') {
        if (proj.type === 'web') needToHire.web += 1;
        else needToHire.mobile += proj.level;
      } else {
        needToHire.testing += 1;
      }
    }

    this.webDepartment.hireEmployeesInAmountOf( needToHire.web );
    this.mobileDepartment.hireEmployeesInAmountOf( needToHire.mobile );
    this.testingDepartment.hireEmployeesInAmountOf( needToHire.testing );
  }

  public checkExecutedProjectsForEachDepartment() {
    // projects for testing
    this.awaitingProjects.push(
      ...this.webDepartment.executedProjects,
      ...this.mobileDepartment.executedProjects,
    );
    this.webDepartment.executedProjects = [];
    this.mobileDepartment.executedProjects = [];

    // projects for deletion
    this.completedProjects.push(
      ...this.testingDepartment.executedProjects,
    );
    this.testingDepartment.executedProjects = [];
  }

  public fireLaziestEmployeeFromEachDepartment() {
    this.webDepartment.fireLaziestEmployee();
    this.mobileDepartment.fireLaziestEmployee();
    this.testingDepartment.fireLaziestEmployee();
  }

  // days -= 1
  public subtractCurrentDay() {
    this.webDepartment.completeDayForEmployees();
    this.mobileDepartment.completeDayForEmployees();
    this.testingDepartment.completeDayForEmployees();
  }

  public collectStatisticsFromEachDepartment(): Object {
    const totalStats = {
      hiredEmployees: 0,
      firedEmployees: 0,
      completedProjects: 0,
    };

    const webStats = this.webDepartment.getStatisticForEmployees();
    totalStats.hiredEmployees += webStats['hiredEmployees'];
    totalStats.firedEmployees += webStats['firedEmployees'];

    const mobileStats = this.mobileDepartment.getStatisticForEmployees();
    totalStats.hiredEmployees += mobileStats['hiredEmployees'];
    totalStats.firedEmployees += mobileStats['firedEmployees'];

    const testingStats = this.mobileDepartment.getStatisticForEmployees();
    totalStats.hiredEmployees += testingStats['hiredEmployees'];
    totalStats.firedEmployees += testingStats['firedEmployees'];
    
    totalStats.completedProjects = this.completedProjects.length;

    return totalStats;
  }
  
}
