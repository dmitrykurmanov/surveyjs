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
						<input type="button" value={surveyModel.startSurveyText} class={getNavBtnClasses(css, 'start')} on:click="start()" />
					</div>
				{/if}
			</div>
		{/if}

		{#if surveyModel.state === 'running'}
			<div class={css.body}>
				<!-- <survey-progress v-if="surveyModel.isShowProgressBarOnTop" :survey="survey" :css="css"/> -->
				<!-- <survey-timerpanel v-if="surveyModel.isTimerPanelShowingOnTop" :survey="survey" :css="css"/> -->
				<SurveyPage id={surveyModel.currentPage.id} survey={surveyModel} page={surveyModel.currentPage} css={css} />
				<!-- <survey-timerpanel v-if="surveyModel.isTimerPanelShowingOnBottom" :survey="survey" :css="css"/> -->
				<!-- <survey-progress style="margin-top: 1em" v-if="surveyModel.isShowProgressBarOnBottom" :survey="survey" :css="css"/> -->

				{#if surveyModel.isNavigationButtonsShowing}
					<div class={css.footer}>
							<input type="button" class:sjs-hide="surveyModel.isFirstPage || !surveyModel.isShowPrevButton" value={surveyModel.pagePrevText} class={getNavBtnClasses(css, 'prev')} on:click="prevPage()"/>
							<input type="button" class:sjs-hide="surveyModel.isLastPage" value={surveyModel.pageNextText} class={getNavBtnClasses(css, 'next')} on:click="nextPage()"/>
							{#if surveyModel.isEditMode}
							<input type="button" class:sjs-hide="!surveyModel.isLastPage" value={surveyModel.completeText} class={getNavBtnClasses(css, 'complete')} on:click="completeLastPage()"/>
							{/if}
					</div>
				{/if}
			</div>
		{/if}

		{#if hasCompletedPage}
			<div>
				<div class={completedPageClasses}>
					{@html surveyModel.processedCompletedHtml}
				</div>

				{#if surveyModel.completedState != ''}
					<div class={css.saveData.root}>
						<div class={completedStateClasses()}>
							<span>{surveyModel.completedStateText}</span>

							{#if surveyModel.completedState == 'error'}
								<input type="button" value={surveyModel.getLocString('saveAgainButton')} on:click="doTrySaveAgain()" class={css.saveData.saveAgainButton} />
							{/if}
						</div>
					</div>
				{/if}
			</div>
		{/if}

		{#if surveyModel.state === 'completedbefore'}
			<div class={css.body}>
				{@html surveyModel.processedCompletedBeforeHtml}
			</div>
		{/if}

		{#if surveyModel.state === 'loading'}
			<div class={css.body}>
				{@html surveyModel.processedLoadingHtml}
			</div>
		{/if}

		{#if surveyModel.state === 'empty'}
			<div class={css.body}>
				{@html surveyModel.emptySurveyText}
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
		    this.get().surveyModel.onComplete.add((sender, options) => {
		      this.set({ surveyModel: sender });
		    });
		    this.get().surveyModel.onPartialSend.add((sender, options) => {
		      this.set({ surveyModel: sender });
				});
				this.get().surveyModel.onPageVisibleChanged.add((sender, options) => {
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
		    },
		    prevPage() {
		      this.get().surveyModel.prevPage();
		    },
		    nextPage() {
		      this.get().surveyModel.nextPage();
		    },
		    completeLastPage() {
		      this.get().surveyModel.completeLastPage();
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
</style>