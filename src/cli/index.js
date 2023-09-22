#!/usr/bin/env node
require('module-alias/register');

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const executeCLI = require('./handler');

const argv = yargs(hideBin(process.argv))
   .usage('$0 <cmd> [args]')
   .command('show', 'Display tasks', {})
   .command('insert [data]', 'Insert tasks. If no data provided, it reads from stdin', {})
   .option('show', {
      alias: 's',
      describe: 'Display tasks',
      type: 'boolean',
   })
   .option('insert', {
      alias: 'i',
      describe: 'Insert tasks',
      type: 'string',
   })
   .example('$0 --show', 'Display all tasks')
   .example('$0 --insert < examples/input.json', 'Insert tasks from a file')
   .example(
      '$0 --insert \'[{"description":"Task","responsable":"John","status":"todo"}]\'',
      'Insert a task from command line'
   )
   .help()
   .alias('h', 'help').argv;

try {
   executeCLI(argv);
} catch (err) {
   console.error(err.message);
   process.exit(1);
}
