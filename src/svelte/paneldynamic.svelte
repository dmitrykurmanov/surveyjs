<div class={question.cssClasses.root}>
    {#if question.isProgressTopShowing}
      <PaneldynamicProgress question={question} />
    {/if}

    {#each renderedPanels as panel}
      <div key={panel.id}>
          <SurveyPanel question={panel} css={css}/>
          {#if !question.isReadOnly && !panel.isCollapsed}
            <div>
                {#if question.canRemovePanel}
                  <input type="button" class={question.cssClasses.button + ' ' + question.cssClasses.buttonRemove} 
                    value={question.panelRemoveText} on:click="removePanelClick(panel)" />
                {/if}
            </div>
          {/if}
          <hr/>
      </div>
    {/each}

    {#if question.isProgressBottomShowing}
      <PaneldynamicProgress question={question} />
    {/if}

    {#if question.isRenderModeList && question.canAddPanel}
      <input type="button" class={question.cssClasses.button + ' ' + question.cssClasses.buttonAdd} 
        value={question.panelAddText} on:click="addPanelClick()"/>
    {/if}
</div>

<script>
  import PaneldynamicProgress from "./paneldynamicprogress.svelte";
  import SurveyPanel from "./panel.svelte";

  export default {
    data() {
      return {
        question: null,
        css: null
      };
    },
    components: {
      SurveyPanel,
      PaneldynamicProgress
    },
    computed: {
      renderedPanels: ({ question }) => {
        if (question.isRenderModeList) return question.panels;
        var panels = [];
        if (question.currentPanel) {
          panels.push(question.currentPanel);
        }
        return panels;
      }
    },
    methods: {
      removePanelClick(panel) {
        this.get().question.removePanelUI(panel);
      },
      addPanelClick() {
        this.get().question.addPanel();
      }
    }
  };
</script>
