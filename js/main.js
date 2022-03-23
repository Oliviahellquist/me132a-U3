"use strict";

let selector = document.querySelector("#theme-selector");
let cssLink = document.querySelector("#theme");

selector.addEventListener("change", changeTheme);

//make the function that change the theme 
function changeTheme(){
    cssLink.href = `${selector.value}.css`;
    localStorage.setItem("theme", selector.value);
}
//saved in localstorage
function setTheme(){
    let theme = localStorage.getItem("theme");
    console.log(theme);
    cssLink.href = `${theme}.css`;
}

setTheme();