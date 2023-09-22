const { getTasksService, insertTasksService, insertTaskService } = require('../../shared/services/tasksService');
const { resolveIPToHostname } = require('../../shared/services/ipService');

const getTasks = async (req, res, next) => {
   try {
      const tasks = await getTasksService();
      res.json(tasks);
   } catch (err) {
      next(err);
   }
};

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
