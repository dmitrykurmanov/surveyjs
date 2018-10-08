<div class={css.root}>
	<div class="sv_custom_header"></div>
	<div class="sv_container">

		{#if hasTitle}
		<div class={css.header}>
			<h3>
				<!-- <survey-string :locString="survey.locTitle" /> -->
			</h3>
		</div>
		{/if}

	</div>
</div>

<script>
	import { SurveyModel } from "../survey";
	import { surveyCss } from "../defaultCss/cssstandard";
	import { QuestionRadiogroupModel } from "../question_radiogroup";

	export default {
	  data() {
	    return {
	      json: null,
	      css: surveyCss.getCss()
	    };
	  },
	  computed: {
	    model: ({ json }) => {
	      const model = new SurveyModel(json);
	      return model;
	    },
	    hasTitle: ({ model }) => {
	      return !!model.title && model.showTitle;
	    }
	  }
	};
</script>