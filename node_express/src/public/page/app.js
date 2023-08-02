function addDivBg() {
  let div = document.querySelector("div");
  div.style.background = "url(/page/bg.png)";
  console.log("div");
  document.write("<div style='background: url(/page/bg.png)'></div>");
}

addDivBg();
