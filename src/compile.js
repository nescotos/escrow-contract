const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

console.info(`-- BUILD STARTED --`);
const buildPath = path.resolve(__dirname, 'compiled');
console.info(`- Removing Build Path ${buildPath}`);
fs.removeSync(buildPath);
const contractsPath = path.resolve(__dirname, 'contracts', 'Escrow.sol');
console.info(`- Reading Solidity Source Code for Smart Contracts`);
const source = fs.readFileSync(contractsPath, 'utf-8');
console.info(`- Compiling Solidity Code from ${contractsPath}`);
const output = solc.compile(source, 1).contracts;
console.info(`- Creating Build Path in ${buildPath}`);
fs.ensureDirSync(buildPath);
for(let contract in output){
    fs.outputJsonSync(
        path.resolve(buildPath, `${contract.replace(':', '')}.json`),
        output[contract]
    );
    console.info(`- Creating ${contract.replace(':', '')}.json`);
}
console.info(`-- BUILD DONE --`);