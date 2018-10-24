<div role="alert" class:sjs-hide="!question.errors || question.errors.length === 0" class={classes}>
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
        return question.cssClasses
          ? question.cssClasses.error.root
          : "panel-error-root";
      }
    }
  };
</script>