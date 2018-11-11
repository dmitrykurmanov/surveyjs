export const getIndentSize = (question: any, indent: any): any => {
  if (indent < 1 || !question.survey) return "";
  const css = question.survey["css"];
  if (!css) return "";
  return indent * css.question.indent + "px";
};

export const listenArrayChanged = (element: any, handler: any): any => {
  if (!element) return;
  if (!element.iteratePropertiesHash) return;

  const doIterate = (hash: any, key: any): any => {
    let val = hash[key];
    if (!Array.isArray(val)) return;
    (<any>val)["onArrayChanged"] = handler;
  };

  element.iteratePropertiesHash(doIterate);

  element.setPropertyValueCoreHandler = (hash: any, key: string, val: any) => {
    if (hash[key] === val) return;
    hash[key] = val;
    handler();
  };

  element.visibleRowsChangedCallback = handler;
};

export const getMaxLength = (maxLengthValue: any): any => {
  if (maxLengthValue === null) return 524288;
  return maxLengthValue;
};

export const getValue = (oldValue: any): any => {
  return oldValue || "";
};
