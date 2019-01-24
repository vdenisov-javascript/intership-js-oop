import { IProject, IEmployee } from './';


export interface IDepartment {
  name: string;
  speciality: string;

  freeEmployees: Array<IEmployee>;
  busyEmployees: Array<IEmployee>;
  firedEmployees: Array<IEmployee>;

  checkResourcesForProject(project: IProject): boolean;
  beginExecutionOfProject(project: IProject): void;
  completeThisDay(): void;
}


export class Department implements IDepartment {

  public freeEmployees: Array<IEmployee>;
  public busyEmployees: Array<IEmployee>;
  public firedEmployees: Array<IEmployee>;

  constructor(
    public name: string,
    public speciality: string,
  ) {
    this.firedEmployees = [];
    this.busyEmployees = [];
    this.firedEmployees = [];
  }

  public checkResourcesForProject(project: IProject): boolean {
    if (project.status !== 'test') {
      return (project.type === 'web')
        ? this.freeEmployees.length >= 1
        : this.freeEmployees.length >= project.level;
    } else {
      return this.freeEmployees.length >= 1;
    }

    // return !! Math.round( Math.random() );
    // return project.level < 3;
  }

  public addNewEmployee(employee: IEmployee) {
    this.freeEmployees.push(employee);
  }

  public beginExecutionOfProject(project: IProject): void {
    return null;
  }

  public completeThisDay() {
    return null;
  }
}
