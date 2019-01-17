const assert = require('assert');


describe('Testing "study-room" from "Javacript-OOP"', () => {

  const studyRoom = require('../tasks/study-room');
  const courseInfo = require('./courseInfo.json');

  it('should return correct object', () => {
    const createdCourseJS = studyRoom.createCourse(courseInfo);

    assert.deepEqual(createdCourseJS, courseInfo);
  });

});
