import * as _ from 'lodash';

import { Company, Department, Employee, Project } from './';

export class Director {

  /* tslint:disable:variable-name */

  private static _maxProjectsForDay = 4;

  // departments
  private _webDepartment: Department;
  private _mobileDepartment: Department;
  private _testingDepartment: Department;

  // projects in buffer
  private _newProjects: Project[];
  private _awaitingProjects: Project[];
  private _completedProjects: Project[];

  get webDepartment(): Department { return this._webDepartment; }
  get mobileDepartment(): Department { return this._mobileDepartment; }
  get testingDepartment(): Department { return this._testingDepartment; }

  get newProjects(): Project[] { return this._newProjects; }
  get awaitingProjects(): Project[] { return this._awaitingProjects; }
  get completedProjects(): Project[] { return this._completedProjects; }

  constructor(private _name: string) {
    this._newProjects = [];
    this._awaitingProjects = [];
    this._completedProjects = [];
  }

  // get access to departments
  public manage(company: Company) {
    this._webDepartment = company.webDepartment;
    this._mobileDepartment = company.mobileDepartment;
    this._testingDepartment = company.testingDepartment;
  }

  // get (generate) new projects
  public getNewProjects(count?: number) {
    const needToCreate = count || _.random(0, Director._maxProjectsForDay);

    for (let i = 0; i < needToCreate; i ++) {
      this._newProjects.push(new Project());
    }
  }

  // distribute new projects to departments
  public distributeNewProjects() {
    const buffer = [];
    this._newProjects.forEach((proj: Project) => {
      const success = this.transferProject( proj );
      // console.log('success', success);
      if (!success) { buffer.push(proj); }
    });
    this._newProjects = [];
    this._awaitingProjects.push( ...buffer );
  }

  // distribute awaiting projects to departments
  public distributeAwaitingProjects() {
    const buffer = [];
    this._awaitingProjects.forEach((proj: Project) => {
      const success = this.transferProject( proj );
      if (!success) { buffer.push(proj); }
    });

    this._awaitingProjects = [ ...buffer ];
  }

  public hireEmployeesForAwaitingProjects() {
    const needToHire = { web: 0, mobile: 0, testing: 0 };

    for (const proj of this._awaitingProjects) {
      if (proj.status === 'new') {
        (proj.type === 'web') ? (needToHire.web += 1) : (needToHire.mobile += proj.level);
      } else {
        needToHire.testing += 1;
      }
    }

    this._hireEmployeesInAmountOf(this._webDepartment, needToHire.web);
    this._hireEmployeesInAmountOf(this._mobileDepartment, needToHire.mobile);
    this._hireEmployeesInAmountOf(this._testingDepartment, needToHire.testing);
  }

  public checkExecutedProjectsForEachDepartment() {
    // projects for testing
    this._awaitingProjects.push(
      ...this._webDepartment.executedProjects,
      ...this._mobileDepartment.executedProjects,
    );
    this._webDepartment.clearExecutedProjects();
    this._mobileDepartment.clearExecutedProjects();

    // projects for deletion
    this._completedProjects.push(
      ...this._testingDepartment.executedProjects,
    );
    this._testingDepartment.clearExecutedProjects();
  }

  public fireLaziestEmployeeFromEachDepartment() {
    this._fireLaziestEmployeeIn(this._webDepartment);
    this._fireLaziestEmployeeIn(this._mobileDepartment);
    this._fireLaziestEmployeeIn(this._testingDepartment);
  }

  // days -= 1
  public subtractCurrentDay() {
    this._webDepartment.completeDayForEmployees();
    this._mobileDepartment.completeDayForEmployees();
    this._testingDepartment.completeDayForEmployees();
  }

  public collectStatisticsFromEachDepartment(): object {
    const totalStats = {
      hiredEmployees: 0,
      firedEmployees: 0,
      completedProjects: 0,
    };

    const webStats = this._webDepartment.getStatisticForEmployees();
    totalStats.hiredEmployees += webStats.hiredEmployees;
    totalStats.firedEmployees += webStats.firedEmployees;

    const mobileStats = this._mobileDepartment.getStatisticForEmployees();
    totalStats.hiredEmployees += mobileStats.hiredEmployees;
    totalStats.firedEmployees += mobileStats.firedEmployees;

    const testingStats = this._mobileDepartment.getStatisticForEmployees();
    totalStats.hiredEmployees += testingStats.hiredEmployees;
    totalStats.firedEmployees += testingStats.firedEmployees;

    totalStats.completedProjects = this._completedProjects.length;

    return totalStats;
  }

  private _hireEmployeesInAmountOf(department: Department, countNeedToHire: number) {
    const freeCount = department.freeEmployees.length;
    const notEnough = countNeedToHire - freeCount;

    if (notEnough > 0) {
      // tslint:disable-next-line:no-console
      console.log(`
        #${ department.speciality }
          * need : ${ countNeedToHire }
          * free : ${ freeCount }
          * hire : ${ notEnough }
      `);

      for (let i = 0; i < notEnough; i++) {
        const worker = new Employee(department.speciality);
        department.addNewEmployee(worker);
      }
    }
  }

  // check type of project and transfer it to department
  // if this department has enough resources
  private transferProject(proj: Project) {
    const chosenDepart = (proj.status === 'new')
      ? ((proj.type === 'web') ? this._webDepartment : this._mobileDepartment)
      : this._testingDepartment;

    const isDepartHasResources = chosenDepart.checkResourcesForProject(proj);

    if (isDepartHasResources) {
      chosenDepart.addCurrentProject(proj);
      chosenDepart.beginExecutionOfProject(proj);
      return true;
    }

    return false;
  }

  private _fireLaziestEmployeeIn(department: Department) {
    const arrayOfFree = department.freeEmployees;

    const candidate = _.orderBy(
      arrayOfFree.filter((employee: Employee) => {
        return employee.relaxDays > Employee.maxLazyDays;
      }),
      ['skills'], ['asc']).shift();

    if (candidate) {
      department.freeEmployees = arrayOfFree.filter((employee: Employee) => {
        return employee.id !== candidate.id;
      });
      department.increaseCounterFired();
    }
  }

}
