#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
const program = new Command();

program
    .helpOption('-h, --help', 'display help for command')
    .version('0.8.0');
    

program.parse();
    

console.log('1');

