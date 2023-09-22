const os = require('os');
const { getTasksService, insertTasksService } = require('@services/tasksService');
const { readDataFromFile, readDataFromArg } = require('../utils/dataReader');
const { printTasks } = require('../utils/tablePrinter');

/**
 * Obtém todas as tasks do serviço e as imprime no console em um formato tabular.
 *
 * @throws {Error} Se houver um erro ao obter ou imprimir as tarefas.
 */
const getTasks = async () => {
   try {
      const tasks = await getTasksService();
      printTasks(tasks);
   } catch (err) {
      throw err;
   }
};

/**
 * Insere tasks a partir de um arquivo ou um argumento JSON fornecido.
 *
 * @param {boolean} readFromFile - Indica se os dados devem ser lidos de um arquivo.
 * @param {string} [jsonData=''] - O JSON stringificado das tarefas, se fornecido.
 *
 * @throws {Error} Se houver um erro ao inserir as tasks.
 */
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
