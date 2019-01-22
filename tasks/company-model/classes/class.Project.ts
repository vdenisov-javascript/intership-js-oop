import { getRandomElementFromArray } from './../helpers';

let lastId = 0;

const variantsFor = {
  type: [ 'web', 'mobile' ],
  level: [ 1, 2, 3 ]
}

export class Project {

  public _id: number;
  public type: string;
  public level: number;
  public status: string;
  public deadLine: number;

  constructor() {
    this._id = ++lastId;
    this.type = getRandomElementFromArray(variantsFor.type);
    this.level = getRandomElementFromArray(variantsFor.level);
    this.status = 'new';
    this.deadLine = this.level;
  }

}
