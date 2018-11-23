<div>
    <div class={question.cssClasses.root}>
        {#each question.visibleRateValues as item, index}
            <label key={item.value} class={getCss(question, item)}>
                <input type="radio" style="display: none;" name={question.name} id={question.name + index} 
                    value={item.value} disabled={question.isReadOnly} 
                    on:change="setValue(this.value)" aria-label={item.locText.text}/>
                {#if index === 0}
                    <span class={question.cssClasses.minText}>
                        <SurveyString locString={question.locMinRateDescription}/>
                    </span>
                {/if}
                <span class={question.cssClasses.itemText}>
                    <SurveyString locString={item.locText}/>
                </span>
                {#if index === question.visibleRateValues.length-1}
                    <span class={question.cssClasses.maxText}>
                        <SurveyString locString={question.locMaxRateDescription}/>
                    </span>
                {/if}
            </label>
        {/each}
    </div>
    <div class:sjs-hide="!question.hasOther">
        <div class={question.cssClasses.other}>
            <OtherChoice question={question}/>
        </div>
    </div>
</div>

<script>
  import SurveyString from "./string.svelte";
  import OtherChoice from "./otherChoice.svelte";

  export default {
    data() {
      return {
        question: null,
        css: null
      };
    },
    components: {
      SurveyString,
      OtherChoice
    },
    methods: {
      setValue(newValue) {
        this.get().question.value = newValue;
      }
    },
    helpers: {
      getCss(question, item) {
        let css = question.cssClasses.item;
        if (question.value == item.value) {
          css = css + " " + question.cssClasses.selected;
        }
        return css;
      }
    }
  };
</script>