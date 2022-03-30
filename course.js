"use strict";
function DOMFilter(data){
    let {baseArray, filterKey, filterLabelKey} = data;
    let container = document.querySelector(".filter");
//filter courses

    let input = document.querySelector("input");
    input.addEventListener("keyup", function(){
        filterLabelKey = this.value;
        filterLabelKey = filterLabelKey.toLowerCase();
        clear();
        let filteredArray = baseArray.courses.filter(obj => obj [filterKey].toLowerCase().includes(filterLabelKey) );
            if(filterLabelKey) data.DOMCreator(filteredArray);
    });
    return container;
}

function clear(){
    document.querySelector(".listContainer").innerHTML="";
}


let data = {
    baseArray: DATABASE,
    filterKey: "title",
    filterLabelName: "Search Courses By Title",
    filterLabelKey: "",
    DOMCreator(array) {
        array.sort( (a, b) => a.title.toLowerCase() > b.title.toLowerCase() );
        array.forEach( course => {
            document.querySelector(".listContainer").append(DOMCourse(course));
        })
    }
};

const main = document.querySelector("main");
main.prepend(DOMFilter(data));


function DOMCourse(course){
    let container = document.createElement("div");
    container.classList.add("course");

    // Add Title to container 
    container.append(courseTitle(course));

    // Add Staff to container 
    container.append(courseStaff(course));

    // Add Students to container 
    container.append(courseStudents(course));

    return container;

   
function courseTitle(course){   
    let container = document.createElement("div");
    container.textContent = course.title;
    return container; 
}
 //Creating the responsible title and name 
function courseStaff(course){   
    let container = document.createElement("div");

    let cResponsible = document.createElement("div");
    cResponsible.classList.add("responsible");

    let responsibleTitle = document.createElement("h3");
    responsibleTitle.textContent = "Course Responsible:";

    let responsibleId = DATABASE.teachers.find( 
        teacher => teacher.teacherId == course.courseResponsible ).teacherId;
    cResponsible.appendChild(responsibleTitle);
    cResponsible.appendChild(DOMTeacher(responsibleId));
    container.appendChild( cResponsible);

//employees

    let staffC = document.createElement("div");
    staffC.classList.add("staff");

    let staffTitle = document.createElement("h3");
    staffTitle.textContent = "Teachers:";
    staffC.appendChild(staffTitle);

    let teacherC = document.createElement("div");
    teacherC.appendChild( DOMTeacher(course.teachers));

    staffC.appendChild(teacherC);
    container.appendChild(staffC);

    return container; 
}

function courseStudents(course){
    //find student
    let students = DATABASE.student.filter( student => student.course.find(kurs => kurs.courseId == course.courseId));
    let studentArray = students.map(student => {
        let findCourse = student.courses.find(kurs => kurs.courseId == course.courseId);

        const container = {};
        container.firstName = student.firstName;
        container.lastName = student.lastName;
        container.passedCredits = findCourse.passedCredits;
        container.semester = findCourse.started.semester;
        container.year = findCourse.started.year;

        return container;
    });

    studentArray.sort((a, b) => a.year - b.year);
    let cStudents = document.createElement("div")
    cStudents.classList.add("students");
    container.append(cStudents);

    cStudents.innerHTML =`
    <div>Students:</div>
    <div id="list"></div>
    `;

    studentArray.forEach(student => {
        let cStudent = document.createElement("div");
        cStudent.classList.add("student");

        let studentTitle = document.createElement("span");
        studentTitle.textContent = `${student.firstName} ${student.lastName} ( ${student.passedCredits} credits)`;
        cStudent.appendChild(studentTitle);

        let courseTitle = document.createElement("span");
        courseTitle.textContent = `${student.semester} ${student.year}`;
        cStudent.appendChild(courseTitle);

        if ( student.passedCredits == course.totalCredits ) {
            cStudent.style.backgroundColor = "rgb(145, 194, 136)";
            cStudent.style.color = "rgb(248, 243, 236)";
        }

        cStudents.querySelector("#list").append(cStudent);
    });
    return cStudents;
};
}

function DOMTeacher(teacherID){
    let container = document.createElement("div");

    teacherIDD.forEach(id => {
        let staff = document.createElement("span");
        let firstName = DATABASE.teachers.find( teacher => teacher.teacherId == id ).firstName;
        let lastName = DATABASE.teachers.find( teacher => teacher.teacherId == id).lastName;
        let post = DATABASE.teachers.find( teacher => teacher.teacherId == id).post;
        staff.textContent = `${firstName} ${lastName} (${post})`;

        container.appendChild(staff);
    });
    return container;
}
