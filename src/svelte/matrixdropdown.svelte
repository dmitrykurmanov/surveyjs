<div style="overflow-x: {getOverflowX(question)};">
    <MatrixTable question={question} />
</div>

<script>
  import MatrixTable from "./matrixtable.svelte";
  export default {
    data() {
      return {
        question: null,
        css: null
      };
    },
    components: {
      MatrixTable
    },
    helpers: {
      getOverflowX(question) {
        return question.horizontalScroll ? "scroll" : "";
      }
    }
  };
</script>