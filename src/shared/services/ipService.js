const dns = require('dns');
const requestIp = require('request-ip');

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
