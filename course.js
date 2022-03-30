"use strict";
function DOMFilter (data) {
    let { baseArray, filterKey, filterLabelKey } = data
    let container = document.querySelector(".filter");
//filter courses

let input = document.querySelector("input")
input.addEventListener("keyup", function () {
  filterLabelKey = this.value
  filterLabelKey = filterLabelKey.toLowerCase()
  clear()
  let filteredArray = baseArray.courses.filter(obj =>
    obj[filterKey].toLowerCase().includes(filterLabelKey)
  )
  if (filterLabelKey) data.DOMCreator(filteredArray)
})

return container
}

function clear (){
    document.querySelector(".listContainer").innerHTML=" ";
}


const main = document.querySelector("main");


let data = {
    baseArray: DATABASE,
    filterKey: "title",
    filterLabelName: "Search Courses By Title",
    filterLabelKey: '',
    DOMCreator (array) {
      array.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase())
      array.forEach(course => {
        document.querySelector('.listContainer').append(DOMCourse(course))
      })
    }
   }
   main.prepend(DOMFilter(data));


function DOMCourse(course){
    let container = document.createElement("div");
    container.classList.add("course");

    // Add Title to container 
    container.append(courseTitle(course, container));

    // Add Staff to container 
    container.append(courseStaff(course));

    // Add Students to container 
    container.append(courseStudents(course));

    return container;

   
function courseTitle(course){  
    let courseTitle = document.createElement("h2");
    let container = document.createElement("div");

    courseTitle.textContent = course.title;
    container.appendChild(courseTitle);

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
        let respID = [responsibleId];

    cResponsible.appendChild(responsibleTitle);
    cResponsible.appendChild(DOMTeacher(respID));
    container.appendChild(cResponsible);

//employees

    let staffC = document.createElement("div");
    staffC.classList.add("staff");

    let staffTitle = document.createElement("h3");
    staffTitle.textContent = "Teachers:";
    staffC.appendChild(staffTitle);

    let teacherC = document.createElement("div");
    teacherC.appendChild(DOMTeacher(course.teachers));

    staffC.appendChild(teacherC);
    container.appendChild(staffC);

    return container; 
}
//Find students
function courseStudents (course) {
   
    let students = DATABASE.students.filter(student =>
      student.courses.find(c => c.courseID == course.courseID)
    )
    let studentArray = students.map(student => {
      let specCourse = student.courses.find(c => c.courseID == course.courseID)
  
      const container = {}
  
      container.firstName = student.firstName
      container.lastName = student.lastName
      container.passedCredits = specCourse.passedCredits
      container.semester = specCourse.started.semester
      container.year = specCourse.started.year
  
      return container
    })
 

    studentArray.sort((a, b) => a.year - b.year);
    let containerStudents = document.createElement("div")
    containerStudents.classList.add("students");
    container.append(containerStudents);

    containerStudents.innerHTML =`
    <div>Students:</div>
    <div class="list"></div>
    `;

    studentArray.forEach(student => {
        let containerStudent = document.createElement("div")
        containerStudent.classList.add('student')
    
        let studentNameCred = document.createElement("span")
        studentNameCred.textContent = `${student.firstName} ${student.lastName} (${student.passedCredits} credits)`
        containerStudent.appendChild(studentNameCred)
    
        let courseInfo = document.createElement("span")
        courseInfo.textContent = `${student.semester} ${student.year}`
        containerStudent.appendChild(courseInfo)
    
        if (student.passedCredits == course.totalCredits) {
          containerStudent.style.backgroundColor = "rgb(145, 194, 136)";
    
          containerStudent.style.color = "rgb(248, 243, 236)";
    
        }
    
        containerStudents.querySelector('.list').append(containerStudent)
      })
    
      return containerStudents
    }
}
   

function DOMTeacher (teacherID) {
    let container = document.createElement("div");
    
    teacherID.forEach(id => {
      let staff = document.createElement("span");
      let firstName = DATABASE.teachers.find(teacher => teacher.teacherId == id).firstName
      let lastName = DATABASE.teachers.find(teacher => teacher.teacherId == id).lastName
      let post = DATABASE.teachers.find(teacher => teacher.teacherId == id).post
      staff.textContent = `${firstName} ${lastName} (${post})`
    
      container.appendChild(staff)
    })
    
    return container
}


   
