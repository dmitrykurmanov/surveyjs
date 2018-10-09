<span style="position: static;">
	{#if locString.hasHtml}
	<span style="position: static;">
		sss {@html locString.renderedHtml}
	</span>
	{:else} {locString.renderedHtml} {/if}
</span>

<script>
  import { LocalizableString } from "../localizablestring";

  export default {
    data() {
      return {
        locString: null
      };
    }
  };
</script>