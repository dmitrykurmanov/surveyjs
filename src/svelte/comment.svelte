<div>
  <textarea type="text" readonly={question.isReadOnly} id={question.inputId} 
    maxlength={getMaxLength(question.getMaxLength())} cols={question.cols}
    aria-label={question.locTitle.renderedHtml} rows={question.rows}
    placeholder={question.placeHolder} on:change="setValue(this.value)" value={getValue(question.value)}
    class={question.cssClasses ? question.cssClasses.root : 'panel-comment-root'} />
</div>

<script>
  import { getMaxLength, getValue } from "./utils";

  export default {
    data() {
      return {
        question: null,
        css: null
      };
    },
    helpers: {
      getMaxLength,
      getValue
    },
    methods: {
      setValue(newValue) {
        this.get().question.value = newValue;
      }
    }
  };
</script>