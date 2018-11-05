<table class={question.cssClasses.root}>
    {#if showHorizontalHeader}
        <thead>
            <tr>
            {#if !isDynamic}
                <td></td>
            {/if}
            {#each question.visibleColumns as column}
                <th style={ {minWidth: question.getColumnWidth(column)} }>
                    <SurveyString locString={column.locTitle}/>
                </th>
            {/each}
            {#if question.canRemoveRow}
                <td></td>
            {/if}
            </tr>
        </thead>
    {/if}

    {#if showVerticalHeader}
        <thead>
            <tr>
                {#if question.showHeader}
                    <td></td>
                {/if}
                {#each rows as row}
                    <th><SurveyString locString={row.locText}/></th>
                {/each}
            </tr>
        </thead>
    {/if}
    
    {#if isColumnsHorizontal}
        <tbody>
            {#each rows as row, rowIndex}
                <tr>
                    {#if !isDynamic}
                        <td><SurveyString locString={row.locText}/></td>
                    {/if}
                    {#each row.cells as cell}
                        <MatrixCell question={question} cell={cell} 
                            key={rowIndex + '_' + cell.question.id}/>
                    {/each}
                    {#if canRemoveRow}
                        <td>
                            <input type="button" value={question.removeRowText}  
                                on:click="removeRowClick(row)"
                                class={question.cssClasses.button + ' ' + question.cssClasses.buttonRemove}  />
                        </td>
                    {/if}
                </tr>
            {/each}
        </tbody>
    {/if}
    
    {#if !isColumnsHorizontal}
        <tbody>
            {#each question.visibleColumns as column, columnIndex}
                <tr key={question.inputId + '_' + columnIndex}>
                    {#if question.showHeader}
                        <th><SurveyString locString={column.locTitle}/></th>
                    {/if}
                    {#each getCellsByColumn(columnIndex) as cell}
                        <MatrixCell question={question} cell={cell}
                            key={columnIndex + '_' + cell.question.id}/>
                    {/each}                
                </tr>
            {/each}

            {#if canRemoveRow}
                <tr>
                    {#if question.showHeader}
                        <td></td>
                    {/if}

                    {#each rows as row, rowIndex}
                        <td key={'removeRow' + rowIndex}>
                            <input type="button" value={question.removeRowText} 
                                on:click="removeRowClick(row)"
                                class={question.cssClasses.button + ' ' + question.cssClasses.buttonRemove} />
                        </td>
                    {/each}
                </tr>
            {/if}
        </tbody>
    {/if}
</table>
    
<script>
  import MatrixCell from "./matrixcell.svelte";
  import SurveyString from "./string.svelte";

  export default {
    data() {
      return {
        question: null,
        css: null
      };
    },
    components: {
      SurveyString,
      MatrixCell
    },
    computed: {
      isDynamic: ({ question }) => {
        return question.isRowsDynamic;
      },
      isColumnsHorizontal: ({ question }) => {
        return question.isColumnLayoutHorizontal;
      },
      showHorizontalHeader: ({ question, isColumnsHorizontal }) => {
        return isColumnsHorizontal && question.showHeader;
      },
      showVerticalHeader: ({ question, isColumnsHorizontal, isDynamic }) => {
        return !isColumnsHorizontal && !isDynamic;
      },
      rows: ({ question }) => {
        return question.visibleRows;
      },
      canRemoveRow: ({ question, isDynamic }) => {
        return isDynamic && question.canRemoveRow;
      }
    },
    methods: {
      getCellsByColumn(columnIndex) {
        var res = [];
        var rows = this.get().rows;
        for (var i = 0; i < rows.length; i++) {
          res.push(rows[i].cells[columnIndex]);
        }
        return res;
      },
      removeRowClick(row) {
        var question = this.get().question;
        var rows = question.visibleRows;
        var index = rows.indexOf(row);
        if (index > -1) {
          question.removeRowUI(index);
        }
      }
    }
  };
</script>