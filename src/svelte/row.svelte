<div>
	  {#each row.elements as element (element.id)}
        {#if element.visible}
          <SurveyElement element={element} survey={survey} css={css} />
        {/if}
    {/each}
</div>

<script>
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
    }
  };
</script>