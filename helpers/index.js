export const setTheme = (t) => {
  document.getElementsByTagName("html")[0].setAttribute("data-theme", t.name);
  window.localStorage.setItem("theme", JSON.stringify(t));
};

export const loadTheme = () => {
  let savedTheme = JSON.parse(localStorage.getItem("theme"));
  if (!savedTheme) savedTheme = { name: "dark", type: "dark" };

  document
    .getElementsByTagName("html")[0]
    .setAttribute("data-theme", savedTheme.name);
  return savedTheme;
};

export const randomInt = (max) => Math.floor(Math.random() * max);

export const checkMyAnswer = (myAnswer, answers) => {
  for (var x = 0; x < answers.length; x++){
    if (myAnswer.toLowerCase() === answers[x].toLowerCase()) return true;
  }
  return false;
};

export const dateToBeutify = (date) => {
    let thisDate = new Date(date);
    let wordDate = `${thisDate.toLocaleString("en-us", {
      month: "short",
    })} ${thisDate.getDate()}, ${thisDate.getFullYear()} @ ${thisDate.toLocaleTimeString(
      "en-US",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    )}`;
    return wordDate;
  };

export const genArray = (len) =>{
    var array = Array.from(Array(len).keys())
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * i); // no +1 here!
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}