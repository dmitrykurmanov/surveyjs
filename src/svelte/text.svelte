<div>
    {#if !question.isReadOnly}
    <input class={question.cssClasses.root} type={question.inputType} 
        maxlength={getMaxLength(question.getMaxLength())} size={question.size}
        id={question.inputId} placeholder={question.placeHolder} 
        value={getValue(question.value)} on:change="setValue(this.value)"
        aria-label={question.locTitle.renderedHtml}/>
    {:else}
        <input disabled class={question.cssClasses.root} type={question.inputType} 
            size={question.size} id={question.inputId} placeholder={question.placeHolder} 
            value={question.value} aria-label={question.locTitle.renderedHtml}/>
    {/if}
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
    methods: {
      setValue(newValue) {
        this.get().question.value = newValue;
      }
    },
    helpers: {
      getMaxLength,
      getValue
    }
  };
</script>