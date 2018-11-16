
<div class={css.progress}>
    <div class="css.progressBar" style="width: { survey.getProgress() + '%'}"
      role="progressbar" aria-valuemin="0" aria-valuemax="100">
        <span>
          {survey.progressText}
        </span>
    </div>
</div>

<script>
  export default {
    data() {
      return {
        survey: null,
        css: null
      };
    }
  };
</script>