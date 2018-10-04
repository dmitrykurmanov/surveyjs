<div class={msg}>
	{model.getAllQuestions().length}
</div>

<script>
	import { SurveyModel } from "../survey";
	import { surveyCss } from "../defaultCss/cssstandard";

	export default {
	  data() {
	    return {
	      json: null
	    };
	  },
	  computed: {
	    model: ({ json }) => {
	      debugger;
	      var sm = SurveyModel;
	      const model = new SurveyModel(json);
	      console.log(model.getAllQuestions().length);
	      return model;
	    }
	  }
	};
</script>