const fs = require('fs-extra');
const path = require('path');

class StudentRepository {
    constructor() {
        this.studentFilePath = path.join(__dirname, '../data/student.json' );
        this.courseFilePath = path.join(__dirname, '../data/course.json' );
        this.staffFilePath = path.join(__dirname, '../data/staff.json' );
    }

    async getStudents() {
        return await fs.readJson(this.studentFilePath);
    }

    async authenticate(username, password) {
        const users = await this.getUsers();
        const user = users.find(s => s.username === username && s.password === password);
        if (user != "undefined") {
            return user;
        }
        else {
            throw new Error("Authentication failed");
        }
    }

    async getStudent(studentId) {
        let students = await this.getStudents();
        let student = students.find(s => s.studentId === studentId);
        if (student != "undefined") {
            return student;
        }
        else {
            throw new Error("No records found");
        }
    }

    async getCourses(courseIds) {
        const data = await fs.readFile(this.courseFilePath);
        let courses = JSON.parse(data);
        courses = courses.filter(c => courseIds.indexOf(c.crn) >= 0);
        //console.log(courses)
        return courses;
    }

    async getInstructor(instructorId) {
        const data = await fs.readFile(this.staffFilePath);
        const instructors = JSON.parse(data);
        const instructor = instructors.find(ins => ins.staffNo === instructorId);
        delete instructor.password; //No need to return the password attribute
        //console.log(instructor);
        return instructor;
    }

    async getStudentCourses(studentId) {
        const student = await this.getStudent(studentId);
        const courses = await this.getCourses(student.courseIds);
        //Get instructor details for each course
        for(const course of courses) {
            course.instructor = await this.getInstructor(course.instructorId);
        }

        student.courses = courses;
        return student;
    }
}

module.exports = new StudentRepository();