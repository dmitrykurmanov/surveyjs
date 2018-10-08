<div class={css.root}>
	{model.getAllQuestions().length}
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
	    }
	  }
	};
</script>