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
  import empty from "./empty.svelte";
  import fileQuestion from "./file.svelte";
  import expression from "./expression.svelte";
  import panel from "./panel.svelte";
  import paneldynamic from "./paneldynamic.svelte";
  import imagepicker from "./imagepicker.svelte";
  import multipletext from "./multipletext.svelte";
  import customwidget from "./customwidget.svelte";

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
    onupdate() {
      const cell = this.get().cell;
      addCoreTwoWayBinding(cell, () => {
        debugger;
        this.set({ cell, ...cell });
      });
    },
    ondestroy() {
      removeCoreTwoWayBinding(this.get().cell.question);
    },
    computed: {
      dynamicComponent: ({ cell }) => {
        const element = cell.question;
        if (element.customWidget) return customwidget;
        const components = {
          radiogroup,
          checkbox,
          comment,
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
          multipletext,
          customwidget
        };
        return components[element.getType()];
      }
    },
    methods: {}
  };

  const addCoreTwoWayBinding = (cell, handler) => {
    let element = cell.question;

    if (!element) return;
    if (!element.iteratePropertiesHash) return;

    const doIterate = (hash, key) => {
      let val = hash[key];
      if (!Array.isArray(val)) return;
      val["onArrayChanged"] = handler;
    };

    element.iteratePropertiesHash(doIterate);

    element.setPropertyValueCoreHandler = (hash, key, val) => {
      if (hash[key] === val) return;
      hash[key] = val;
      handler();
    };

    element.visibleRowsChangedCallback = handler;
  };

  const removeCoreTwoWayBinding = cell => {
    let element = cell.question;

    if (!element) return;
    if (!element.iteratePropertiesHash) return;

    const doIterate = (hash, key) => {
      let val = hash[key];
      if (!Array.isArray(val)) return;
      val["onArrayChanged"] = () => {};
    };

    element.iteratePropertiesHash(doIterate);

    element.setPropertyValueCoreHandler = undefined;
    element.visibleRowsChangedCallback = null;
  };
</script>