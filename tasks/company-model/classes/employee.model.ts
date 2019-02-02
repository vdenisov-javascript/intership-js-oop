import { Project } from './';


export class Employee {

  private static _lastId = 0;

  public _id: number;

  public status: string;
  public currentProject: Project;

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

  public takeProject(project: Project): void {
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
