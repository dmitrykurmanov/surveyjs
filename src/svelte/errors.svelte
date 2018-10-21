<div role="alert" class={classes}>
    {#each question.errors as error}   
        <div>
            <span class={question.cssClasses ? question.cssClasses.error.icon : 'panel-error-icon'} aria-hidden="true"></span>
            <span class={question.cssClasses ? question.cssClasses.error.item : 'panel-error-item'}>
                <SurveyString locString={error.locText} />
            </span>
        </div>
    {/each}
</div>


<script>
  import { applyShowHideClass } from "./helpers";
  import SurveyString from "./string.svelte";

  export default {
    data() {
      return {
        question: null
      };
    },
    components: {
        SurveyString
    },
    computed: {
      classes: ({ question }) => {
        const showHideCls = applyShowHideClass(
          !!question.errors && question.errors.length > 0
        );
        const errCls = question.cssClasses
          ? question.cssClasses.error.root
          : "panel-error-root";

        return showHideCls + " " + errCls;
      }
    }
  };
</script>