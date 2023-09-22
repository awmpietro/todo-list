const dns = require('dns');
const requestIp = require('request-ip');

/**
 * Resolve um endereço IP para um nome de host. Se não conseguir resolver,
 * retorna 'computer' como padrão.
 *
 * @param {Object} req - Request do Express.
 * @returns {Promise<string>} Uma promise que resolve para o nome de host ou 'computer'.
 */
const resolveIPToHostname = (req) => {
   return new Promise((resolve) => {
      const clientIp = requestIp.getClientIp(req);
      dns.reverse(clientIp, (err, hostnames) => {
         if (err) {
            resolve('computer');
         } else {
            resolve(hostnames[0] || 'computer');
         }
      });
   });
};

module.exports = {
   resolveIPToHostname,
};
