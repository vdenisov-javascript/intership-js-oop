import * as _ from 'lodash';

import { Employee, Project } from './';


export class Department {

  private static maxLazyDaysForEmployee = 3;

  private _speciality:            string;

  private _freeEmployees:         Array<Employee>;
  private _busyEmployees:         Array<Employee>;

  private _currentProjects:       Array<Project>;
  private _executedProjects:      Array<Project>;

  private _counterHiredEmployees: number;
  private _counterFiredEmployees: number;

  get speciality():       string { return this._speciality; }

  get freeEmployees():    Array<Employee> { return this._freeEmployees };
  get busyEmployees():    Array<Employee> { return this._busyEmployees };

  get currentProjects():  Array<Project> { return this._currentProjects; }
  get executedProjects(): Array<Project> { return this._executedProjects; }

  constructor(spec: string) {
    this._speciality = spec;

    this._currentProjects = [];
    this._executedProjects = [];

    this._freeEmployees = [];
    this._busyEmployees = [];

    this._counterHiredEmployees = 0;
    this._counterFiredEmployees = 0;
  }

  public checkResourcesForProject(project: Project): boolean {
    if (project.status === 'new') {
      return (project.type === 'web')
        ? this._freeEmployees.length >= 1
        : this._freeEmployees.length >= project.level
    } else {
      return this._freeEmployees.length >= 1;
    }
  }

  public beginExecutionOfProject(project: Project): void {
    let requiredCount: number;
    
    if (project.status === 'new') {
      requiredCount = (project.type === 'web') ? 1 : project.level;
    } else {
      requiredCount = 1;
    }

    const requiredEmployees = this._freeEmployees.splice(0, requiredCount);
    for (const employee of requiredEmployees) {
      employee.takeProject(project);
    }
    this._busyEmployees.push( ...requiredEmployees );
  
  }

  public completeDayForEmployees(): void {

    // inspection for current projects {
    const currProjArr = [];

    for (let project of this._currentProjects) {
      project.reduceDeadline()
      if (project.checkThatTimeOut()) {

        (project.status === 'new')
          ? project.testProject()
          : project.completeProject();

        this._executedProjects.push(project);
      } else {
        currProjArr.push(project);
      }
    }

    this._currentProjects = currProjArr;
    // } inspection for current projects

    // inspection for free employees {
    for (let employee of this._freeEmployees) {
      employee.addRelaxDay();
    }
    // } inspection for free employees

    // inspection for busy employees {
    const [ freeArr, busyArr,  ] = [ [], [] ];

    for (let employee of this._busyEmployees) {
      if (employee.currentProject.checkThatTimeOut()) {
        employee.leaveProject();
        freeArr.push(employee);
      } else {
        busyArr.push(employee)
      }
    }

    this._freeEmployees.push( ...freeArr );
    this._busyEmployees = busyArr;
    // } inspection for busy employees
  }

  public fireLaziestEmployee() {
    const candidate = _.orderBy(
      this._freeEmployees.filter((employee: Employee) => {
        return employee.relaxDays > Department.maxLazyDaysForEmployee;
      }),
      ['skills'], ['asc']
    ).shift();      

    if (candidate) {
      this._freeEmployees = this._freeEmployees.filter((employee: Employee) => {
        employee.id !== candidate.id;
      });

      this._counterFiredEmployees += 1;
    }    
  }

  public getStatisticForEmployees() {
    return {
      hiredEmployees: this._counterHiredEmployees,
      firedEmployees: this._counterFiredEmployees,
    };
  }

  public addNewEmployee(employee: Employee) {
    this._freeEmployees.push(employee);
    this._counterHiredEmployees += 1;
  }

  public addCurrentProject(project: Project) {
    this._currentProjects.push(project);
  }

  public clearExecutedProjects() {
    this._executedProjects = [];
  }

}
