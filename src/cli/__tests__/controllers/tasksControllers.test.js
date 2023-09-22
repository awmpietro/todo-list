const os = require('os');

const { getTasks, insertTasks } = require('../../controllers/tasksController');
const { getTasksService, insertTasksService } = require('@services/tasksService');
const { readDataFromFile, readDataFromArg } = require('../../utils/dataReader');
const { printTasks } = require('../../utils/tablePrinter');

jest.mock('@services/tasksService');
jest.mock('../../utils/dataReader');
jest.mock('../../utils/tablePrinter');
jest.mock('os');

describe('Tasks Controller', () => {
   beforeEach(() => {
      jest.clearAllMocks();
   });

   describe('getTasks', () => {
      it('should retrieve tasks and print them', async () => {
         const mockTasks = [{ description: 'test' }];
         getTasksService.mockResolvedValue(mockTasks);

         await getTasks();

         expect(getTasksService).toHaveBeenCalledTimes(1);
         expect(printTasks).toHaveBeenCalledWith(mockTasks);
      });

      it('should handle errors from getTasksService', async () => {
         getTasksService.mockRejectedValue(new Error('Error fetching tasks'));

         await expect(getTasks()).rejects.toThrow('Error fetching tasks');
      });
   });

   describe('insertTasks', () => {
      it('should read data from a file and insert tasks', async () => {
         readDataFromFile.mockResolvedValue([{ description: 'test' }]);
         os.hostname.mockReturnValue('test-hostname');

         await insertTasks(true);

         expect(readDataFromFile).toHaveBeenCalledTimes(1);
         expect(insertTasksService).toHaveBeenCalledWith([{ description: 'test' }], 'test-hostname');
      });

      it('should read data from JSON arg and insert tasks', async () => {
         const jsonData = '[{"description": "test"}]';
         readDataFromArg.mockReturnValue([{ description: 'test' }]);
         os.hostname.mockReturnValue('test-hostname');

         await insertTasks(false, jsonData);

         expect(readDataFromArg).toHaveBeenCalledWith(jsonData);
         expect(insertTasksService).toHaveBeenCalledWith([{ description: 'test' }], 'test-hostname');
      });

      it('should handle errors', async () => {
         readDataFromFile.mockRejectedValue(new Error('Error reading file'));

         await expect(insertTasks(true)).rejects.toThrow('Error reading file');
      });
   });
});
