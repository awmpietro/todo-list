const { printTasks } = require('../../utils/tablePrinter');
const Table = require('cli-table3');

describe('dataPrinter', () => {
   describe('printTasks', () => {
      let consoleLogSpy;

      beforeEach(() => {
         consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
      });

      afterEach(() => {
         consoleLogSpy.mockRestore();
      });

      it('should correctly print tasks to the console', () => {
         const mockTasks = [
            {
               id: 1,
               description: 'Task 1',
               responsable: 'John',
               status: 'Done',
               computer: 'PC-1',
            },
            {
               id: 2,
               description: 'Task 2',
               responsable: 'Jane',
               status: 'Pending',
               computer: 'PC-2',
            },
         ];

         printTasks(mockTasks);

         const table = new Table({
            head: ['id', 'Description', 'Responsável', 'Status', 'Computador'],
            chars: { mid: '', 'left-mid': '', 'mid-mid': '', 'right-mid': '' },
         });

         mockTasks.forEach((task) => {
            table.push([task.id, task.description, task.responsable, task.status, task.computer]);
         });

         expect(consoleLogSpy).toHaveBeenCalledWith(table.toString());
      });

      it('should handle empty tasks', () => {
         const mockTasks = [];
         printTasks(mockTasks);

         const table = new Table({
            head: ['id', 'Description', 'Responsável', 'Status', 'Computador'],
            chars: { mid: '', 'left-mid': '', 'mid-mid': '', 'right-mid': '' },
         });

         expect(consoleLogSpy).toHaveBeenCalledWith(table.toString());
      });
   });
});
