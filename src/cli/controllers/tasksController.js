const os = require('os');
const { getTasksService, insertTasksService } = require('@services/tasksService');
const { readDataFromFile, readDataFromArg } = require('../utils/dataReader');
const { printTasks } = require('../utils/tablePrinter');

const getTasks = async () => {
   try {
      const tasks = await getTasksService();
      printTasks(tasks);
   } catch (err) {
      throw err;
   }
};

const insertTasks = async (readFromFile, jsonData = '') => {
   try {
      let data = '';
      const hostname = os.hostname();
      if (readFromFile) {
         data = await readDataFromFile();
      } else {
         data = readDataFromArg(jsonData);
      }
      await insertTasksService(data, hostname);
      return console.log('tasks inserted succesfully.');
   } catch (err) {
      throw err;
   }
};

module.exports = {
   getTasks,
   insertTasks,
};
