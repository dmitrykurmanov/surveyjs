<div class={question.cssClasses.root}>
    <label class={getClass(question)}>
        <input bind:indeterminate=isIndeterminate type="checkbox" 
            name={question.name} id="question.inputId" 
            checked={question.checkedValue} on:change="setValue(this.checked)"
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
        css: null,
        isIndeterminate: null
      };
    },
    components: {
      SurveyString
    },
    oncreate() {
      this.set({ isIndeterminate: this.get().question.isIndeterminate });
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