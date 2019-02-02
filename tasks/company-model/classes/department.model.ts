import * as _ from 'lodash';

import { Employee, Project } from './';


export class Department {

  private static maxLazyDaysForEmployee = 3;

  public currentProjects: Array<Project>;
  public executedProjects: Array<Project>;

  public freeEmployees: Array<Employee>;
  public busyEmployees: Array<Employee>;

  counterHiredEmployees: number;
  counterFiredEmployees: number;

  constructor(
    public name: string,
    public speciality: string,
  ) {
    this.currentProjects = [];
    this.executedProjects = [];

    this.freeEmployees = [];
    this.busyEmployees = [];

    this.counterHiredEmployees = 0;
    this.counterFiredEmployees = 0;
  }

  public checkResourcesForProject(project: Project): boolean {
    if (project.status === 'new') {
      return (project.type === 'web')
        ? this.freeEmployees.length >= 1
        : this.freeEmployees.length >= project.level;
    } else {
      return this.freeEmployees.length >= 1;
    }
  }

  public beginExecutionOfProject(project: Project): void {
    let requiredCount: number;
    
    if (project.status === 'new') {
      requiredCount = (project.type === 'web') ? 1 : project.level;
    } else {
      requiredCount = 1;
    }

    const requiredEmployees = this.freeEmployees.splice(0, requiredCount);
    for (const employee of requiredEmployees) {
      employee.takeProject(project);
    }
    this.busyEmployees.push( ...requiredEmployees );
  
  }

  public hireEmployeesInAmountOf(count: number): void {
    const freeCount = this.freeEmployees.length;
    const notEnough = count - freeCount;
    
    if (notEnough > 0) {
      console.log(`
        #${ this.speciality }
          * free : ${ this.freeEmployees.length }
          * need : ${ count }
          * hire : ${ notEnough }
      `);

      for (let i = 0; i < notEnough; i++) {
        const worker = new Employee(this.speciality);
        this.freeEmployees.push(worker);
        this.counterHiredEmployees += 1;
      }
    }
  }

  public completeDayForEmployees(): void {

    // inspection for current projects {
    const currProjArr = [];

    for (let project of this.currentProjects) {
      project.daysBeforeDeadline -= 1;
      if (project.daysBeforeDeadline === 0) {

        if (project.status === 'new') {
          project.status = 'testing';
          project.daysBeforeDeadline = 1;
        } else {
          project.status = 'completed';
        }

        this.executedProjects.push(project);
      } else {
        currProjArr.push(project);
      }
      // project.daysBeforeDeadline -= 1;
      // if (project.daysBeforeDeadline < 1) {
      //   project.status = (project.status === 'new') ? 'testing' : 'completed';
      //   this.executedProjects.push(project);
      // } else {
      //   currProjArr.push(project);
      // }
    }

    this.currentProjects = currProjArr;
    // } inspection for current projects

    // inspection for free employees {
    for (let employee of this.freeEmployees) {
      employee.relaxDays += 1;
    }
    // } inspection for free employees

    // inspection for busy employees {
    const [ freeArr, busyArr,  ] = [ [], [] ];

    for (let employee of this.busyEmployees) {
      if (employee.currentProject.daysBeforeDeadline < 1) {
        employee.leaveProject();
        freeArr.push(employee);
      } else {
        busyArr.push(employee)
      }
    }

    this.freeEmployees.push( ...freeArr );
    this.busyEmployees = busyArr;
    // } inspection for busy employees
  }

  public fireLaziestEmployee() {
    const lazyEmployees = this.freeEmployees.filter((employee: Employee) => {
      return employee.relaxDays > Department.maxLazyDaysForEmployee;
    });

    const candidate = _.orderBy(lazyEmployees, ['asc'], ['desc']).shift();

    if (candidate) {
      this.freeEmployees = this.freeEmployees.filter((employee: Employee) => {
        employee._id !== candidate._id;
      });

      this.counterFiredEmployees += 1;
    }    
  }

  public getStatisticForEmployees() {
    return {
      hiredEmployees: this.counterHiredEmployees,
      firedEmployees: this.counterFiredEmployees,
    };
  }

}
