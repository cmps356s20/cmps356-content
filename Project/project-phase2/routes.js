const express = require('express');
const halaqaService = require('./HalaqaService');

const router = express.Router();

router.post('/login', halaqaService.login);

router.get('/surahs', halaqaService.getSurahs);
router.get('/students/:teacherId', halaqaService.getTeacherStudents);
router.get('/students/', halaqaService.getStudents);

router.get('/students/:studentId/tasks/:status', halaqaService.getTasks);
router.get('/tasks/:taskId', halaqaService.getTask);

router.delete('/tasks/:taskId', halaqaService.deleteTask);
router.post('/tasks', halaqaService.addTask);
router.put('/tasks', halaqaService.updateTask);
router.patch('/tasks', halaqaService.completeTask);

router.get('/messages/:studentId', halaqaService.getMessages) ;
router.post('/messages', halaqaService.addMessage);

router.get('/parents', halaqaService.getParents);
router.get('/parents/:parentId/students', halaqaService.getParentStudents );

router.get('/teachers', halaqaService.getTeachers );

router.post('/students', halaqaService.addParent);
router.put('/students/:parentId', halaqaService.addStudent);

//e.g., http://localhost:8090/api/report/01-04-2020/30-04-2020
router.get('/report/:fromDate/:toDate', halaqaService.halaqaSummaryReport) ;

module.exports = router;