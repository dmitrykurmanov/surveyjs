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
				{#if surveyModel.isShowProgressBarOnTop}
					<Progress survey={surveyModel} css={css} />
				{/if}
				
				{#if surveyModel.isTimerPanelShowingOnTop}
					<TimerPanel survey={surveyModel} />
				{/if}

				<SurveyPage id={surveyModel.currentPage.id} survey={surveyModel} page={surveyModel.currentPage} css={css} />
				
				{#if surveyModel.isTimerPanelShowingOnBottom}
					<TimerPanel survey={surveyModel} />
				{/if}				
				
				{#if surveyModel.isShowProgressBarOnBottom}
					<div style="margin-top: 1em">
						<Progress survey={surveyModel} css={css} />
					</div>
				{/if}

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
		import Progress from "./progress.svelte";
		import TimerPanel from "./timerpanel.svelte";

		export default {
		  data() {
		    return {
		      surveyModel: null,
		      css: surveyCss.getCss()
		    };
		  },
		  components: {
		    SurveyString,
		    SurveyPage,
		    Progress,
		    TimerPanel
		  },
		  oncreate() {
		    const surveyModel = this.get().surveyModel;
		    const handler = this.setSurveyModel.bind(this);
		    surveyModel.onCurrentPageChanged.add(handler);
		    // surveyModel.onVisibleChanged.add(handler);
		    surveyModel.onValueChanged.add(handler);
		    surveyModel.onComplete.add(handler);
		    surveyModel.onPartialSend.add(handler);
		    surveyModel.onPageVisibleChanged.add(handler);
		    surveyModel.onStarted.add(handler);
		    surveyModel.onTimer.add(handler);
		  },
		  ondestroy() {
		    const surveyModel = this.get().surveyModel;
		    const handler = this.setSurveyModel.bind(this);
		    surveyModel.onCurrentPageChanged.remove(handler);
		    // surveyModel.onVisibleChanged.remove(handler);
		    surveyModel.onValueChanged.remove(handler);
		    surveyModel.onComplete.remove(handler);
		    surveyModel.onPartialSend.remove(handler);
		    surveyModel.onPageVisibleChanged.remove(handler);
		    surveyModel.onStarted.remove(handler);
		    surveyModel.onTimer.remove(handler);
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
		    setSurveyModel(newSurveyModel) {
		      this.set({ surveyModel: newSurveyModel });
		    },
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
    display: none;
  }
</style>