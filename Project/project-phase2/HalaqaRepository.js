const fs = require('fs-extra');

class HalaqaRepository {
    async getStudents() {
        const parents = await fs.readJson('./data/parent.json');
        //Using spread operator to flatten multidimensional arrayOfArrays
        const students = [];
        parents.forEach(p => students.push(...p.students));
        return students;
    }

    async getStudent(studentId) {
        const students = await this.getStudents();
        return students.find(s => s.studentId == studentId);
    }

    async getTeacherStudents(teacherId) {
        const students = await this.getStudents();
        return students.filter(s => s.teacherId == teacherId);
    }

    async getParentStudents(parentId) {
        const parents = await fs.readJson('./data/parent.json');
        const parent = parents.find(p => p.qatariId == parentId);
        if (parent)
            return parent.students;
    }

    async getSurahs() {
        return await fs.readJson('./data/surah.json');
    }

    async addSurah(surah) {
        const surahs = await fs.readJson('./data/surah.json');
        surahs.push(surah);
        await fs.writeJson("./data/surah.json", surahs);
    }

    async getTasks(studentId, taskStatus) {
        let tasks = await fs.readJson('./data/task.json');
        tasks = tasks.filter(t => t.studentId == studentId);

        if (taskStatus == "Completed") {
            tasks = tasks.filter(tasks => tasks.completedDate);
        } else if (taskStatus == "Pending") {
            tasks = tasks.filter(tasks => tasks.completedDate == undefined);
        }

        return tasks;
    }

    async getTask(taskId) {
        const tasks = await fs.readJson('./data/task.json');
        return tasks.find(t => t.taskId == taskId);
    }

    async deleteTask(taskId) {
        const tasks = await fs.readJson('./data/task.json');
        const taskIndex = tasks.findIndex(t => t.taskId == taskId);
        tasks.splice(taskIndex, 1);
        await fs.writeJson("./data/task.json", tasks);
    }

    async addTask(newTask) {
        const tasks = await fs.readJson('./data/task.json');
        newTask.taskId = Math.floor(Math.random() * 100);
        tasks.push(newTask);
        await fs.writeJson("./data/task.json", tasks);
    }

    async updateTask(updatedTask) {
        const tasks = await fs.readJson('./data/task.json');
        const taskIndex = tasks.findIndex(t => t.taskId == updatedTask.taskId);
        tasks[taskIndex] = updatedTask;
        await fs.writeJson("./data/task.json", tasks);
    }

    async completeTask(completedTask) {
        const tasks = await fs.readJson('./data/task.json');
        const taskIndex = tasks.findIndex(t => t.taskId == completedTask.taskId);
        tasks[taskIndex].completedDate = completedTask.completedDate;
        tasks[taskIndex].masteryLevel = completedTask.masteryLevel;
        tasks[taskIndex].comment = completedTask.comment;
        await fs.writeJson("./data/task.json", tasks);
    }

    async getMessages(studentId) {
        const messages = await fs.readJson('./data/message.json');
        return messages.filter(m => m.studentId == studentId);
    }

    async addMessage(message) {
        const messages = await fs.readJson('./data/message.json');
        message.id = Math.floor(Math.random() * 100);
        messages.push(message);
        await fs.writeJson('./data/message.json', messages);
    }

    async addParent(newParent) {
        const parents = await fs.readJson('./data/parent.json');
        parents.push(newParent);
        await fs.writeJson('./data/parent.json', parents);
    }

    /*Register new children with existing parent*/
    async addStudent(student, qatariId) {
        const parents = await fs.readJson('./data/parent.json');
        const index = parents.findIndex(p => p.qatariId == qatariId);
        student.studentId = Math.floor(Math.random() * 100);
        if (!parents[index].students) {
            parents[index].students = [];
        }
        parents[index].students.push(student);
        await fs.writeJson('./data/parent.json', parents);
    }

    async getParents() {
        const parents = await fs.readJson('./data/parent.json');
        parents.forEach(p => delete p.students);
        return parents;
    }

    async getParent(qatariId) {
        const parents = await fs.readJson('./data/parent.json');
        const parent = parents.find(p => p.qatariId == qatariId);
        //No need to return the students
        if (parent)
            delete parent.students;
        return parent;
    }

    async getTeachers() {
        return await fs.readJson('./data/teacher.json');
        //return teachers.filter(t=>t.isCoordinator != 1);
    }

    async getTeacher(teacherId) {
        const teachers = await fs.readJson('./data/teacher.json');
        return teachers.find(t => t.staffNo == teacherId);
    }

    async halaqaSummaryReport(fromDate, toDate) {
        //ToDo: Write an aggregate query to get Halaqa Summary Report data
        //Return the summary report
        return {fromDate, toDate};
    }

    async login(credentials) {
        let userInfo = await this.verifyStaffLogin(credentials);
        //If Staff login fails try parent login
        if (!userInfo)
            userInfo = await this.verifyParentLogin(credentials);
        return userInfo;
    }

    async verifyStaffLogin(credentials) {
        const teachers = await fs.readJson('./data/teacher.json');
        const teacher = teachers.find(s => s.email === credentials.email && s.password === credentials.password);
        if (teacher) {
            let userInfo = {
                id: teacher.staffNo,
                email: teacher.email,
                name: `${teacher.firstName} ${teacher.lastName}`
            };

            if (teacher.isCoordinator === 1) {
                userInfo.type = 'Coordinator';
                userInfo.redirectTo = '/index-coordinator.html';
            } else {
                userInfo.type = 'Teacher';
                userInfo.redirectTo = '/index-teacher.html';
            }
            return userInfo;
        }
    }

    async verifyParentLogin(credentials) {
        const parents = await fs.readJson('./data/parent.json');
        const parent = parents.find(s => s.email === credentials.email && s.password === credentials.password);
        if (parent) {
            let userInfo = {
                id: parent.qatariId,
                email: parent.email,
                name: `${parent.firstName} ${parent.lastName}`,
                type: 'Parent',
                redirectTo: '/index-parent.html'
            };
            return userInfo;
        }
    }
}

module.exports = new HalaqaRepository();