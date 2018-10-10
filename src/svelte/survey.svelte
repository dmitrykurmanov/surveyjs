<div class={css.root}>
	<div class="sv_custom_header"></div>
	<div class="sv_container">

		{#if hasTitle}
		<div class={css.header}>
			<h3>
				<SurveyString locString={model.locTitle}/>
			</h3>
		</div>
		{/if} {#if hasCompletedPage}
		<div>
			<div class={getCompletedPageClasses()}>
				{@html model.processedCompletedHtml}
			</div>
			{#if model.completedState != ''}
			<div class={css.saveData.root}>
				<div class={getCompletedStateClasses()}>
					<span>{model.completedStateText}</span>
					{#if model.completedState == 'error'}
					<input type="button" value={model.getLocString( 'saveAgainButton')} on:click="doTrySaveAgain()" class={css.saveData.saveAgainButton}
					/> {/if}

				</div>
			</div>
			{/if}

		</div>
		{/if}


	</div>
</div>

<script>
	import { SurveyModel } from "../survey";
	import { surveyCss } from "../defaultCss/cssstandard";
	import { QuestionRadiogroupModel } from "../question_radiogroup";
	import SurveyString from "./string.svelte";

	export default {
	  data() {
	    return {
	      json: null,
	      css: surveyCss.getCss()
	    };
	  },
	  components: {
	    SurveyString
	  },
	  computed: {
	    model: ({ json }) => {
	      const model = new SurveyModel(json);
	      return model;
	    },
	    hasTitle: ({ model }) => {
	      return !!model.title && model.showTitle;
	    },
	    hasCompletedPage: ({ model }) => {
	      return model.showCompletedPage && model.state === "completed";
	    },
	    getCompletedPageClasses: ({ css }) => {
	      return css.body + " " + css.completedPage;
	    },
	    getCompletedStateClasses: ({ css, model }) => {
	      return css.saveData[model.completedState];
	    }
	  },
	  methods: {
	    doTrySaveAgain() {
	      this.get().model.doComplete();
	    }
	  }
	};
</script>