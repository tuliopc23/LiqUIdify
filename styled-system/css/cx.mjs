function cx() {
  let str = "";
  let i = 0;
  let arg;

  for (; i < arguments.length; ) {
    if ((arg = arguments[i++]) && typeof arg === "string") {
      str && (str += " ");
      str += arg;
    }
  }
  return str;
}

export { cx };
