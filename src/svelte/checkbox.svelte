<fieldset class={question.cssClasses.root}>
    {#each question.visibleChoices as item, index}
        <div class={getItemClass(question, item)} >
            <label class={question.cssClasses.label}>
                <input type="checkbox" name={question.name} value={item.value} on:change="setValue(this.value, item, this.checked)" 
                    id={question.inputId} disabled={question.isReadOnly} checked={question.isItemSelected(item)}
                    aria-label={item.locText.renderedHtml} class={question.cssClasses.itemControl}/>

                <span class={question.cssClasses.materialDecorator}>
                  <span class="check"></span>
                </span>

                <span class={question.cssClasses.controlLabel}>
                  <SurveyString locString={item.locText} />
                </span>
                
                {#if index == choicesCount}
                    <div class:sjs-hide="!question.hasOther || !question.isOtherSelected || !question.value">
                      <OtherChoice question={question} }/>
                    </div>
                {/if}
            </label>
        </div>
    {/each}

    <legend style="display: none;">{question.locTitle.renderedHtml}</legend>
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
    computed: {
      choicesCount: ({ question }) => {
        return question.visibleChoices.length - 1;
      }
    },
    helpers: {
      getItemClass(question, item) {
        var itemClass =
          question.cssClasses.item +
          (question.colCount === 0
            ? " sv_q_checkbox_inline"
            : " sv-q-col-" + question.colCount);
        if (question.isItemSelected(item)) {
          itemClass += " checked";
        }
        return itemClass;
      }
    },
    methods: {
      setValue(newItemValue, item, isChecked) {
        const question = this.get().question;

        if (item === question.selectAllItem) {
          question.toggleSelectAll();
          return;
        }

        let newValue = question.value || [];
        const index = newValue.indexOf(newItemValue);

        if (isChecked) {
          if (index < 0) {
            newValue.push(newItemValue);
          }
        } else {
          if (index > -1) {
            newValue.splice(index, 1);
          }
        }

        question.value = newValue;
      }
    }
  };
</script>