<div class={css.root}>
	<div class="sv_custom_header"></div>
	<div class="sv_container">

		{#if hasTitle}
		<div class={css.header}>
			<h3>
				<SurveyString locString={model.locTitle}/>
			</h3>
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
	    }
	  }
	};
</script>