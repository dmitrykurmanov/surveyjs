<fieldset class={question.cssClasses.root}> 
  <legend aria-label={question.locTitle.renderedHtml}></legend>
	{#each question.visibleChoices as item, index}
        <div class={getItemClass(question, item)} >
            <label class={question.cssClasses.label}>
                <input type="radio" name={question.name + '_' + question.id} value={item.value} on:change="setValue(this.value)" id={question.inputId} 
                  disabled={question.isReadOnly} aria-label={item.locText.renderedHtml} checked={question.value === item.value}
                    class={question.cssClasses.itemControl}/>
                <span class={question.cssClasses.materialDecorator}></span>
                <span class="check"></span>
                <span class={question.cssClasses.controlLabel}>
                  <SurveyString locString={item.locText} />
                </span>
                {#if index == choicesCount}
                    <div class:sjs-hide="!question.hasOther || !question.isOtherSelected">
                      <OtherChoice question={question} }/>
                    </div>
                {/if}
            </label>
        </div>
    {/each}
    {#if question.showClearButton}
      <div>
          <input type="button" class={question.cssClasses.clearButton} on:click="doClear()" 
            value={question.clearButtonCaption}/>
      </div>
    {/if}
</fieldset>

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
      doClear() {
        this.get().question.clearValue();
      },
      setValue(newValue) {
        this.get().question.value = newValue;
      }
    },
    helpers: {
      getItemClass(question, item) {
        var itemClass =
          question.cssClasses.item +
          (question.colCount === 0
            ? " sv_q_radiogroup_inline"
            : " sv-q-col-" + question.colCount);
        if (item.value === question.value) itemClass += " checked";
        return itemClass;
      }
    },
    computed: {
      choicesCount: ({ question }) => {
        return question.visibleChoices.length - 1;
      }
    }
  };
</script>