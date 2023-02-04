#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
const program = new Command();

program
    .option('-h, --help', 'display help for command');

program.parse();
    
