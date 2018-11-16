<fieldset class={question.cssClasses.root}>
    {#each question.visibleChoices as item, index}
        <div key={item.value} class={getItemClass(item, question)} >
            <label class={question.cssClasses.label}>
                {#if question.multiSelect}
                    <input style="display: none;" type="checkbox" name={question.name + '_' + question.id} 
                        value={item.value} id={question.inputId + '_' + item.value} checked={question.value === item.value}
                        on:change="setCheckboxValue(this)" disabled={question.isReadOnly} 
                        aria-label={question.locTitle.renderedHtml} class={question.cssClasses.itemControl}/>
                {:else}
                    <input style="display: none;" type="radio" name={question.name + '_' + question.id} 
                        value={item.value} id={question.inputId + '_' + item.value} checked={question.value === item.value}
                        on:change="setRadioValue(this.value)" disabled={question.isReadOnly} 
                        aria-label={question.locTitle.renderedHtml} class={question.cssClasses.itemControl}/>
                {/if}
                <div>
                    {#if question.contentMode === 'image'}
                        {@debug question}
                        <img class={question.cssClasses.image} src={item.imageLink} alt=""
                            style="objectFit: {question.imageFi};
                                width: {question.imageWidth ? question.imageWidth + 'px' : undefine};
                                height: {question.imageHeight ? question.imageHeight + 'px' : undefined};" />
                    {/if}
                    {#if question.contentMode === 'video'}
                        <embed class={question.cssClasses.image} src={item.imageLink} 
                            width={question.imageWidth ? question.imageWidth + 'px' : undefined} 
                            height={question.imageHeight ? question.imageHeight + 'px' : undefined}
                            style="objectFit: {question.imageFit}" />
                    {/if}
                    {#if question.showLabel}
                        <span title={item.text || item.value} class={question.cssClasses.itemText}>
                            {item.text || item.value}
                        </span>
                    {/if}
                </div>
            </label>
        </div>
    {/each}
    
    <legend style="display: none;">
        {question.locTitle.renderedHtml}
    </legend>
</fieldset>

<script>
  export default {
    data() {
      return {
        question: null,
        css: null
      };
    },
    methods: {
      setRadioValue(newValue) {
        this.get().question.value = newValue;
      },
      setCheckboxValue(target) {
        const question = this.get().question;
        const newValue = target.value;

        if (target.checked) {
          question.value = question.value.concat(newValue);
        } else {
          const currValue = question.value;
          currValue.splice(question.value.indexOf(newValue), 1);
          question.value = currValue;
        }
      }
    },
    helpers: {
      getItemClass(item, question) {
        var itemClass =
          question.cssClasses.item +
          (question.colCount === 0
            ? " sv_q_imagepicker_inline"
            : " sv-q-col-" + question.colCount);
        if (question.multiSelect) {
          if (question.value.indexOf(item.value) !== -1) {
            itemClass += " checked";
          }
        } else {
          if (item.value === question.value) {
            itemClass += " checked";
          }
        }
        return itemClass;
      }
    }
  };
</script>