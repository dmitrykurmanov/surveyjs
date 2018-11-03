<div class={getQuestionClass(element, css)}>
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
            <SurveyErrors question={element} />
        {/if}

        <svelte:component this={dynamicComponent} question={element} css={css}/>
        
        {#if element.hasComment}
            <div>
                <div>{element.commentText}</div>
                <OtherChoice commentClass={css.comment} question={element} />
            </div>
        {/if}

        {#if hasErrorsOnBottom}
            <SurveyErrors question={element} />
        {/if}

        {#if element.hasTitleOnBottom}
            <h5 class={element.cssClasses.title}>
                <SurveyString locString={element.locTitle} />
            </h5>
        {/if}
        {#if element.hasDescription}
            <div class:sjs-hide="!element.hasTitleOnBottom" class={element.cssClasses.description}>
                <SurveyString locString={element.locDescription} />
            </div>
        {/if}
    </div>
</div>

<script>
  import SurveyString from "./string.svelte";
  import SurveyErrors from "./errors.svelte";
  import OtherChoice from "./otherChoice.svelte";
  import { listenArrayChanged } from "./utils";

  import radiogroup from "./radiogroup.svelte";
  import checkbox from "./checkbox.svelte";

  export default {
    data() {
      return {
        survey: null,
        css: null,
        element: null
      };
    },
    components: {
      SurveyString,
      SurveyErrors,
      OtherChoice
    },
    onupdate() {
      const element = this.get().element;
      listenArrayChanged(element, () => {
        this.set({ element, ...element });
      });
    },
    helpers: {
      getQuestionClass(element, css) {
        if (!!element.errors && element.errors.length > 0) {
          return css.question.hasError;
        }
        return "";
      }
    },
    computed: {
      hasErrorsOnTop: ({ survey, element }) => {
        return !element.isPanel && survey.questionErrorLocation === "top";
      },
      hasErrorsOnBottom: ({ survey, element }) => {
        return !element.isPanel && survey.questionErrorLocation === "bottom";
      },
      dynamicComponent: ({ element }) => {
        const components = {radiogroup, checkbox};
        return components[element.getTemplate()];
      }
    }
  };
</script>