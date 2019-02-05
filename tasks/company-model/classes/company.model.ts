import { Department } from './';


export class Company {

  private _webDepartment:      Department;
  private _mobileDepartment:   Department;
  private _testingDepartment:  Department;

  get webDepartment():      Department { return this._webDepartment; }
  get mobileDepartment():   Department { return this._mobileDepartment; }
  get testingDepartment():  Department { return this._testingDepartment; }

  constructor(private _name: string) {}

  public createDepartments(): void {
    this._webDepartment     = new Department('web');
    this._mobileDepartment  = new Department('mobile');
    this._testingDepartment = new Department('testing');
  }

}
