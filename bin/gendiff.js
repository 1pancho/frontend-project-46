#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import genDiff from '../src/index.js';

const program = new Command();

program
    .helpOption('-h, --help', 'display help for command')
    .version('0.8.0')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .option('-f, --format <type>', 'output format')
    .action((filepath1, filepath2) => {
        console.log(genDiff(filepath1,filepath2));
    });

program.parse(process.argv);
