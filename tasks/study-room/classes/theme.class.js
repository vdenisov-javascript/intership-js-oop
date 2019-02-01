class Theme {
  constructor(title) {
    this.title = title;
    this.questions = [];
  }

  addQuestion(questionObj) {
    this.questions.push(questionObj);
  }
}

module.exports = Theme;
