const { Course, Theme, Question, Answer } = require('./classes');

// ######################### //

function createCourse(jsonCourse) {
  const newCourse = new Course(jsonCourse.name);

  // creating themes for course {
  for (let jsonTheme of jsonCourse.themes) {
    const newTheme = new Theme(jsonTheme.title);

    // creating questions for theme {
    for (let jsonQuestion of jsonTheme.questions) {
      const newQuestion = new Question(jsonQuestion.description);

      // creating answers fot question {
      for (let jsonAnswer of jsonQuestion.answers) {
        const newAnswer = new Answer(jsonAnswer.text, jsonAnswer.isCorrect);

        // WRONG: newQuestion.answers.push(newAnswer);
        newQuestion.addAnswer(newAnswer);
      }
      // } creating answers fot question

      // WRONG: newTheme.questions.push(newQuestion);
      newTheme.addQuestion(newQuestion);
    }
    // } creating questions for theme

    // WRONG: newCourse.themes.push(newTheme);
    newCourse.addTheme(newTheme);
  }
  // } creating themes for course

  return newCourse;
}

// ######################### //

module.exports = { createCourse };
