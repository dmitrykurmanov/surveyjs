<div class={getQuestionClass()}>
    {#if element.hasTitleOnLeftTop}
        <div class={element.hasTitleOnLeft ? 'title-left' : ''}>
            {#if element.hasTitle}
                <h5 class={element.cssClasses.title}>
                    <SurveyString locString={element.locTitle} />
                </h5>
            {/if}
            {#if element.hasDescription}
                <div class={element.cssClasses.description}>
                    <SurveyString locString={element.locDescription} />
                </div>
            {/if}
        </div>
    {/if}

    <div class={element.hasTitleOnLeft ? 'content-left' : ''}>
        {#if hasErrorsOnTop}
            <!-- <survey-errors question={element}/> -->
        {/if}

        <!-- <component :is="getWidgetComponentName(element)" :question="element" :css="css"/> -->
        
        {#if element.hasComment}
            <div>
                <div>{element.commentText}</div>
                <!-- <survey-other-choice commentClass={css.comment} question={element}/> -->
            </div>
        {/if}

        {#if hasErrorsOnBottom}
            <!-- <survey-errors question={element}/> -->
        {/if}

        {#if element.hasTitleOnBottom}
            <h5 class={element.cssClasses.title}>
                <SurveyString locString={element.locTitle} />
            </h5>
        {/if}
        {#if element.hasDescription}
            <div class={element.cssClasses.description + " " + applyShowHideClass(element.hasTitleOnBottom)}>
                <SurveyString locString={element.locDescription} />
            </div>
        {/if}
    </div>
</div>

<script>
  import { applyShowHideClass } from "./helpers";
  import SurveyString from "./string.svelte";

  export default {
    data() {
      return {
        survey: null,
        css: null,
        element: null
      };
    },
    components: {
      SurveyString
    },
    methods: {
      getWidgetComponentName() {
        if (this.element.customWidget) {
          return "survey-customwidget";
        }
        return "survey-" + this.element.getTemplate();
      },
      getQuestionClass() {
        if (!!this.element.errors && this.element.errors.length > 0) {
          return this.css.question.hasError;
        }
        return "";
      }
    },
    helpers: {
      applyShowHideClass
    },
    computed: {
      hasErrorsOnTop: ({ survey, element }) => {
        return !element.isPanel && survey.questionErrorLocation === "top";
      },
      hasErrorsOnBottom: ({ survey, element }) => {
        return !element.isPanel && survey.questionErrorLocation === "bottom";
      }
    }
  };
</script>

<style>
  .hide {
    visibility: hidden;
  }
  .show {
    visibility: visible;
  }
</style>