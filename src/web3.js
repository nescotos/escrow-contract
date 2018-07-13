import Web3 from 'web3';

let web3;


if (typeof window['web3'] !== 'undefined') {
    // Use Mist/MetaMask's provider
    web3 = new Web3(window['web3'].currentProvider);
} else {
    console.warn(
        'Please install Metamask plugin for Google Chrome or use Mist Browser'
    );
}

export default web3;