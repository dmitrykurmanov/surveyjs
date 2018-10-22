<fieldset class={question.cssClasses.root}>
	{#each question.visibleChoices as item, index}
        <div class={getItemClass(question, item)} >
            <label class={question.cssClasses.label}>
                <input type="radio" name={question.name + '_' + question.id} bind:value=item.value id={question.inputId} disabled={question.isReadOnly} aria-label={item.locText.renderedHtml} class={question.cssClasses.itemControl}/>
                <span class={question.cssClasses.materialDecorator}></span>
                <span class="check"></span>
                <span class={question.cssClasses.controlLabel}>
                  <SurveyString locString={item.locText} />
                </span>
                {#if index == choicesCount}           
                    <OtherChoice question={question} class={applyShowHideClass(question.hasOther && question.isOtherSelected && index === choicesCount)}/>
                {/if}
            </label>
        </div>
    {/each}
    {#if question.showClearButton}
      <div>
          <input type="button" class={question.cssClasses.clearButton} on:click="doClear()" value={question.clearButtonCaption}/>
      </div>
    {/if}
    <legend style="display: none;">{question.locTitle.renderedHtml}</legend>
</fieldset>

<script>
  import SurveyString from "./string.svelte";
  import OtherChoice from "./otherChoice.svelte";
  import { applyShowHideClass } from "./helpers";

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
        this.question.clearValue();
      }
    },
    helpers: {
      applyShowHideClass,
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