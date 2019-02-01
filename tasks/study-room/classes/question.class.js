class Question {
  constructor(description) {
    this.description = description;
    this.answers = [];
  }

  addAnswer(answerObj) {
    this.answers.push(answerObj);
  }
}

module.exports = Question;
