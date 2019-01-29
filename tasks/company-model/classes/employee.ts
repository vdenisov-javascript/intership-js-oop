import { IProject } from './';


export interface IEmployee {
  _id: number;

  status: string;
  speciality: string;
  currentProject: IProject;

  skills: number;
  relaxDays: number;

  takeProject(project: IProject): void;
  leaveProject(): void;
}


export class Employee implements IEmployee {

  private static _lastId = 0;

  public _id: number;

  public status: string;
  public currentProject: IProject;

  public skills: number;
  public relaxDays: number;

  constructor(
    public speciality: string,
  ) {
    this._id = ++Employee._lastId;

    this.status = 'free';
    this.currentProject = null;
    
    this.skills = 0;
    this.relaxDays = 0;
  }

  public takeProject(project: IProject): void {
    this.status = 'busy';
    this.currentProject = project;
    this.relaxDays = 0;
  }

  public leaveProject(): void {
    this.status = 'free';
    this.currentProject = null;
    this.skills += 1;
  }

}
