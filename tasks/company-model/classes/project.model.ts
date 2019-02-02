// enum ProjectStatus {
//   New = 'new',
//   Completed = 'completed',
// }


export class Project {

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

  public completeProject() {
    this.status = 'completed'
  }

}
