import { IDirector, Department, IDepartment } from '.';


export interface ICompany {
  name: string;
  director: IDirector;

  webDepartment?: IDepartment;
  mobileDepartment?: IDepartment;
  testingDepartment?: IDepartment;

  createDepartment(name: string, speciality: string): void;
}


export class Company implements ICompany {

  constructor(
    public name: string,
    public director: IDirector,
  ) {}

  public createDepartment(name: string, speciality: string): void {
    this[name] = new Department(name, speciality);
  }
}
