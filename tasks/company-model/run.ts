import {
  Director,
  Company, ICompany
} from './classes';


function startCompanyDuring(days = 10) {

  // create director and company
  const johnGreen = new Director('John Green');
  const enterprise: ICompany = new Company('Enterprise', johnGreen);

  // create departments in company
  const [ webDep, mobDep, testDep ] = [ 'webDepartment', 'mobileDepartment', 'testingDepartment' ];

  enterprise.createDepartment(webDep, 'web');
  enterprise.createDepartment(mobDep, 'mobile');
  enterprise.createDepartment(testDep, 'testing');

  // transfer of company management to director
  johnGreen.manage(enterprise, webDep, mobDep, testDep);

  // ############################################################

  // distribute awaiting projects
  johnGreen.distributeAwaitingProjects();

  // get new projects
  johnGreen.getNewProjects();

  // distribute new projects
  johnGreen.distributeNewProjects();





  // complete this day for company
  // johnGreen.subtractCurrentDay();

  // ############################################################

  console.log('awaiting projects => ', johnGreen.awaitingProjects.length);
  console.log(johnGreen.awaitingProjects);

  return {
    'hiredEmployees': 0,
    'dismissedEmployees': 0,
    'completedProjects': 0
  };

}


const statistic = startCompanyDuring(365);
console.log(
  '\n\n >>> TOTAL STATISTICS <<< \n\n',
  JSON.stringify(statistic, null, 4)
);
