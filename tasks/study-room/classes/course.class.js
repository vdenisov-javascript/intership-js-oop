class Course {
  constructor (name) {
    this.name = name;
    this.themes = [];
  }

  addTheme (themeObj) {
    this.themes.push(themeObj);
  }
}

module.exports = Course;
