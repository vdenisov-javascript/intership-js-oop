import 'colors';
import * as _ from 'lodash';

import { Director, Company } from './classes';


function startCompanyDuring(days = 10) {

  // create director and company
  const johnGreen = new Director('John Green');
  const enterprise = new Company('Enterprise', johnGreen);

  // create departments in company
  const [ webDep, mobDep, testDep ] = [ 'webDepartment', 'mobileDepartment', 'testingDepartment' ];

  enterprise.createDepartment(webDep, 'web');
  enterprise.createDepartment(mobDep, 'mobile');
  enterprise.createDepartment(testDep, 'testing');

  // transfer of company management to director
  johnGreen.manage(enterprise, webDep, mobDep, testDep);

  // ############################################################

  console.log('##########################');

  for (let day = 1; day < days+1; day++) {

  console.log(`

        DAY #${ day }: start
  `.bgWhite.black.bold);

  // Print: awaiting projects 
  {
    console.log(`
      yesterday AWAITING projects
    `.bgYellow.red.italic);

    for (let proj of johnGreen.awaitingProjects) {
      console.log(JSON.stringify( proj ));
    }
  }

  // YESTERDAY PROJECTS {

    // Step: hire employees for awaiting projects
    johnGreen.hireEmployeesForAwaitingProjects();

    // Step: distribute awaiting projects
    johnGreen.distributeAwaitingProjects(); 

  // } YESTERDAY PROJECTS

  // TODAY PROJECTS {

    // Step: get new projects
    johnGreen.getNewProjects();

    // Print: new projects 
    {
      console.log(`
        NEW projects
      `.bgGreen.blue.italic);

      for (let proj of johnGreen.newProjects) {
        console.log(JSON.stringify( proj ));
      }
    }

    // Step: distribute new projects
    johnGreen.distributeNewProjects();

    // Print: awaiting projects 
    {
      console.log(`
        today AWAITING projects
      `.bgYellow.red.italic);

      for (let proj of johnGreen.awaitingProjects) {
        console.log(JSON.stringify( proj ));
      }
    }

    console.log(`

      DAY #${ day }: checking
    `.bgWhite.black.bold);

    // Print: projects: web
    {
      console.log(`
        WEB projects
      `.bgBlue.yellow.italic);

      for (let proj of johnGreen.webDepartment.currentProjects) {
        console.log(JSON.stringify( proj ));
      }
    }

    // Print: projects: mobile
    {
      console.log(`
        MOBILE projects
      `.bgBlue.yellow.italic);

      for (let proj of johnGreen.mobileDepartment.currentProjects) {
        console.log(JSON.stringify( proj ));
      }
    }

    // Print: projects: testing
    {
      console.log(`
        TESTING projects
      `.bgBlue.yellow.italic);

      for (let proj of johnGreen.testingDepartment.currentProjects) {
        console.log(JSON.stringify( proj ));
      }
    }

  // } TODAY PROJECTS

  console.log(`

    DAY #${ day }: finish
  `.bgWhite.black.bold);

  // END OF DAY {
    
    // Step: complete current day
    johnGreen.subtractCurrentDay();

    // Step: check executed projects for every department
    johnGreen.checkExecutedProjectsForEachDepartment();

    // Step: fire laziest employee from every department
    johnGreen.fireLaziestEmployeeFromEachDepartment();

    // Print: projects: completed
    {
      console.log(`
        COMPLETED projects
      `.bgRed.yellow.italic);

      console.log(`total : ${johnGreen.completedProjects.length}`)

      const completedProjectsSorted = _.orderBy(
        johnGreen.completedProjects, ['_id'], ['asc']
      );

      for (let proj of completedProjectsSorted) {
        console.log(`* id = ${proj._id}\t=>`, JSON.stringify( proj ));
      }
    }
  
  // } END OF DAY

  }

  // ############################################################

  // console.log(johnGreen.completedProjects);

  // Step: get statistic
  return johnGreen.collectStatisticsFromEachDepartment();
}


const statistic = startCompanyDuring(10);
console.log(
  '\n\n >>> TOTAL STATISTICS <<< \n\n',
  JSON.stringify(statistic, null, 4)
);
