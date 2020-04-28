const halaqaRepository = require('./HalaqaRepository');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/halaqaDB')
        .then(() => console.log("Connected to halaqaDB!!"))
        .catch(err => console.log(err));

halaqaRepository.initDB().then(() => console.log('DB initialized'));
halaqaRepository.getSurahs().then(surahs => console.log(surahs));

//halaqaRepository.getStudents().then(students => console.log(students));
//halaqaRepository.getTeacherStudents(501).then(students => console.log(students));
//halaqaRepository.getParentStudents(12).then(students => console.log(students));

//halaqaRepository.getSurahs().then(surahs => console.log(surahs));
//halaqaRepository.getTasks(1, "Pending").then(tasks => console.log(tasks));
//halaqaRepository.getTask(16).then(task => console.log(task));

//halaqaRepository.getMessages(1).then(messages => console.log(messages));
//halaqaRepository.getParents().then(parents => console.log(parents));
//halaqaRepository.getParent(12).then(parent => console.log(parent));

//halaqaRepository.getTeachers().then(teachers => console.log(teachers));
//halaqaRepository.getTeacher(500).then(teacher => console.log(teacher));

//halaqaRepository.login({email: 'coordinator@halaqa.org', password: 'password'}).then(userInfo => console.log(userInfo));