
<div style="overflowX: {question.horizontalScroll ? 'scroll': ''}">
    {#if question.isAddRowOnTop}
        <div class={question.cssClasses.footer}>
            <input type="button" class={question.cssClasses.button + ' ' + question.cssClasses.buttonAdd} 
                value={question.addRowText} on:click="addRowClick()"/>
        </div>
    {/if}
    <MatrixTable question={question} />
    {#if question.isAddRowOnBottom}
        <div class={question.cssClasses.footer}>
            <input type="button" class={question.cssClasses.button + ' ' + question.cssClasses.buttonAdd} 
                value={question.addRowText} on:click="addRowClick()"/>
        </div>
    {/if}
</div>
    
<script>
  import MatrixTable from "./matrixtable.svelte";
  export default {
    data() {
      return {
        question: null,
        css: null
      };
    },
    components: {
      MatrixTable
    },
    methods: {
      addRowClick() {
        this.get().question.addRow();
      }
    }
  };
</script>