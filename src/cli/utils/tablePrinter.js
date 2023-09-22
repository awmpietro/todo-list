const Table = require('cli-table3');

const printTasks = (tasks) => {
   const headers = {
      id: 'id',
      description: 'Description',
      responsable: 'Responsável',
      status: 'Status',
      computer: 'Computador',
   };

   const table = new Table({
      head: Object.values(headers),
      chars: { mid: '', 'left-mid': '', 'mid-mid': '', 'right-mid': '' },
   });

   tasks.forEach((task) => {
      table.push(Object.keys(headers).map((key) => task[key]));
   });

   console.log(table.toString());
};

module.exports = {
   printTasks,
};
