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
  import comment from "./comment.svelte";
  import matrix from "./matrix.svelte";
  import matrixdropdown from "./matrixdropdown.svelte";
  import matrixdynamic from "./matrixdynamic.svelte";
  import boolean from "./boolean.svelte";
  import dropdown from "./dropdown.svelte";
  import rating from "./rating.svelte";
  import text from "./text.svelte";
  import html from "./html.svelte";
  import empty from "./empty.svelte";

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
      addCoreTwoWayBinding(element, () => {
        this.set({ element, ...element });
      });
    },
    ondestroy() {
      removeCoreTwoWayBinding(this.get().element);
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
        if (element.customWidget) return "customwidget";
        const components = {
          radiogroup,
          checkbox,
          comment,
          matrix,
          matrixdropdown,
          matrixdynamic,
          boolean,
          dropdown,
          rating,
          text,
          html,
          empty
        };
        return components[element.getTemplate()];
      }
    }
  };

  const addCoreTwoWayBinding = (element, handler) => {
    if (!element) return;
    if (!element.iteratePropertiesHash) return;

    const doIterate = (hash, key) => {
      let val = hash[key];
      if (!Array.isArray(val)) return;
      val["onArrayChanged"] = handler;
    };

    element.iteratePropertiesHash(doIterate);

    element.setPropertyValueCoreHandler = (hash, key, val) => {
      if (hash[key] === val) return;
      hash[key] = val;
      handler();
    };

    element.visibleRowsChangedCallback = handler;
  };

  const removeCoreTwoWayBinding = element => {
    if (!element) return;
    if (!element.iteratePropertiesHash) return;

    const doIterate = (hash, key) => {
      let val = hash[key];
      if (!Array.isArray(val)) return;
      val["onArrayChanged"] = () => {};
    };

    element.iteratePropertiesHash(doIterate);

    element.setPropertyValueCoreHandler = undefined;
    element.visibleRowsChangedCallback = null;
  };
</script>