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
				<SurveyPage id={surveyModel.startedPage.id} survey={surveyModel} page={surveyModel.startedPage} css={css} />

				{#if surveyModel.isNavigationButtonsShowing}
					<div class={css.footer}>
						<input type="button" bind:value=surveyModel.startSurveyText class={getNavBtnClasses(css, 'start')} on:click="start()" />
					</div>
				{/if}
			</div>
		{/if}

		{#if surveyModel.state === 'running'}
			<div class={css.body}>
				<!-- <survey-progress v-if="survey.isShowProgressBarOnTop" :survey="survey" :css="css"/> -->
				<!-- <survey-timerpanel v-if="survey.isTimerPanelShowingOnTop" :survey="survey" :css="css"/> -->
				<SurveyPage id={surveyModel.currentPage.id} survey={surveyModel} page={surveyModel.currentPage} css={css} />
				<!-- <survey-timerpanel v-if="survey.isTimerPanelShowingOnBottom" :survey="survey" :css="css"/> -->
				<!-- <survey-progress style="margin-top: 1em" v-if="survey.isShowProgressBarOnBottom" :survey="survey" :css="css"/> -->
				<!-- <div v-if="survey.isNavigationButtonsShowing" :class="css.footer">
						<input type="button" :value="survey.pagePrevText" v-show="!survey.isFirstPage && survey.isShowPrevButton" :class="getNavBtnClasses('prev')" @click="prevPage"/>
						<input type="button" :value="survey.pageNextText" v-show="!survey.isLastPage" :class="getNavBtnClasses('next')" @click="nextPage"/>
						<input v-if="survey.isEditMode" type="button" :value="survey.completeText" v-show="survey.isLastPage" :class="getNavBtnClasses('complete')" @click="completeLastPage"/>
				</div> -->
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
	import SurveyPage from "./page.svelte";

	export default {
	  data() {
	    return {
	      surveyModel: null,
	      css: surveyCss.getCss()
	    };
	  },
	  components: {
			SurveyString,
			SurveyPage
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

<style>
  :global(.sjs-hide) {
    visibility: hidden;
  }
  :global(.sjs-show) {
    visibility: visible;
  }
</style>