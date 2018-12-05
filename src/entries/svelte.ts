// model
// import "../main.scss";
// export { StylesManager } from "../stylesmanager";
export * from "./chunks/model";

// localization
import "./chunks/localization";

// helpers
export * from "./chunks/helpers";

export { surveyCss } from "../defaultCss/cssstandard";
// css standard
export { defaultStandardCss } from "../defaultCss/cssstandard";
// css bootstrap
export { defaultBootstrapCss } from "../defaultCss/cssbootstrap";
// css bootstrap + material
export {
  defaultBootstrapMaterialCss
} from "../defaultCss/cssbootstrapmaterial";

export { SvelteSurveyModel as Model } from "../svelte/surveyModel";
export { SvelteSurveyWindowModel as WindowModel } from "../svelte/surveyModel";

import Survey from "../svelte/survey.svelte";
export { Survey };
import SurveyWindow from "../svelte/window.svelte";
export { SurveyWindow };


// import { SvelteSurveyModel } from "../svelte/surveyModel";
// export { SvelteSurveyModel as Model };
// import { SvelteSurveyWindowModel } from "../svelte/surveyModel";
// export { SvelteSurveyWindowModel as WindowModel };
