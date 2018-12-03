<div class={question.cssClasses.root}>
    {#if !question.isReadOnly} 
        <div class={question.cssClasses.selectWrapper}>
            <select id={question.inputId} value={question.value} on:change="setValue(this.value)"
                class={question.cssClasses.control} aria-label={question.locTitle.renderedHtml}>
                <option value=''>{question.optionsCaption}</option>
                {#each question.visibleChoices as item}
                    <option value={item.value} selected={question.value == item.value}>
                      {item.text}
                    </option>
                {/each}
            </select>
        </div>
    {:else}
        <div class={question.cssClasses.control}>
            {isOtherSelected ? question.otherText : question.displayValue}
        </div>
    {/if}
    <div class:sjs-hide="!isOtherSelected">
        <OtherChoice question={question} }/>
    </div>
</div>

<script>
  import OtherChoice from "./otherChoice.svelte";
  export default {
    data() {
      return {
        question: null,
        css: null
      };
    },
    components: {
      OtherChoice
    },
    methods: {
      setValue(newValue) {
        this.get().question.value = newValue;
      }
    },
    computed: {
      isOtherSelected: ({ question }) => {
        return question.hasOther && question.isOtherSelected;
      }
    }
  };
</script>