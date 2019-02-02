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

  public _id: number;
  public type: string;
  public level: number;
  public status: string;
  public deadline: number;

  constructor() {
    this._id      = ++Project._lastId;
    this.type     = _.sample( Project._params.type );
    this.level    = _.sample( Project._params.level );
    this.status   = ProjectStatus.New;
    this.deadline = this.level;
  }

  public testProject() {
    this.status = ProjectStatus.Testing;
    this.deadline = 1;
  }

  public completeProject() {
    this.status = ProjectStatus.Completed;
    this.deadline = 0;
  }

  public checkThatStatusIs(str: string) {
    return (this.status === str);
  }

  public checkThatTypeIs(str: string) {
    return (this.type === str);
  }

  public checkThatTimeOut() {
    return (this.deadline === 0);
  }

  public getLevel() {
    return this.level;
  }

  public reduceDeadline() {
    this.deadline -= 1;
  }

}
