import variable from "./../variables/platform";

export default (variables = variable) => {
  const labelTheme = {
    ".focused": {
      width: 0
    },
    fontSize: 17,
    fontFamily: variables.fontFamily,
    color: variables.textColor,
  };

  return labelTheme;
};
