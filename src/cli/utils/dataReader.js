const readDataFromFile = () => {
   return new Promise((resolve, reject) => {
      let inputData = '';
      // Set the encoding for incoming data to be interpreted as a UTF-8 string
      process.stdin.setEncoding('utf8');

      // Listen for 'data' events, which gives us chunks of the input data
      process.stdin.on('data', (chunk) => {
         inputData += chunk;
      });

      // Listen for the 'end' event which signifies the end of input
      process.stdin.on('end', () => {
         try {
            const parsedData = JSON.parse(inputData);
            resolve(parsedData);
         } catch (err) {
            reject(err);
         }
      });

      // Begin reading from stdin so the runtime will know it needs to listen for more.
      process.stdin.resume();
   });
};

const readDataFromArg = (jsonData) => {
   try {
      const data = JSON.parse(jsonData);
      return data;
   } catch (err) {
      console.error('Error parsing JSON:', err);
   }
};

module.exports = {
   readDataFromFile,
   readDataFromArg,
};
