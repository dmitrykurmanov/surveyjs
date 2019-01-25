import { SurveyModel } from "../survey";
import { SurveyWindowModel } from "../surveyWindow";
import { surveyCss } from "../defaultCss/cssstandard";

export class SvelteSurveyModel extends SurveyModel {
  renderCallback: () => void;
  public render() {
    if (this.renderCallback) {
      this.renderCallback();
    }
  }
  get css() {
    return surveyCss.getCss();
  }
  set css(value: any) {
    this.mergeValues(value, this.css);
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
