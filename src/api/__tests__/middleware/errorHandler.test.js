const errorHandler = require('../../middleware/errorHandler');

describe('Error Handling Middleware', () => {
   let mockReq, mockRes, mockNext, mockError;

   beforeEach(() => {
      // Mock request and response objects
      mockReq = {};
      mockRes = {
         status: jest.fn().mockReturnThis(), // Ensure we can chain the send function after setting status
         send: jest.fn(),
      };
      mockNext = jest.fn();

      // Mock an error for testing
      mockError = new Error('mocked error');
   });

   it('should log the error stack and send a 500 response with the error', () => {
      // Mock console.error to avoid actual logs during testing
      console.error = jest.fn();

      errorHandler(mockError, mockReq, mockRes, mockNext);

      // Assert console.error was called with the error stack
      expect(console.error).toHaveBeenCalledWith(mockError.stack);

      // Assert that the response status was set to 500 and the error was sent in the response
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({ error: mockError });

      // Ensure that the next middleware was not called since this is an error handler
      expect(mockNext).not.toHaveBeenCalled();
   });
});
