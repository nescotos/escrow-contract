import web3 from './web3';
const abi = JSON.parse(require('./compiled/Escrow.json').interface);

export function getContractFromAddress(address){
    return new web3.eth.Contract(abi, address);
}