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
                                @click="removeRowClick(row)"
                                :class="question.cssClasses.button + ' ' + question.cssClasses.buttonRemove"  />
                        </td>
                    {/if}
                </tr>
            {/each}
        </tbody>
    {/if}
    
    <tbody v-if="!isColumnsHorizontal">
        <tr v-for="(column, columnIndex) in question.visibleColumns" :key="question.inputId + '_' + columnIndex">
            <th v-if="question.showHeader"><SurveyString :locString="column.locTitle"/></th>
            <survey-matrixcell :question="question" :cell="cell" v-for="cell in getCellsByColumn(columnIndex)" :key="columnIndex + '_' + cell.question.id"/>
        </tr>
        <tr v-if="canRemoveRow">
            <td v-if="question.showHeader"></td>
            <td v-for="(row, rowIndex) in rows" :key="'removeRow' + rowIndex">
                <input type="button" :class="question.cssClasses.button + ' ' + question.cssClasses.buttonRemove" :value="question.removeRowText" @click="removeRowClick(row)" />
            </td>
        </tr>
    </tbody>
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
    helpers: {}
  };
</script>