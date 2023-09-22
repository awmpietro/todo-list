const executeCLI = require('../handler');
const { getTasks, insertTasks } = require('../controllers/tasksController');

jest.mock('../controllers/tasksController');

describe('CLI Logic', () => {
   afterEach(() => {
      jest.clearAllMocks();
   });

   test('should call getTasks when --show is provided', () => {
      executeCLI({ show: true });
      expect(getTasks).toHaveBeenCalled();
      expect(insertTasks).not.toHaveBeenCalled();
   });

   test('should call insertTasks with jsonData when valid array string is passed', () => {
      const mockData = '[{"description":"Task","responsable":"John","status":"todo"}]';
      executeCLI({ insert: mockData });

      expect(insertTasks).toHaveBeenCalledWith(false, mockData);
   });

   test('should call insertTasks to read from stdin', () => {
      const mockData = '< examples/input.json';
      executeCLI({ insert: mockData });

      expect(insertTasks).toHaveBeenCalledWith(true);
   });

   test('should call insertTasks to read from stdin when invalid jsonData is passed', () => {
      const mockData = 'InvalidDataString';
      executeCLI({ insert: mockData });

      expect(insertTasks).toHaveBeenCalledWith(true);
   });
});
