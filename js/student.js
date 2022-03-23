"use strict";

//filters students by its last name


/*

function renderStudents (students){
    let studentsElement = document.getElementById("wrapper");

    for (let student of students) {
        console.log(student.studentID)
        console.log(renderStudent(student.studentID))
        let studentElement = renderStudent(student.studentID);
        studentsElement.appendChild(studentElement);
    }
}
*/


function studentName (firstName, lastName, totalCredits){
    let main = document.createElement("div");

    let studentTitle = document.createElement("h2");
    studentTitle.textContent = `${firstName} ${firstName} (total:${firstName})`;

    let courseTitle = document.createElement("h3");
    courseTitle.textContent ="Courses:";

    main.appendChild(studentTitle);
    main.appendChild(courseTitle);


}
