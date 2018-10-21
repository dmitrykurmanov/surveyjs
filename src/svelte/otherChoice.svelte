<div class="form-group">
    {#if !question.isReadOnly}
        <input type="text" class={question.cssClasses.other || commentClass} bind:value=question.comment maxlength={question.getOthersMaxLength()} aria-label={question.locTitle.renderedHtml}/>
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
    }
  };
</script>