import { SurveyModel } from "../survey";
import { SurveyWindowModel } from "../surveyWindow";

export class SvelteSurveyModel extends SurveyModel {
  renderCallback: () => void;
  public render() {
    if (this.renderCallback) {
      this.renderCallback();
    }
  }
}

export class SvelteSurveyWindowModel extends SurveyWindowModel {
  constructor(jsonObj: any, initialModel: SurveyModel = null) {
    super(jsonObj, initialModel);
  }
  protected createSurvey(jsonObj: any): SurveyModel {
    return new SvelteSurveyModel(jsonObj);
  }
}

SurveyModel.platform = "svelte";
