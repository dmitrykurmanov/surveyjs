<table class={question.cssClasses.root}>
    {#each question.getRows() as row, rowindex}
        <tr key={question.inputId + 'rowkey' + rowindex} class={question.cssClasses.row}>
            {#each row as item}
                <td key={'label' + item.editor.id} class={question.cssClasses.itemTitle}>
                    <SurveyString locString={item.locTitle}/>
                </td>
                <td key={item.editor.id}>
                    <SurveyErrors question={item.editor} />
                    <svelte:component this={getWidgetComponentName(item.editor)} question={item.editor} />
                </td>
            {/each}
        </tr>
    {/each}
</table>
<script>
  import SurveyString from "./string.svelte";
  import SurveyErrors from "./errors.svelte";
  import TextQuestion from "./text.svelte";

  export default {
    data() {
      return {
        question: null,
        css: null
      };
    },
    components: {
      SurveyString,
      SurveyErrors
    },
    helpers: {
      getWidgetComponentName(question) {
        return question.customWidget ? "survey-customwidget" : TextQuestion;
      }
    }
  };
</script>