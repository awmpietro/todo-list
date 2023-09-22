const { stdin: mockStdin } = require('mock-stdin');
const { readDataFromFile, readDataFromArg } = require('../../utils/dataReader');

describe('dataReader', () => {
   let stdin;

   beforeEach(() => {
      stdin = mockStdin();
   });

   afterEach(() => {
      stdin.restore();
   });

   describe('readDataFromFile', () => {
      it('should read data from file and return parsed JSON', async () => {
         setTimeout(() => {
            stdin.send('[{"description":"test"}]');
            stdin.end();
         }, 0);

         const result = await readDataFromFile();
         expect(result).toEqual([{ description: 'test' }]);
      });

      it('should handle invalid JSON', async () => {
         setTimeout(() => {
            stdin.send('{ not valid json }');
            stdin.end();
         }, 0);

         await expect(readDataFromFile()).rejects.toThrow();
      });
   });

   describe('readDataFromArg', () => {
      it('should parse valid JSON string argument', () => {
         const jsonData = '[{"description":"test"}]';
         const result = readDataFromArg(jsonData);
         expect(result).toEqual([{ description: 'test' }]);
      });

      it('should handle invalid JSON string argument', () => {
         const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
         const invalidJson = '{ not valid json }';
         readDataFromArg(invalidJson);
         expect(consoleSpy).toHaveBeenCalledWith('Error parsing JSON:', expect.any(Error));
         consoleSpy.mockRestore();
      });
   });
});
