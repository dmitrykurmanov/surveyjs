export const getIndentSize = (question: any, indent: any): any => {
  if (indent < 1 || !question.survey) return "";
  const css = question.survey["css"];
  if (!css) return "";
  return indent * css.question.indent + "px";
};

export const getMaxLength = (maxLengthValue: any): any => {
  if (maxLengthValue === null) return 524288;
  return maxLengthValue;
};

export const getValue = (oldValue: any): any => {
  return oldValue || "";
};
