<div class:sjs-hide="!isShowing"  class={css.window.root}
  style="position: fixed; bottom: 3px; right: 10px; max-width: 60%;">
      <div class={css.window.header.root}>

          <span on:click="toggleExpand()" style="width: 100%; cursor: pointer;">
              <span style="padding-right:10px" class={css.window.header.title}>
                <SurveyString locString={surveyWindow.survey.locTitle}/>
              </span>
              <span aria-hidden="true" class={getExpandedCss(css, surveyWindow)}></span>
          </span>

          {#if isExpanded }
            <span on:click="toggleExpand()" style="float: right; cursor: pointer;">
                <span style="padding-right:10px" class={css.window.header.title}>
                  X
                </span>
            </span>
          {/if}
      </div>

      <div class:sjs-hide="!isExpanded" class={css.window.body}>
          <Survey surveyModel={surveyWindow.survey} />
      </div>
  </div>

<script>
  import { surveyCss } from "../defaultCss/cssstandard";
  import { SvelteSurveyWindowModel } from "./surveyModel";
  import SurveyString from "./string.svelte";
  import Survey from "./survey.svelte";

  export default {
    data() {
      return {
        window: undefined,
        survey: undefined,
        surveyWindow: undefined,
        isExpanded: undefined,
        isShowing: undefined,
        closeOnCompleteTimeout: undefined,
        css: surveyCss.getCss()
      };
    },
    components: {
      Survey,
      SurveyString
    },
    onstate({ previous }) {
      if (!previous) {
        // only first time call
        const window = this.get().window;
        const survey = this.get().survey;
        const isExpanded = this.get().isExpanded;
        const closeOnCompleteTimeout = this.get().closeOnCompleteTimeout;
        let surveyWindow = null;

        if (window) {
          this.set({ surveyWindow: window });
        } else {
          this.set({ surveyWindow: new SvelteSurveyWindowModel(null, survey) });
        }

        surveyWindow = this.get().surveyWindow;

        if (isExpanded !== undefined) {
          surveyWindow.isExpanded = isExpanded;
        }
        if (closeOnCompleteTimeout !== undefined) {
          surveyWindow.closeOnCompleteTimeout = closeOnCompleteTimeout;
        }
        surveyWindow.isShowing = true;
        this.set({ isShowing: true });
      }
    },
    oncreate() {
      const doHide = this.doHide.bind(this);
      const toggleShowing = this.toggleShowing.bind(this);
      const surveyWindow = this.get().surveyWindow;

      surveyWindow.closeWindowOnCompleteCallback = doHide;
      surveyWindow.showingChangedCallback = toggleShowing;
    },
    ondestroy() {
      const surveyWindow = this.get().surveyWindow;

      surveyWindow.showingChangedCallback = null;
      surveyWindow.closeWindowOnCompleteCallback = null;
    },
    methods: {
      toggleShowing() {
        this.set({ isShowing: this.get().surveyWindow.isShowing });
      },
      toggleExpand() {
        const surveyWindow = this.get().surveyWindow;
        const isExpanded = !surveyWindow.isExpanded;
        surveyWindow.isExpanded = isExpanded;
        this.set({ isExpanded: isExpanded });
      },
      doHide() {
        this.get().surveyWindow.isShowing = false;
      }
    },
    helpers: {
      getExpandedCss(css, surveyWindow) {
        return surveyWindow.isExpanded
          ? css.window.header.buttonCollapsed
          : css.window.header.buttonExpanded;
      }
    }
  };
</script>