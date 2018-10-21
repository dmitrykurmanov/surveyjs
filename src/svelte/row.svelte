<div>
	  {#each row.elements as element (element.idValue)}
        {#if element.visible}
            <SurveyElement class={questionRootClass} id={element.id} style="paddingLeft: {getIndentSize(element, element.indent)}; paddingRight: {getIndentSize(element, element.rightIndent)}; width: {element.renderWidth}" element={element} survey={survey} css={css} />
        {/if}
    {/each}
</div>

<script>
  import { getIndentSize } from "./helpers";
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