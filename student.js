"use strict";
function DOMFilter(data){
    let {baseArray, filterKey, filterLabelKey} = data;
    let container = document.querySelector(".filter");
//filter student

    let input = document.querySelector("input");
    input.addEventListener("keyup", function(){
        filterLabelKey = this.value;
        filterLabelKey = filterLabelKey.toLowerCase();
        clear();
        let filteredArray = baseArray.students.filter(obj => obj [filterKey].toLowerCase().includes(filterLabelKey) );
            if(filterLabelKey) data.DOMCreator(filteredArray);
    });
    return container;
}

function clear(){
    document.querySelector(".listContainer").innerHTML="";
}

let data = {
    baseArray: DATABASE ,
    filterKey: "lastName",
    filterLabelName: "Search Studenst By Last Name",
    filterLabelKey: "",
    DOMCreator(array) {
        let started = "started"; // to access "started" key in courses object
        array.sort( (a, b) => a.lastName.toLowerCase() > b.lastName.toLowerCase() );
        array.forEach( array => array.courses.sort( (a, b)  => a[started].year - b[started].year ||
        a[started].semester.toLowerCase() < b[started].semester.toLowerCase() ));

        array.forEach( student => {
            student.totalCredits = student.courses.map( course => course.passedCredits).reduce((prev, next) => prev + next);
            document.querySelector(".listContainer").append(DOMStudent(student));
        });
    }
};

const main = document.querySelector("main");
main.prepend(DOMFilter(data));

//SKAPAR STUDENTERNA: 

function DOMStudent(student){

    let container = document.createElement("div");
    container.classList.add("student");

    // Add Name
    container.append(studentName(student.firstName, student.lastName, student.totalCredits));

    // Add Courses
    student.courses.forEach( course => container.append(studentCourses(course)) );

    return container;

    function studentName(firstName, lastName, totalCredits){
        
        let container = document.createElement("div");

        let studentTitle = document.createElement("h2");
        studentTitle.textContent = `${firstName} ${lastName} (total: ${totalCredits} credits)`;

        let courseTitle = document.createElement("h3");
        courseTitle.textContent = "Courses:";

        container.appendChild(studentTitle);
        container.appendChild(courseTitle);
        
        return container;
    }

//go through the courses
//DATA
function studentCourses(course){
    let courseName = DATABASE.courses.find( element => element.courseId == course.courseId ).title;
    let courseCredit = DATABASE.courses.find( element => element.courseId == course.courseId ).totalCredits;
    let started = "started"; // to access "started" key in courses object
  
    let container = document.createElement("div");
    container.classList.add("course");

    let courseTitle = document.createElement("span");
    courseTitle.textContent = courseName;

    container.appendChild(courseTitle);

    courseTitle.style.fontWeight = "bold";

    let info = document.createElement("span");
    info.textContent = ` ${course[started].semester} ${course[started].year} (${course.passedCredits} of ${courseCredit})`;
    if ( course.passedCredits == courseCredit ) {
        container.style.backgroundColor = "rgb(145, 194, 136)";
        container.style.color = "rgb(248, 243, 236)";
        
        
    }

    container.appendChild(info);

    return container;
 }
}
