jest.mock('../../../shared/services/tasksService', () => ({
   getTasksService: jest.fn(),
   insertTasksService: jest.fn(),
}));

jest.mock('../../../shared/services/ipService', () => {
   return { resolveIPToHostname: jest.fn() };
});

const { getTasks, insertTasks } = require('../../controllers/tasksController');
const { getTasksService, insertTasksService } = require('../../../shared/services/tasksService');

describe('getTasks controller', () => {
   let mockReq, mockRes, mockNext;

   beforeEach(() => {
      // Reset the mock for the service
      getTasksService.mockClear();

      // Mock request, response, and next objects
      mockReq = {};
      mockRes = {
         json: jest.fn(),
      };
      mockNext = jest.fn();
   });

   it('should send tasks as JSON when successful', async () => {
      const mockTasks = [{ id: '1', description: 'Test task' }];
      getTasksService.mockResolvedValue(mockTasks);

      await getTasks(mockReq, mockRes, mockNext);

      expect(mockRes.json).toHaveBeenCalledWith(mockTasks);
      expect(mockNext).not.toHaveBeenCalled();
   });

   it('should call next with an error when the service fails', async () => {
      const mockError = new Error('mocked error');
      getTasksService.mockRejectedValue(mockError);

      await getTasks(mockReq, mockRes, mockNext);

      expect(mockRes.json).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(mockError);
   });
});

describe('insertTasks controller', () => {
   let mockReq, mockRes, mockNext;

   beforeEach(() => {
      // Reset the mocks for the services
      insertTasksService.mockClear();

      // Mock request, response, and next objects
      mockReq = {
         body: [
            { description: 'Criar Login', responsable: 'bruno', status: 'done' },
            { description: 'Criar Menu', responsable: 'bruno', status: 'doing' },
            { description: 'Criar tela de perfil', responsable: 'bruno', status: 'todo' },
         ],
      };
      mockRes = {
         status: jest.fn().mockReturnThis(),
         end: jest.fn(),
      };
      mockNext = jest.fn();
   });

   it('should respond with a 201 status when successful', async () => {
      insertTasksService.mockResolvedValue(); // No value needed, we're assuming success

      await insertTasks(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.end).toHaveBeenCalled();
      expect(mockNext).not.toHaveBeenCalled();
   });

   it('should call next with an error when the service fails', async () => {
      const mockError = new Error('mocked error');
      insertTasksService.mockRejectedValue(mockError);

      await insertTasks(mockReq, mockRes, mockNext);

      expect(mockRes.status).not.toHaveBeenCalled();
      expect(mockRes.end).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(mockError);
   });
});
