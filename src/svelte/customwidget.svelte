<div ref:widget>
    {#if !!question.customWidget.htmlTemplate}
        <div>
            {@html question.customWidget.htmlTemplate}
        </div>
    {/if}
    {#if question.customWidget.isDefaultRender}
        <svelte:component this={dynamicComponent} question={question} css={css}/>
    {/if}
</div>

<script>
  import radiogroup from "./radiogroup.svelte";
  import checkbox from "./checkbox.svelte";
  import comment from "./comment.svelte";
  import matrix from "./matrix.svelte";
  import matrixdropdown from "./matrixdropdown.svelte";
  import matrixdynamic from "./matrixdynamic.svelte";
  import boolean from "./boolean.svelte";
  import dropdown from "./dropdown.svelte";
  import rating from "./rating.svelte";
  import text from "./text.svelte";
  import html from "./html.svelte";
  import empty from "./empty.svelte";
  import fileQuestion from "./file.svelte";
  import expression from "./expression.svelte";
  import panel from "./panel.svelte";
  import paneldynamic from "./paneldynamic.svelte";
  import imagepicker from "./imagepicker.svelte";
  import multipletext from "./multipletext.svelte";

  export default {
    data() {
      return {
        question: null,
        css: null
      };
    },
    oncreate() {
      const question = this.get().question;
      question.customWidget.afterRender(question, this.refs.widget);
    },
    ondestroy() {
      const question = this.get().question;
      question.customWidget.willUnmount(question, this.refs.widget);
    },
    computed: {
      dynamicComponent: ({ question }) => {
        const components = {
          radiogroup,
          checkbox,
          comment,
          matrix,
          matrixdropdown,
          matrixdynamic,
          boolean,
          dropdown,
          rating,
          text,
          html,
          empty,
          file: fileQuestion,
          expression,
          panel,
          paneldynamic,
          imagepicker,
          multipletext
        };
        return components[question.getTemplate()];
      }
    }
  };
</script>