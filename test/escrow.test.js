const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../src/compiled/Escrow.json');

let accounts, scrow;

beforeEach(async() => {
    accounts = await web3.eth.getAccounts();
    escrow = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data: bytecode,
            arguments: [accounts[0], accounts[1]]
        })
        .send({
            from: accounts[0],
            value: web3.utils.toWei('0.00000000050', 'ether'),
            gas: '3000000'
        });
});

describe('Escrow Payments Contract', () => {
    it('the contract should be deployed', async() => {
        assert(escrow.options.address);
    });

    it('the buyer and sender should be differents', async() => {
        try{
            await new web3.eth.Contract(JSON.parse(interface))
                .deploy({
                    data: bytecode,
                    arguments: [accounts[0], accounts[0]]
                })
                .send({
                    from: accounts[0],
                    value: web3.utils.toWei('1.0', 'ether'),
                    gas: '3000000'
                });
                assert(false);
        } catch(err){
            assert(err);
        }
    });

    it('the amount of wei for the contract should be equals to the one sent', async() => {
        const balance = await escrow.methods.getBalance()
            .call({
                from: accounts[0]
            });
        assert.equal(balance, 500000000)
    });

    it('nobody should be able to call claimPayment for an open contract', async() => {
        try{
            await escrow.methods.claimPayment()
                .send({
                    from: accounts[0]
                });
            assert(false);
        }catch(err){
            assert(err);
        }
    });

    it('just seller and buyer should be able to set status', async() => {
        try{
            await escrow.methods.setStatus(false)
                .send({
                    from: accounts[2]
                });
            assert(false);
        }catch(err){
            assert(err);
        }
    });

    it('seller and buyer should be able to set their status for the contract', async() => {
        await escrow.methods.setStatus(true)
            .send({
                from: accounts[0]
            });
        const accountStatusA = await escrow.methods.consensus(accounts[0])
            .call({
                from: accounts[0]
            });
        await escrow.methods.setStatus(false)
            .send({
                from: accounts[1]
            });
        const accountStatusB = await escrow.methods.consensus(accounts[1])
            .call({
                from: accounts[1]
            });
        assert(accountStatusA);
        assert(!accountStatusB);
    }); 

    it('seller and buyer should be able to set their status just once', async() => {
        await escrow.methods.setStatus(true)
            .send({
                from: accounts[0]
            });
        try{
            await escrow.methods.setStatus(true)
                .send({
                    from: accounts[0]
                });
            assert(false);
        }catch(err){
            assert(err);
        }
    });

    it('if seller and buyer agreed on the transaction, funds should be trasferred to the seller', async() => {
        await escrow.methods.setStatus(true)
            .send({
                from: accounts[0]
            });
        await escrow.methods.setStatus(true)
            .send({
                from: accounts[1]
            });
        const initialBalance = await web3.eth.getBalance(accounts[1]);
        await escrow.methods.claimPayment()
            .send({
                from: accounts[0]
            });
        const finalBalance = await web3.eth.getBalance(accounts[1]);
        assert((finalBalance - initialBalance) >= web3.utils.toWei('0.00000000050', 'ether'));
        
    });

    it('if seller and buyer do not agreed on the transaction, funds should be trasferred to the buyer', async() => {
        await escrow.methods.setStatus(false)
            .send({
                from: accounts[0]
            });
        await escrow.methods.setStatus(false)
            .send({
                from: accounts[1]
            });
        const initialBalance = await web3.eth.getBalance(accounts[0]);
        await escrow.methods.claimPayment()
            .send({
                from: accounts[1]
            });
        const finalBalance = await web3.eth.getBalance(accounts[0]);
        assert((finalBalance - initialBalance) >= web3.utils.toWei('0.00000000050', 'ether'));
        
    });

    it('if seller does not agree and buyer does on the transaction, funds should be trasferred to the seller', async () => {
        await escrow.methods.setStatus(true)
            .send({
                from: accounts[0]
            });
        await escrow.methods.setStatus(false)
            .send({
                from: accounts[1]
            });
        const initialBalance = await web3.eth.getBalance(accounts[1]);
        await escrow.methods.claimPayment()
            .send({
                from: accounts[0]
            });
        const finalBalance = await web3.eth.getBalance(accounts[1]);
        assert((finalBalance - initialBalance) >= web3.utils.toWei('0.00000000050', 'ether'));

    });

    it('if seller agrees and buyer does not on the transaction, funds should be frozen by 45 days', async () => {
        await escrow.methods.setStatus(false)
            .send({
                from: accounts[0]
            });
        await escrow.methods.setStatus(true)
            .send({
                from: accounts[1]
            });
        const initialBalanceA = await web3.eth.getBalance(accounts[0]);
        const initialBalanceB = await web3.eth.getBalance(accounts[1]);
        await escrow.methods.claimPayment()
            .send({
                from: accounts[0]
            });
        const finalBalanceA = await web3.eth.getBalance(accounts[0]);
        const finalBalanceB = await web3.eth.getBalance(accounts[1]);
        const frozenState = await escrow.methods.frozenPayment()
            .call({
                from: accounts[0]
            });
        assert(finalBalanceA < initialBalanceA);
        assert.equal(finalBalanceB, initialBalanceB);
        assert(frozenState);

    });
});