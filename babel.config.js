module.exports = {
   plugins: [
      [
         'module-resolver',
         {
            alias: {
               '@services': './src/shared/services',
               '@config': './src/shared/config',
            },
         },
      ],
   ],
};
