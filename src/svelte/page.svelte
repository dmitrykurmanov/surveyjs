<div class={css.page.root}>
    <h4 v-show="hasTitle" :class="css.pageTitle"><survey-string :locString="page.locTitle"/></h4>
    <div v-show="hasDescription" :class="css.pageDescription"><survey-string :locString="page.locDescription"/></div>
    <div v-for="(row, index) in rows" v-if="row.visible" :key="page.id + '_' + index" :class="css.row">
        <survey-row :row="row" :survey="survey" :css="css"></survey-row>
    </div>
</div>


<script>
  export default {
    data() {
      return {
        survey: null,
        css: null,
        page: null
      };
    },
    computed: {
      hasTitle: ({ survey, page }) => {
        return !!page.title && survey.showPageTitles;
      },
      hasDescription: ({ page }) => {
        return !!page.description;
      },
      num: ({ page }) => {
        return page.num > 0 ? page.num + ". " : "";
      },
      rows: ({ page }) => {
        return page.rows;
      }
    }
  };
</script>

<style>
    .hide {
      visibility: hidden;
    }
    .show {
      visibility: visible;
    }
</style>