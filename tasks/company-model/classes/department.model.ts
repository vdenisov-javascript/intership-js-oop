import * as _ from 'lodash';

import { Employee, Project } from './';

export class Department {

  /* tslint:disable:variable-name */

  private _speciality: string;

  private _freeEmployees: Employee[];
  private _busyEmployees: Employee[];

  private _currentProjects: Project[];
  private _executedProjects: Project[];

  private _counterHiredEmployees: number;
  private _counterFiredEmployees: number;

  get speciality(): string { return this._speciality; }

  get freeEmployees(): Employee[] { return this._freeEmployees; }
  set freeEmployees(arg: Employee[]) { this._freeEmployees = arg;  }
  get busyEmployees(): Employee[] { return this._busyEmployees; }

  get currentProjects(): Project[] { return this._currentProjects; }
  get executedProjects(): Project[] { return this._executedProjects; }

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
        : this._freeEmployees.length >= project.level;
    } else {
      return this._freeEmployees.length >= 1;
    }
  }

  public beginExecutionOfProject(project: Project): void {
    const requiredCount = (project.status === 'new')
      ? ((project.type === 'web') ? 1 : project.level)
      : 1;

    const requiredEmployees = this._freeEmployees.splice(0, requiredCount);
    for (const employee of requiredEmployees) {
      employee.takeProject(project);
    }
    this._busyEmployees.push( ...requiredEmployees );
  }

  public completeDayForEmployees(): void {

    // inspection for current projects {
    const currProjArr = [];

    for (const project of this._currentProjects) {
      project.reduceDeadline();
      if (project.checkThatTimeOut()) {
        (project.status === 'new') ? (project.startTesting()) : (project.complete());
        this._executedProjects.push(project);
      } else {
        currProjArr.push(project);
      }
    }

    this._currentProjects = currProjArr;
    // } inspection for current projects

    // inspection for free employees {
    this._freeEmployees.forEach((employee: Employee) => employee.addRelaxDay);
    // } inspection for free employees

    // inspection for busy employees {
    const [ freeArr, busyArr ] = [ [], [] ];

    for (const employee of this._busyEmployees) {
      if (employee.currentProject.checkThatTimeOut()) {
        employee.leaveProject();
        freeArr.push(employee);
      } else {
        busyArr.push(employee);
      }
    }

    this._freeEmployees.push( ...freeArr );
    this._busyEmployees = busyArr;
    // } inspection for busy employees
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

  public increaseCounterFired() {
    this._counterFiredEmployees += 1;
  }

  public addCurrentProject(project: Project) {
    this._currentProjects.push(project);
  }

  public clearExecutedProjects() {
    this._executedProjects = [];
  }

}
