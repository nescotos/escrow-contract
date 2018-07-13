import web3 from './web3';

const abi = JSON.parse(require('./compiled/EscrowFactory.json').interface);
const address = require('./env.json').contractAddress;

export default new web3.eth.Contract(abi, address);