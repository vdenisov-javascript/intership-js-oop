import { Director, Department } from './';


export class Company {

  public webDepartment: Department;
  public mobileDepartment: Department;
  public testingDepartment: Department;

  constructor(
    public name: string,
    public director: Director,
  ) {}

  public createDepartment(name: string, speciality: string): void {
    this[name] = new Department(name, speciality);
  }

}
