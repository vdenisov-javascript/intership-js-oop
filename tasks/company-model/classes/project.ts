export interface IProject {
  _id: number;

  type: string;
  level: number;
  status: string;
  daysBeforeDeadline: number;
}


export class Project implements IProject {

  private static _lastId = 0;

  public _id: number;
  public status: string;
  public daysBeforeDeadline: number;

  constructor(
    public type: string,
    public level: number,
  ) {
    this._id = ++Project._lastId;
    this.status = 'new';

    this.daysBeforeDeadline = this.level;
  }

}
