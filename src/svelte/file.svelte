<div class={question.cssClasses.root}>
    {#if !question.isReadOnly}
      <input class={question.cssClasses.fileInput} type="file" id={question.inputId} 
          on:change="loadFiles(this)" aria-label={question.locTitle.renderedHtml} 
          {...{ multiple: question.allowMultiple ? 'multiple' : undefined }}
          title={question.inputTitle} accept={question.acceptedTypes} />
    {/if}

    {#if question.isReadOnly && !!question.value}
            <button class={question.cssClasses.removeButton} on:click="doClean()">
              {question.cleanButtonCaption}
            </button>
    {/if}

    {#if question.isReadOnly}
      <input type="file" disabled class={getPlaceholderClass(question)} 
        placeholder={question.title} style="color: transparent;"/>
    {/if}

    {#if !!question.previewValue}
      <div>
          {#each question.previewValue as val, index}
            <span key={question.inputId + '_' + index} class:sjs-hide="!val" class={question.cssClasses.preview}>
                {#if val.name}
                  <div>
                    <a href={val.content} title={val.name} download={val.name} width={question.imageWidth}>
                      {val.name}
                    </a>
                  </div>
                {/if}

                {#if question.canPreviewImage(val)}
                  <img src={val.content} height={question.imageHeight} width={question.imageWidth} alt="File preview">
                {/if}

                {#if val.name}
                  <div>
                    {#if !question.isReadOnly}
                      <span on:click="doRemoveFile(val, question)" class={question.cssClasses.removeFile}>
                        {question.removeFileCaption}
                      </span>
                    {/if}
                  </div>
                {/if}
            </span>
          {/each}
      </div>
    {/if}
</div>

<script>
  export default {
    data() {
      return {
        question: null,
        css: null
      };
    },
    methods: {
      loadFiles(src) {
        if (!window["FileReader"]) return;
        if (!src || !src.files || src.files.length < 1) return;

        let files = [];

        for (let i = 0; i < src.files.length; i++) {
          files.push(src.files[i]);
        }
        src.value = "";
        this.get().question.loadFiles(files);
      },
      doClean() {
        this.get().question.clear();
        this.refs.input.value = "";
      },
      doRemoveFile(data) {
        this.get().question.removeFile(data);
      }
    },
    helpers: {
      getPlaceholderClass(question) {
        return "form-control " + question.cssClasses.placeholderInput;
      }
    }
  };
</script>