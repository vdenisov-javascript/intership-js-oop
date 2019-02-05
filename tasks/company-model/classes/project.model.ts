import * as _ from 'lodash';


enum ProjectStatus {
  New       = 'new',
  Testing   = 'testing',
  Completed = 'completed',
}


export class Project {

  private static _lastId = 0;

  private static _params = {
    type: [ 'web', 'mobile' ],
    level: [ 1, 2, 3 ],
  };

  private _id: number;
  get id(): number    { return this._id; }
  set id(arg: number) { this._id = arg;  }

  private _type: string;
  get type(): string    { return this._type; }
  set type(arg: string) { this._type = arg;  }

  private _level: number;
  get level(): number    { return this._level; }
  set level(arg: number) { this._level = arg;  }

  private _status: string;
  get status(): string    { return this._status; }
  set status(arg: string) { this._status = arg;  }

  private _deadline: number;

  constructor() {
    this.id       = ++Project._lastId;
    this.type     = _.sample( Project._params.type );
    this.level    = _.sample( Project._params.level );
    this.status   = ProjectStatus.New;
    this._deadline = this.level;
  }

  public testProject() {
    this.status = ProjectStatus.Testing;
    this._deadline = 1;
  }

  public completeProject() {
    this.status = ProjectStatus.Completed;
    this._deadline = 0;
  }

  public checkThatTimeOut() {
    return (this._deadline === 0);
  }

  public reduceDeadline() {
    this._deadline -= 1;
  }

}
