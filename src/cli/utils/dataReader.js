/**
 * Lê dados do stdin (como um arquivo) e retorna o JSON parseado.
 *
 * @returns {Promise<Object>} Uma promise que resolve com os dados parseados ou rejeita com um erro.
 */
const readDataFromFile = () => {
   return new Promise((resolve, reject) => {
      let inputData = '';
      process.stdin.setEncoding('utf8');

      process.stdin.on('data', (chunk) => {
         inputData += chunk;
      });

      process.stdin.on('end', () => {
         try {
            const parsedData = JSON.parse(inputData);
            resolve(parsedData);
         } catch (err) {
            reject(err);
         }
      });

      process.stdin.resume();
   });
};

/**
 * Analisa uma string JSON e retorna os dados parseados.
 *
 * @param {string} jsonData - A string contendo os dados em formato JSON.
 * @returns {Object} Os dados parseados.
 * @throws {Error} Se houver um erro ao parsear a string JSON.
 */

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
