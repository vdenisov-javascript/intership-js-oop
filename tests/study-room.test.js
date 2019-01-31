const expect = require('chai').expect;


describe('Testing "study-room" from "Javacript-OOP"', () => {

  const studyRoom = require('../tasks/study-room/run');
  const courseInfo = require('./courseInfo.json');

  const createdCourseJS = studyRoom.createCourse(courseInfo);
  // assert.deepEqual(createdCourseJS, courseInfo);

  it('should have deep "string" property "name"', () => {  
    expect(createdCourseJS)
      .to.have.deep.property('name')
      .to.be.a('string');
  });

  it('should have deep "array" property "themes"', () => {  
    expect(createdCourseJS)
      .to.have.deep.property('themes')
      // .to.be.an('array')
      // .that.includes(2);

    // expect(createdCourseJS.name).to.be.an('array');
  });

});
