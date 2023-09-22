const { getTasksService, insertTasksService, insertTaskService } = require('../../shared/services/tasksService');
const { resolveIPToHostname } = require('../../shared/services/ipService');

/**
 * @function getTasks
 * @description Endpoint para buscar todas as tasks
 * @param {Object} req - Request do Express.
 * @param {Object} res - Response do Express.
 * @param {function} next - Função next do middleware do Express para continuar o fluxo ou capturar erros.
 */
const getTasks = async (req, res, next) => {
   try {
      const tasks = await getTasksService();
      res.json(tasks);
   } catch (err) {
      next(err);
   }
};

/**
 * @function insertTasks
 * @description Endpoint para inserir uma lista de taskss.
 * @param {Object} req - Request do Express.
 * @param {Object} res - Response do Express.
 * @param {function} next - Função next do middleware do Express para continuar o fluxo ou capturar erros.
 */
const insertTasks = async (req, res, next) => {
   try {
      const tasks = req.body;
      const hostname = await resolveIPToHostname(req);

      await insertTasksService(tasks, hostname);
      res.status(201).end();
   } catch (err) {
      next(err);
   }
};

/**
 * @function insertTask
 * @description Endpoint para inserir uma única task.
 * @param {Object} req - Request do Express.
 * @param {Object} res - Response do Express.
 * @param {function} next - Função next do middleware do Express para continuar o fluxo ou capturar erros.
 */
const insertTask = async (req, res, next) => {
   try {
      const task = req.body;
      const hostname = await resolveIPToHostname(req);

      await insertTaskService(task, hostname);
      res.status(201).end();
   } catch (err) {
      next(err);
   }
};

module.exports = { getTasks, insertTasks, insertTask };
