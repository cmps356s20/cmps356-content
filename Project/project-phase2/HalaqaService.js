const halaqaRepository = require('./HalaqaRepository');

class HalaqaService {
    getStudents(req, res) {
        halaqaRepository.getStudents().then(students => {
            res.json(students);
        }).catch(err => {
            res.status(500).send(err);
        });
    }
    
    getTeacherStudents(req, res) {
        const teacherId = parseInt(req.params.teacherId);
        halaqaRepository.getTeacherStudents(teacherId).then(students => {
            res.json(students);
        }).catch(err => {
            res.status(500).send(err);
        });
    }

    getParentStudents (req,res) {
        const parentId = parseInt(req.params.parentId);
        halaqaRepository.getParentStudents(parentId).then(students => {
            res.json(students);
        }).catch(err => {
            res.status(500).send(err);
        });
    }

    getSurahs(req, res) {
        halaqaRepository.getSurahs().then(surahs => {
            res.json(surahs);
        }).catch(err => {
            res.status(500).send(err);
        });
    }

    getTasks(req, res){
        const studentId = parseInt(req.params.studentId);
        const taskStatus = req.params.status;
        halaqaRepository.getTasks(studentId, taskStatus).then(tasks => {
            res.json(tasks);
        }).catch(err => {
            res.status(500).send(err);
        });
    }

    getTask(req, res) {
        const taskId = parseInt(req.params.taskId);
        halaqaRepository.getTask(taskId).then(task => {
            res.json(task);
        }).catch(err => {
            res.status(500).send(err);
        });
    }

    deleteTask(req,res){
        const taskId = req.params.taskId;
        halaqaRepository.deleteTask(parseInt(taskId)).then(() =>{
            res.status(200).send("Task is successfully deleted.")
        }).catch(err => res.status(500).send(err));
    }

    addTask(req, res) {
        const newTask = req.body;
        halaqaRepository.addTask(newTask).then(() => {
            res.status(200).send("Task added successfully");
        }).catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
    }
    
    updateTask(req, res) {
        const updatedTask = req.body;
        halaqaRepository.updateTask(updatedTask).then(() => {
            res.status(200).send("Task updated successfully");
        }).catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
    }

    completeTask(req, res) {
        const completedTask = req.body;
        console.log("completeTask", completedTask);
        halaqaRepository.completeTask(completedTask).then(() => {
            res.status(200).send("Task updated successfully");
        }).catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
    }

    getMessages (req,res) {
        let studentId;
        //if studentId is not passed then annoucments will be returned
        if (req.params.studentId) {
            studentId = parseInt(req.params.studentId);
        }
        halaqaRepository.getMessages(studentId).then(messages => {
            res.json(messages);
        }).catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
    }
    
    async addMessage(req,res) {
        const message = req.body;
        message.date = (new Date()).toLocaleString('en-GB');
        console.log("Message to add:", message);

        try {
            await halaqaRepository.addMessage(message);
            res.status(200).send("Message added successfully. <br> <a href='/'>Back home</a>");
        } catch(err) {
            console.log(err);
            res.status(500).send(err);
        }
    }

    addParent(req, res) {
        const parent = req.body;
        halaqaRepository.addParent(parent).then(()=> {
            res.status(201).send(`Student successfully added`);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err)
        });
    }

    addStudent(req, res) {
        const newStudent = req.body;
        const parentId = parseInt(req.params.parentId);
        halaqaRepository.addStudent(newStudent, parentId).then(()=> {
            res.status(201).send(`Student successfully added`);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err)
        });
    }

    getParents(req, res) {
        halaqaRepository.getParents().then(parents => {
            res.json(parents);
        }).catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
    }

    getTeachers(req,res){
        halaqaRepository.getTeachers().then(teachers => {
            res.json(teachers);
        }).catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
    }

    async halaqaSummaryReport(req,res){
        const fromDate = req.params.fromDate;
        const toDate = req.params.toDate;

        try {
            const summaryReport = await halaqaRepository.halaqaSummaryReport(fromDate, toDate);
            res.json(summaryReport);
        }
        catch(err) {
            console.log(err);
            res.status(500).send(err);
        };
    }

    async login(req, res) {
        const credentials = req.body;
        console.log("app.post(/api/login).req.body", credentials);

        try {
            const userInfo = await halaqaRepository.login(credentials);
            if (userInfo)
                res = res.json(userInfo);
            else
                res.status(403).send();
        }
         catch(err) {
                console.log(err);
                res.status(500).send(err);
          };
    }
}

module.exports = new HalaqaService();