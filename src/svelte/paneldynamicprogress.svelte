<div>
    {#if question.isRangeShowing}
      <input type="range" min="0" max={rangeMax(question)} value={question.currentIndex} 
        style="width:25%;float:left;margin:5px;" on:change="changeRange(this.value)" />
    {/if}

    {#if question.isPrevButtonShowing}
      <input type="button" value={question.panelPrevText} style="float:left;margin:5px" 
        class={question.cssClasses.button  + ' ' + question.cssClasses.buttonPrev} 
        on:click="prevPanelClick()" />
    {/if}

    {#if question.isNextButtonShowing}
      <input type="button" value={question.panelNextText} style="float:left;margin:5px" 
        class={question.cssClasses.button  + ' ' + question.cssClasses.buttonNext}  
        on:click="nextPanelClick()" />
    {/if}

    {#if question.canAddPanel}
      <input type="button" value={question.panelAddText} style="float:left;margin:5px" 
        class={question.cssClasses.button  + ' ' + question.cssClasses.buttonAdd}  
        on:click="addPanelClick()"/>
    {/if}
</div>

<script>
  export default {
    data() {
      return {
        question: null
      };
    },
    helpers: {
      rangeMax(question) {
        return question.panelCount - 1;
      }
    },
    methods: {
      changeRange(newValue) {
        this.get().question.currentIndex = newValue;
      },
      prevPanelClick() {
        this.get().question.currentIndex--;
      },
      nextPanelClick() {
        this.get().question.currentIndex++;
      },
      addPanelClick() {
        this.get().question.addPanelUI();
      }
    }
  };
</script>
