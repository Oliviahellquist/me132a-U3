"use strict";

//All students
for (let student of DATABASE.students){
    //One student
    for (let studentCourse of student.courses){
        //Find the courses for this student
        for (let dbCourse of DATABASE.courses){
            if (studentCourse.courseId == dbCourse.courseId){
                console.log(dbCourse.title);

            }
        }
    }
}