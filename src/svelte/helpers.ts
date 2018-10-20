export const getIndentSize = (question: any, indent: any): any => {
  if (indent < 1 || !question.survey) return "";
  const css = question.survey["css"];
  if (!css) return "";
  return indent * css.question.indent + "px";
};
