const { getTasks, insertTasks } = require('./controllers/tasksController');

function executeCLI(args) {
   if (args.show) {
      getTasks();
   } else if (args.insert !== undefined) {
      if (args.insert) {
         if (args.insert.startsWith('[')) {
            insertTasks(false, args.insert);
         } else {
            insertTasks(true);
         }
      } else {
         insertTasks(true);
      }
   } else {
      throw new Error('You need to specify a command to run');
   }
}

module.exports = executeCLI;
