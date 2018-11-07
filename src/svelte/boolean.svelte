<div class={question.cssClasses.root}>
    <label class={getClass(question)}>
        <input ref:checkbox type="checkbox" name={question.name} id="question.inputId" 
            value="question.checkedValue" on:change="setValue(this.value)"
            disabled={question.isReadOnly} aria-label={question.locTitle.renderedHtml}/>
        <span class={question.cssClasses.materialDecorator}><span class="check"></span></span>
        <span class={question.cssClasses.label}>
            <SurveyString locString={question.locDisplayLabel}/>
        </span>
    </label>
</div>
<script>
  import SurveyString from "./string.svelte";
  export default {
    data() {
      return {
        question: null,
        css: null
      };
    },
    onupdate() {
      this.refs.checkbox.indeterminate = this.get().question.isIndeterminate;
    },
    components: {
      SurveyString
    },
    methods: {
      setValue(newValue) {
        this.get().question.checkedValue = newValue;
      }
    },
    helpers: {
      getClass(question) {
        let itemClass =
          question.cssClasses.item + (question.checkedValue ? " checked" : "");
        return itemClass;
      }
    }
  };
</script>