<div class={css.root}>
	<div class="sv_custom_header"></div>
	<div class="sv_container">

		{#if hasTitle}
			<div class={css.header}>
				<h3>
					<SurveyString locString={surveyModel.locTitle} />
				</h3>
			</div>
		{/if}

		{#if surveyModel.state === 'starting'}
			<div class={css.body}>
				<survey-page id={surveyModel.startedPage.id} survey={surveyModel} page={surveyModel.startedPage} css={css} />

				{#if surveyModel.isNavigationButtonsShowing}
					<div class={css.footer}>
						<input type="button" bind:value=surveyModel.startSurveyText class={getNavBtnClasses(css, 'start')} on:click="start()" />
					</div>
				{/if}
			</div>
		{/if}

		{#if surveyModel.state === 'running'}
			<div class={css.body}>
				{surveyModel.state}
			</div>
		{/if}

		{#if hasCompletedPage}
			<div>
				<div class={completedPageClasses()}>
					{@html surveyModel.processedCompletedHtml}
				</div>

				{#if surveyModel.completedState != ''}
					<div class={css.saveData.root}>
						<div class={completedStateClasses()}>
							<span>{surveyModel.completedStateText}</span>

							{#if surveyModel.completedState == 'error'}
							{/if}
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
	    this.get().surveyModel.onCurrentPageChanged.add((sender, options) => {
	      this.set({ surveyModel: sender });
	    });
	    this.get().surveyModel.onVisibleChanged.add((sender, options) => {
	      this.set({ surveyModel: sender });
	    });
	    this.get().surveyModel.onValueChanged.add((sender, options) => {
	      this.set({ surveyModel: sender });
	    });
	  },
	  computed: {
	    hasTitle: ({ surveyModel }) => {
	      return !!surveyModel.title && surveyModel.showTitle;
	    },
	    hasCompletedPage: ({ surveyModel }) => {
	      return surveyModel.showCompletedPage && surveyModel.state === "completed";
	    },
	    completedPageClasses: ({ css }) => {
	      return css.body + " " + css.completedPage;
	    },
	    completedStateClasses: ({ css, surveyModel }) => {
	      return css.saveData[surveyModel.completedState];
	    }
	  },
	  methods: {
	    doTrySaveAgain() {
	      this.get().surveyModel.doComplete();
	    },
	    start() {
	      this.get().surveyModel.start();
	    }
	  },
	  helpers: {
	    getNavBtnClasses(css, btnType) {
	      return (css.navigationButton + " " + css.navigation[btnType]).trim();
	    }
	  }
	};
</script>