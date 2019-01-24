import {
  Project, IProject,
  ICompany,
  IDepartment
} from './';


import * as helpers from './../helpers';


export interface IDirector {
  name: string;

  newProjects: Array<IProject>;
  awaitingProjects: Array<IProject>;
  completedProjects: Array<IProject>; 
  
  webProjects: Array<IProject>;
  mobileProjects: Array<IProject>;
  testingProjects: Array<IProject>;

  // PRIVATE
  // webDepartment: IDepartment;
  // mobileDepartment: IDepartment;
  // testingDepartment: IDepartment;
}


export class Director implements IDirector {

  private static maxProjectsForDay = 4;
  private static variantsForProject = {
    type: [ 'web', 'mobile' ],
    level: [ 1, 2, 3 ]
  };

  // departments
  private webDepartment: IDepartment;
  private mobileDepartment: IDepartment;
  private testingDepartment: IDepartment;

  // projects in buffer
  public newProjects: Array<IProject>;
  public awaitingProjects: Array<IProject>;
  public completedProjects: Array<IProject>; 

  // projects in departments
  public webProjects: Array<IProject>;
  public mobileProjects: Array<IProject>;
  public testingProjects: Array<IProject>;

  constructor(
    public name: string
  ) {
    this.newProjects = [];
    this.awaitingProjects = [];
    this.completedProjects = [];

    this.webProjects = [];
    this.mobileProjects = [];
    this.testingProjects = [];    
  }

  // get access to departments
  public manage(company: ICompany, ...departmentsNames: Array<string>) {
    departmentsNames.forEach((depName: string) => {
      this[ depName ] = company[ depName ];
    });
  }

  // get (generate) new projects
  public getNewProjects() {
    // const count = Math.floor(
    //   Math.random() * Director.maxProjectsForDay 
    // );
    const count = 10;
    
    for (let i = 0; i < count; i ++) {
      this.newProjects.push(
        new Project(
          // random type
          helpers.getRandomElementFromArray( Director.variantsForProject.type ),
          // random level
          helpers.getRandomElementFromArray( Director.variantsForProject.level ),
        )
      );
    }
  }

  // distribute new projects to departments
  public distributeNewProjects() {
    const buffer = [];
    this.newProjects.forEach((proj: IProject) => {
      const success = this.transferProject( proj );
      // console.log('success', success);
      if (!success) buffer.push(proj);
    });
    this.newProjects = [];
    this.awaitingProjects.push( ...buffer );
  }

  // distribute awaiting projects to departments
  public distributeAwaitingProjects() {
    const buffer = [];
    this.awaitingProjects.forEach((proj: IProject) => {
      const success = this.transferProject( proj );
      if (!success) buffer.push(proj);
    });

    this.awaitingProjects = [ ...buffer ];
  }

  // check type of project and transfer it to department
  // if this department has enough resources
  private transferProject(proj: IProject) {
    let chosenDepart: IDepartment;
    let chosenBuffer: Array<IProject>; 

    if (proj.status !== 'test') {

      (proj.type === 'web')
      ? [ chosenDepart, chosenBuffer ] = [ this.webDepartment, this.webProjects ]
      : [ chosenDepart, chosenBuffer ] = [ this.mobileDepartment, this.mobileProjects ];

    } else {

      [ chosenDepart, chosenBuffer ] = [ this.testingDepartment, this.testingProjects ];

    }

    const isDepartHasResources = chosenDepart.checkResourcesForProject(proj);
    
    if (isDepartHasResources) {
      chosenBuffer.push(proj);
      chosenDepart.beginExecutionOfProject(proj);
      return true;
    } else {
      return false;
    }
  }

  // days -= 1
  public subtractCurrentDay() {
    this.webDepartment.completeThisDay();
    this.mobileDepartment.completeThisDay();
    this.testingDepartment.completeThisDay();
  }
  
}
