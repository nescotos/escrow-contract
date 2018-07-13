const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const Config = require('./env');
const factory = require('./build/EscrowFactory.json');

const provider = new HDWalletProvider(
    Config.address,
    Config.endpoint
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.info('Attempting deployment using account', accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(factory.interface))
        .deploy({ data: '0x' + factory.bytecode })
        .send({ gas: '1000000', from: accounts[0], gasPrice: web3.utils.toWei('2', 'gwei') });
    console.info('Contract deployed to address:', result.options.address);
};

deploy();