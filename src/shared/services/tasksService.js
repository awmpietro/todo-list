const db = require('../config/db');

const getTasksService = async () => {
   try {
      const snapshot = await db.collection('tasks').get();
      const tasks = [];
      snapshot.forEach((doc) => {
         tasks.push(doc.data());
      });
      return tasks;
   } catch (err) {
      throw err;
   }
};

const insertTasksService = async (tasks, hostname = 'computer') => {
   try {
      for (const task of tasks) {
         task.computer = hostname || 'computer';
      }
      const batch = db.batch();
      tasks.forEach((task) => {
         const taskRef = db.collection('tasks').doc();
         batch.set(taskRef, task);
      });
      await batch.commit();
      return void 0;
   } catch (err) {
      throw err;
   }
};

const insertTaskService = async (task, hostname) => {
   try {
      task.computer = hostname;
      const newDocRef = db.collection('tasks').doc();
      await newDocRef.set(task);
      return void 0;
   } catch (err) {
      throw err;
   }
};

module.exports = {
   getTasksService,
   insertTasksService,
   insertTaskService,
};
