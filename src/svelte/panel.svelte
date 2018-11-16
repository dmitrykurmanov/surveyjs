
{#if question.isVisible}
    <div ref:root class={question.cssClasses.panel.container} style={rootStyle(question)}>
        <h4 class:sjs-hide="question.title.length <= 0" class={getTitleStyle(css, question)}
            on:click="changeExpanded()">
            <SurveyString locString={question.locTitle}/>
            <span class:sjs-hide="!showIcon(question)" class="iconCss"></span>
        </h4>
        <div class={question.cssClasses.panel.description}>
            <SurveyString locString={question.locDescription}/>
        </div>
        <SurveyErrors question={question} />
        <div  class:sjs-hide="isCollapsed" style="paddingLeft: {question.innerPaddingLeft };" >
            {#each question.rows as row, index}
                {#if row.visible}
                <div key={question.id + '_' + index} class={css.row}>
                    <SurveyRow row={row} survey={question.survey} css={css} />
                </div>
                {/if}
            {/each}
        </div>
    </div>
{/if}

<script>
  import SurveyString from "./string.svelte";
  import SurveyErrors from "./errors.svelte";
  import SurveyRow from "./row.svelte";

  export default {
    data() {
      return {
        question: null,
        css: null,
        isCollapsed: null
      };
    },
    components: {
      SurveyString,
      SurveyErrors,
      SurveyRow
    },
    onupdate() {
      const self = this;
      const question = self.get().question;
      if (question.survey) {
        question.survey.afterRenderPanel(question, self.refs.root);
      }
      self.set({ isCollapsed: question.isCollapsed });

      question.registerFunctionOnPropertyValueChanged("state", function(val) {
        self.set({ isCollapsed: self.get().question.isCollapsed });
      });
    },
    methods: {
      changeExpanded() {
        const question = this.get().question;

        if (!question.isCollapsed && !question.isExpanded) return;

        if (question.isCollapsed) {
          question.expand();
        } else {
          question.collapse();
        }
      }
    },
    helpers: {
      rootStyle(question) {
        var result = "";
        if (question.renderWidth) {
          result = "width: " + question.renderWidth + ";";
        }
        return result;
      },
      getTitleStyle(css, question) {
        var result = css.panel.title;
        if (question.isCollapsed || question.isExpanded) {
          result += " sv_p_title_expandable";
        }
        return result;
      },
      showIcon(question) {
        return question && (question.isExpanded || question.isCollapsed);
      }
    }
  };
</script>