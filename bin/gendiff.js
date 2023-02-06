#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
const program = new Command();

program
    .helpOption('-h, --help', 'display help for command')
    .version('0.8.0')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .option('-f, --format <type>', 'output format');

program.parse();
    

console.log('1');

