const errorHandler = require('../../middleware/errorHandler');

describe('Error Handling Middleware', () => {
   let mockReq, mockRes, mockNext, mockError;

   beforeEach(() => {
      mockReq = {};
      mockRes = {
         status: jest.fn().mockReturnThis(),
         send: jest.fn(),
      };
      mockNext = jest.fn();

      mockError = new Error('mocked error');
   });

   it('should log the error stack and send a 500 response with the error', () => {
      console.error = jest.fn();
      errorHandler(mockError, mockReq, mockRes, mockNext);
      expect(console.error).toHaveBeenCalledWith(mockError.stack);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({ error: mockError });
      expect(mockNext).not.toHaveBeenCalled();
   });
});
