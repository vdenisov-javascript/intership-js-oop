import { Project } from './';


enum EmployeeStatus {
  Free = 'free',
  Busy = 'busy',
}


export class Employee {

  private static _lastId = 0;

  private _id:              number;
  private _status:          string;
  private _skills:          number;
  private _relaxDays:       number;
  private _currentProject:  Project;

  get id():             number  { return this._id; }
  get status():         string  { return this._status; }
  get skills():         number  { return this._skills; }
  get relaxDays():      number  { return this._relaxDays; }
  get currentProject(): Project { return this._currentProject; }

  constructor(
    public speciality: string,
  ) {
    this._id              = ++Employee._lastId;
    this._status          = EmployeeStatus.Free;
    this._skills          = 0;
    this._relaxDays       = 0;
    this._currentProject  = null;   
  }

  public takeProject(project: Project): void {
    this._status          = EmployeeStatus.Busy;
    this._relaxDays       = 0;
    this._currentProject  = project;
  }

  public leaveProject(): void {
    this._status          = EmployeeStatus.Free;
    this._skills          += 1;
    this._currentProject  = null;
  }

  public addRelaxDay() {
    this._relaxDays += 1;
  }

}
