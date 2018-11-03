<div>
  <textarea type="text" readonly={question.isReadOnly} bind:value=question.value id={question.inputId} 
    maxlength={getMaxLength(question.getMaxLength())} cols={question.cols} 
    aria-label={question.locTitle.renderedHtml} rows={question.rows}
    placeholder={question.placeHolder}
    class={question.cssClasses ? question.cssClasses.root : 'panel-comment-root'} />
</div>

<script>
  import { getMaxLength } from "./utils";

  export default {
    data() {
      return {
        question: null,
        css: null
      };
    },
    helpers: {
      getMaxLength
    }
  };
</script>