<div class={css.root}>
	<div class="sv_custom_header"></div>
	<div class="sv_container">

		{#if hasTitle}
		<div class={css.header}>
			<h3>
				<SurveyString locString={surveyModel.locTitle}/>
			</h3>
		</div>
		{/if} {#if hasCompletedPage}
		<div>
			<div class={getCompletedPageClasses()}>
				{@html surveyModel.processedCompletedHtml}
			</div>
			{#if surveyModel.completedState != ''}
			<div class={css.saveData.root}>
				<div class={getCompletedStateClasses()}>
					<span>{surveyModel.completedStateText}</span>
					{#if surveyModel.completedState == 'error'}
					<input type="button" value={surveyModel.getLocString( 'saveAgainButton')} on:click="doTrySaveAgain()" class={css.saveData.saveAgainButton}
					/> {/if}

				</div>
			</div>
			{/if}

		</div>
		{/if}


	</div>
</div>

<script>
	import { surveyCss } from "../defaultCss/cssstandard";
	import { QuestionRadiogroupModel } from "../question_radiogroup";
	import SurveyString from "./string.svelte";

	export default {
	  data() {
	    return {
	      surveyModel: null,
	      css: surveyCss.getCss()
	    };
	  },
	  components: {
	    SurveyString
		},
		oncreate() {
			this.su

			this.interval = setInterval(() => {
				this.set({ time: new Date() });
			}, 1000);
		},
	  computed: {
	    hasTitle: ({ surveyModel }) => {
	      return !!surveyModel.title && surveyModel.showTitle;
	    },
	    hasCompletedPage: ({ surveyModel }) => {
	      return surveyModel.showCompletedPage && surveyModel.state === "completed";
	    },
	    getCompletedPageClasses: ({ css }) => {
	      return css.body + " " + css.completedPage;
	    },
	    getCompletedStateClasses: ({ css, surveyModel }) => {
	      return css.saveData[surveyModel.completedState];
	    }
	  },
	  methods: {
	    doTrySaveAgain() {
	      this.get().surveyModel.doComplete();
	    }
	  }
	};
</script>