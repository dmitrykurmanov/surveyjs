<div class={css.page.root}>
	<h4 class={applyShowHideClass(hasTitle) + " " + css.pageTitle}>
		<SurveyString locString={page.locTitle} />
	</h4>
	<div class={applyShowHideClass(hasDescription) + " " + css.pageDescription}>
		<SurveyString locString={page.locDescription} />
	</div>
	{#each rows as row}
    {#if row.visible}
      <div class={css.row}>
        <SurveyRow row={row} survey={survey} css={css} />
      </div>
    {/if}
  {/each}

</div>


<script>
  import SurveyString from "./string.svelte";
  import SurveyRow from "./row.svelte";
  import { applyShowHideClass } from "./helpers";

  export default {
    data() {
      return {
        survey: null,
        css: null,
        page: null
      };
    },
    components: {
      SurveyString,
      SurveyRow
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
    },
    helpers: {
      applyShowHideClass
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