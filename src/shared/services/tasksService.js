const db = require('../config/db');

/**
 * Retorna todas as tasks salvas no banco de dados.
 *
 * @async
 * @returns {Array<Object>} Um array contendo todas as tasks.
 * @throws {Error} Algum problema ao consultar o banco de dados.
 */
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

/**
 * Insere uma lista de tasks no banco de dados.
 *
 * @async
 * @param {Array<Object>} tasks - A lista de taks a ser inserida.
 * @param {string} [hostname='computer'] - O nome do host onde a tarefa foi criada.
 * @throws {Error} Algum problema ao inserir as tarefas no banco de dados.
 */
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

/**
 * Insere uma única task no banco de dados.
 *
 * @async
 * @param {Object} task - A task a ser inserida.
 * @param {string} hostname - O nome do host onde a tarefa foi criada.
 * @throws {Error} Algum problema ao inserir a tarefa no banco de dados.
 */
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
