jest.mock('firebase-admin', () => ({
   app: {
      initializeApp: jest.fn(),
      cert: jest.fn(),
   },
   firestore: {
      getFirestore: jest.fn().mockReturnValue({
         collection: jest.fn().mockReturnValue({
            get: jest.fn().mockResolvedValue({
               forEach: jest.fn(),
            }),
         }),
      }),
   },
}));

jest.mock('../../config/db', () => {
   const mockBatch = {
      set: jest.fn(),
      commit: jest.fn().mockResolvedValue(),
   };

   const mockDoc = {
      set: jest.fn(),
      data: jest.fn(),
   };

   return {
      collection: jest.fn().mockReturnValue({
         doc: jest.fn().mockReturnValue(mockDoc),
         get: jest.fn().mockResolvedValue({
            forEach: jest.fn(),
         }),
      }),
      batch: jest.fn().mockReturnValue(mockBatch),
      __mockDoc: mockDoc,
      __mockBatch: mockBatch,
   };
});

const { getTasksService, insertTaskService, insertTasksService } = require('../../services/tasksService');
const db = require('../../config/db');

describe('getTasksService', () => {
   it('should retrieve tasks successfully', async () => {
      const mockTasks = [{ description: 'Task 1' }, { description: 'Task 2' }];

      db.collection().get.mockResolvedValueOnce({
         forEach: (callback) => mockTasks.forEach((task) => callback({ data: () => task })),
      });

      const result = await getTasksService();
      expect(result).toEqual(mockTasks);
   });

   it('should throw an error when the database call fails', async () => {
      const mockError = new Error('DB Error');
      db.collection().get.mockRejectedValueOnce(mockError);

      await expect(getTasksService()).rejects.toThrow(mockError);
   });
});

describe('insertTasksService', () => {
   it('should insert multiple tasks successfully', async () => {
      const mockTasks = [
         { description: 'Criar Login', responsable: 'bruno', status: 'done' },
         { description: 'Criar Menu', responsable: 'bruno', status: 'doing' },
         { description: 'Criar tela de perfil', responsable: 'bruno', status: 'todo' },
      ];
      await insertTasksService(mockTasks, 'hostname');

      expect(db.__mockBatch.set).toHaveBeenCalledTimes(mockTasks.length);
      expect(db.__mockBatch.commit).toHaveBeenCalledTimes(1);
   });

   it('should throw an error when batch commit fails', async () => {
      const mockTasks = [
         { description: 'Criar Login', responsable: 'bruno', status: 'done' },
         { description: 'Criar Menu', responsable: 'bruno', status: 'doing' },
         { description: 'Criar tela de perfil', responsable: 'bruno', status: 'todo' },
      ];
      const mockError = new Error('Batch Error');
      db.__mockBatch.commit.mockRejectedValueOnce(mockError);

      await expect(insertTasksService(mockTasks, 'hostname')).rejects.toThrow(mockError);
   });
});

describe('insertTaskService', () => {
   it('should insert a single task successfully', async () => {
      const mockTask = { description: 'Criar tela de perfil', responsable: 'bruno', status: 'todo' };
      await insertTaskService(mockTask, 'hostname');

      expect(db.__mockDoc.set).toHaveBeenCalledWith({ ...mockTask, computer: 'hostname' });
   });

   it('should throw an error when doc set fails', async () => {
      const mockTask = { description: 'Task 1' };
      const mockError = new Error('Doc Error');
      db.__mockDoc.set.mockRejectedValueOnce(mockError);

      await expect(insertTaskService(mockTask, 'hostname')).rejects.toThrow(mockError);
   });
});

afterEach(() => {
   jest.clearAllMocks();
});
