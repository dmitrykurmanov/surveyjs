<td class={question.cssClasses.itemValue} 
    headers={cell.question.isVisible ? cell.column.locTitle.renderedHtml : ''}>
    <SurveyErrors question={cell.question} />
    <div class:sjs-hide="!cell.question.isVisible">
      <svelte:component  this={dynamicComponent} question={cell.question} />
    </div>   
</td>

<script>
  import SurveyErrors from "./errors.svelte";

  import radiogroup from "./radiogroup.svelte";
  import checkbox from "./checkbox.svelte";
  import comment from "./comment.svelte";
  import boolean from "./boolean.svelte";
  import dropdown from "./dropdown.svelte";
  import rating from "./rating.svelte";
  import text from "./text.svelte";
  import html from "./html.svelte";

  export default {
    data() {
      return {
        question: null,
        cell: null
      };
    },
    components: {
      SurveyErrors
    },
    computed: {
      dynamicComponent: ({ cell }) => {
        const element = cell.question;
        if (element.customWidget) return "customwidget";
        const components = {
          radiogroup,
          checkbox,
          comment,
          boolean,
          dropdown,
          rating,
          text,
          html
        };
        return components[element.getType()];
      }
    },
    methods: {}
  };
</script>