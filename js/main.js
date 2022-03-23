"use strict";

//Students, courses och theachers är objekt

// Dark and light theme
//Saved in localStorage
let selector = document.querySelector("#theme-selector");
let cssLink = document.querySelector("#theme");

selector.addEventListener("change", changeTheme);

//make the function that change the theme 
function changeTheme(){
    cssLink.href = `${selector.value}.css`;
    localStorage.setItem("theme", selector.value);
}

function setTheme(){
    let theme = localStorage.getItem("theme");
    console.log(theme);
    cssLink.href = `${theme}.css`;
}

setTheme();



    

//let lastname = person.lastname.toLowerCase();


//DATABASE.student[1].courses





function renderCourses (student){
    let courseData = DATABASE.courses
    let courses = []
    for (let course of student.courses){
        if (course.courseID == courseData.courseID)
        courses.push(courseData)
    }
    let courseDiv = []
    for (let course of courses){
        let div = document.createElement("div")

    }
}
