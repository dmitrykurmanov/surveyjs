function init() {
  Survey.StylesManager.applyTheme("default");

  var json = {
    questions: [
      {
        type: "radiogroup",
        name: "car",
        title: "What car are you driving?",
        isRequired: true,
        hasOther: true,
        colCount: 4,
        choices: [
          "None",
          "Ford",
          "Vauxhall",
          "Volkswagen",
          "Nissan",
          "Audi",
          "Mercedes-Benz",
          "BMW",
          "Peugeot",
          "Toyota",
          "Citroen"
        ]
      }
    ]
  };
  window.survey = new Survey.Model(json);

  survey.data = {
    car: "BMW"
  };

  survey.onComplete.add(function(result) {
    document.querySelector("#surveyResult").innerHTML =
      "result: " + JSON.stringify(result.data);
  });

  var svelteSurvey = new Survey.Survey({
    target: document.querySelector("#surveyElement"),
    data: {
      surveyModel: survey
    }
  });
  // var svelteSurvey = new Survey.SurveyWindow({
  //   target: document.querySelector("#surveyElement"),
  //   data: {
  //     survey: survey
  //   }
  // });
}

if (!window["%hammerhead%"]) {
  init();
}
