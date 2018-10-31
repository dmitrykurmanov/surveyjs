<div class="form-group">
    {#if !question.isReadOnly}
      <input type="text" class={question.cssClasses.other || commentClass} bind:value=question.comment maxlength={getMaxLength(question.getOthersMaxLength())} aria-label={question.locTitle.renderedHtml}/>
    {:else}
        <div class={question.cssClasses.other}>
            {question.comment}
        </div>
    {/if}
</div>

<script>
  export default {
    data() {
      return {
        question: null,
        commentClass: ""
      };
    },
    helpers: {
      getMaxLength(maxLengthValue) {
        if (maxLengthValue === null) return 524288;
        return maxLengthValue;
      }
    }
  };
</script>