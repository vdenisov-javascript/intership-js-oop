/* ЗАДАНИЕ */

/*
  Написать модель учебного курса.
  Курс предполагает набор тем, в каждой теме несколько вопросов,
  на каждый вопрос несколько ответов (правильных и неправильных). 
*/

// ######################### //

class Answer {
  constructor(text, isCorrect) {
    this.text = text,
    this.isCorrect = isCorrect
  }
}

class Question {
  constructor(description, answers = []) {
    this.description = description;
    this.answers = answers;
  }
}

class Theme {
  constructor(title, questions = []) {
    this.title = title;
    this.questions = questions;
  }
}

class Course {
  constructor(name, themes = []) {
    this.name = name;
    this.themes = themes;
  }
}


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

        newQuestion.answers.push(newAnswer);
      }
      // } creating answers fot question

      newTheme.questions.push(newQuestion);   
    }
    // } creating questions for theme

    newCourse.themes.push(newTheme);
  }
  // } creating themes for course

  return newCourse;
}

// ######################### //


module.exports = {
  createCourse
};
