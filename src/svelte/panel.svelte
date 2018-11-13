
{#if question.isVisible}
    <div class={question.cssClasses.panel.container} style={rootStyle(question)}>
        <h4 class:sjs-hide="question.title.length <= 0" class={getTitleStyle(css, question)}
            on:click="changeExpanded()">
            <SurveyString locString={question.locTitle}/>
            <span class:sjs-hide="!showIcon(question)" class="iconCss"></span>
        </h4>
        <div :class="question.cssClasses.panel.description"><survey-string :locString="question.locDescription"/></div>
        <survey-errors :question="question"/>
        <div :style="{ paddingLeft: question.innerPaddingLeft }" v-show="!isCollapsed">
            <div v-for="(row, index) in rows" :key="question.id + '_' + index" v-if="row.visible" :class="css.row">
                <survey-row :row="row" :survey="survey" :css="css"></survey-row>
            </div>
        </div>
    </div>
{/if}

<script>
  import SurveyString from "./string.svelte";

  export default {
    data() {
      return {
        question: null,
        isEditMode: null,
        css: null
      };
    },
    components: {
      SurveyString
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
            var result = {};
            if (question.renderWidth) {
            (<any>result)["width"] = this.question.renderWidth;
            }
            return result;
        },
        getTitleStyle(css, question) {
            var result = css.panel.title;
            if (question.isCollapsed || this.question.isExpanded) {
                result += " sv_p_title_expandable";
            }
            return result;
        },
        showIcon(question) {
            return (
                question && (question.isExpanded || question.isCollapsed)
            );
        }
    }
  };
</script>