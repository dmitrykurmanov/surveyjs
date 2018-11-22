<div class:sjs-hide="!model.isShowing"  class={css.window.root}
  style="position: fixed; bottom: 3px; right: 10px; max-width: 60%;">
      <div class={css.window.header.root}>

          <span on:click="doExpand()" style="width: 100%; cursor: pointer;">
              <span style="padding-right:10px" class={css.window.header.title}>
                <SurveyString locString={model.survey.locTitle}/>
              </span>
              <span aria-hidden="true" class={getExpandedCss(css, model)}></span>
          </span>

          {#if model.isExpanded }
            <span on:click="doExpand()" style="float: right; cursor: pointer;">
                <span style="padding-right:10px" class={css.window.header.title}>
                  X
                </span>
            </span>
          {/if}
      </div>

      <div class:sjs-hide="!model.isExpanded" class={css.window.body}>
          <Survey surveyModel={model.survey} />
      </div>
  </div>

<script>
  import { surveyCss } from "../defaultCss/cssstandard";
  import { SurveyWindowModel } from "../SurveyWindow";
  import SurveyString from "./string.svelte";
  import Survey from "./survey.svelte";

  export default {
    data() {
      return {
        model: null,
        css: surveyCss.getCss()
      };
    },
    components: {
      Survey,
      SurveyString
    },
    oncreate() {
      debugger;
      const model = this.get().model;
      const handler = this.setModel.bind(this);

      model.expandedChangedCallback = handler;
      model.showingChangedCallback = handler;
      model.closeWindowOnCompleteCallback = handler;
    },
    ondestroy() {
      const model = this.get().model;

      model.expandedChangedCallback = null;
      model.showingChangedCallback = null;
      model.closeWindowOnCompleteCallback = null;
    },
    methods: {
      setModel() {
        this.set({ model: { ...this.get().model } });
      },
      doExpand() {
        const model = this.get().model;
        model.isExpanded = !model.isExpanded;
      }
    },
    helpers: {
      getExpandedCss(css, model) {
        return model.isExpanded
          ? css.window.header.buttonCollapsed
          : css.window.header.buttonExpanded;
      }
    }
  };
</script>