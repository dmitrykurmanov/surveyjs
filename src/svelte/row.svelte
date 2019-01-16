<div>
	  {#each row.elements as element (element.id)}
        {#if element.visible}
          <div class={questionRootClass} style="padding-left: {getIndentSize(element, element.indent)}; padding-right: {getIndentSize(element, element.rightIndent)}; width: {element.renderWidth}">
            <SurveyElement element={element} survey={survey} css={css} />
          </div>
        {/if}
    {/each}
</div>

<script>
  import { getIndentSize } from "./utils";
  import SurveyElement from "./element.svelte";

  export default {
    data() {
      return {
        survey: null,
        css: null,
        row: null
      };
    },
    components: {
      SurveyElement
    },
    computed: {
      questionRootClass: ({ survey, css }) => {
        if (survey.questionTitleLocation === "left") {
          return css.question.mainRoot + " sv_qstn_left";
        }
        return css.question.mainRoot;
      }
    },
    helpers: {
      getIndentSize
    }
  };
</script>