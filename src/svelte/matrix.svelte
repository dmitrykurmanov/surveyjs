<fieldset>
    <table class={question.cssClasses.root}>
        <thead>
            <tr>
                <td class:sjs-hide="!question.hasRows"></td>
                {#each question.visibleColumns as column}
                    <th><SurveyString locString={column.locText}/></th>  
                {/each}   
            </tr>
        </thead>
        <tbody>
            {#each question.visibleRows as row, rowIndex}
                <tr class={question.cssClasses.row}>
                    <td class:sjs-hide="!question.hasRows">
                        <SurveyString locString={row.locText}/>
                    </td>
                    {#if question.hasCellText}
                        {#each question.visibleColumns as column, columnIndex}
                            <td class={getItemClass(row, column, question)} on:click="cellClick(row, column)">
                                <span>
                                    {question.getCellDisplayLocText(row.name, column).renderedHtml}
                                </span>
                            </td>
                        {/each}
                    {:else}
                        {#each question.visibleColumns as column, columnIndex}
                            <td headers={column.locText.renderedHtml}>
                                <label class={getItemClass(row, column, question)}>
                                    <input type="radio" class={question.cssClasses.itemValue} 
                                        name={row.fullName} on:change="setRowValue(row, this.value)" 
                                        value={column.value} checked={isChecked(row.value, column.value)} 
                                        id={(columnIndex === 0) && (rowIndex === 0) ? question.inputId : ''} 
                                        aria-label={question.locTitle.renderedHtml} disabled={question.isReadOnly}/>
                                    <span class="circle"></span>
                                    <span class="check"></span>
                                    <span style="display: none;">{question.locTitle.renderedHtml}</span>
                                </label>
                            </td>
                        {/each}
                    {/if}                 
                </tr>
            {/each}       
        </tbody>
    </table>
    <legend style="display: none;">{question.locTitle.renderedHtml}</legend>
</fieldset>

<script>
  import SurveyString from "./string.svelte";

  export default {
    data() {
      return {
        question: null,
        css: null
      };
    },
    components: {
      SurveyString
    },
    helpers: {
      getItemClass(row, column, question) {
        var isChecked = row.value == column.value;
        var cellSelectedClass = question.hasCellText
          ? question.cssClasses.cellTextSelected
          : "checked";
        var cellClass = question.hasCellText
          ? question.cssClasses.cellText
          : question.cssClasses.label;
        let itemClass = cellClass + (isChecked ? " " + cellSelectedClass : "");
        return itemClass;
      },
      isChecked(rowValue, columnValue) {
        return rowValue == columnValue;
      }
    },
    methods: {
      cellClick(row, column) {
        if (this.get().question.isReadOnly) return;
        row.value = column.value;
      },
      setRowValue(row, newValue) {
        row.value = newValue;
      }
    }
  };
</script>