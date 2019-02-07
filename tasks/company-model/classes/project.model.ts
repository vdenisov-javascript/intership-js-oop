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

  private _id:        number;
  private _type:      string;
  private _level:     number;
  private _status:    string;
  private _deadline:  number;
  
  get id():     number  { return this._id; }
  get type():   string  { return this._type; }
  get level():  number  { return this._level; }
  get status(): string  { return this._status; }

  constructor() {
    this._id       = ++Project._lastId;
    this._type     = _.sample( Project._params.type );
    this._level    = _.sample( Project._params.level );
    this._status   = ProjectStatus.New;
    this._deadline = this._level;
  }

  public startTesting() {
    this._status    = ProjectStatus.Testing;
    this._deadline  = 1;
  }

  public complete() {
    this._status    = ProjectStatus.Completed;
    this._deadline  = 0;
  }

  public checkThatTimeOut() {
    return (this._deadline === 0);
  }

  public reduceDeadline() {
    this._deadline -= 1;
  }

}
