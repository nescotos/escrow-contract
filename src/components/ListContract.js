import React, { Component } from 'react';
import web3 from '../web3';
import { getContractFromAddress } from '../utils';
class ListContract extends Component{
    state = {
        contractAddress : '',
        loading: false,
        contract: null,
        buyer: '',
        seller: '',
        frozenPayment: false,
        consensusBuyer: false,
        consensusSeller: false,
        statusBuyer: false,
        statusSeller: false,
        balance: 0, 
        loaded: false,
        address : null,
        settingStatus: false,
        loadingContract: false
    }
    

    getContract = async() => {
        this.setState({loaded: false});
        if(this.state.contractAddress){
            this.setState({loadingContract: true});
            const contract = getContractFromAddress(this.state.contractAddress);
            const buyer = await contract.methods.buyer().call();
            const seller = await contract.methods.seller().call();
            const frozenPayment = await contract.methods.frozenPayment().call();
            const consensusBuyer = await contract.methods.consensus(buyer).call();
            const consensusSeller = await contract.methods.consensus(seller).call();
            const statusBuyer = await contract.methods.status(buyer).call();
            const statusSeller = await contract.methods.status(seller).call();
            let balance = await contract.methods.getBalance().call();
            balance = web3.utils.fromWei(balance, 'ether');
            this.setState({ buyer, seller, frozenPayment, consensusBuyer, consensusSeller, statusBuyer, statusSeller, balance, loaded: true, contract, loadingContract: false});
        }
    }

    componentDidMount = async() => {
        const addresses = await web3.eth.getAccounts();
        this.setState({address: addresses[0]});
    }

    clear = () => {
        this.setState({contractAddress: '', loaded: false});
    }

    setStatusForContract = async(value) => {
        this.setState({settingStatus: true});
        await this.state.contract.methods.setStatus(value)
        .send({
            from: this.state.address 
        });
        this.setState({settingStatus: false});
    }

    render() {
        return (
            <div>
                <section className="section">
                    <div style={{ padding: '20px' }}>
                        <div className="container">
                            <div className="field">
                                <label className="label">Contract Address</label>
                                <div className="control">
                                    <input onChange={event => this.setState({ contractAddress: event.target.value })} className="input" value={this.state.contractAddress} type="text" placeholder="Seller Address" />
                                </div>
                            </div>
                            <div className="field is-grouped">
                                <div className="control">
                                    <button onClick={this.getContract} className={`button is-link  ${this.state.loadingContract ? 'is-loading' : ''}`}>Search Contract</button>
                                </div>
                                <div className="control">
                                    <button type="button" onClick={this.clear} className="button is-text">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {
                    this.state.loaded && 
                    <section className="section">
                        <div className="container">
                            <div className="field">
                                <label>Buyer Address:</label>
                                <input className="input" value={this.state.buyer} type="text" disabled="true"/>
                            </div>
                            <div className="field">
                                <label>Seller Address:</label>
                                <input className="input" value={this.state.seller} type="text" disabled="true" />
                            </div>
                            <div className="field">
                                <label>Contract Balance (Ether):</label>
                                <input className="input" value={this.state.balance} type="number" disabled="true" />
                            </div>
                            <div className="field">
                                <label>Is the Contract Frozen?:&nbsp;</label>
                                <div className={`button is-small ${this.state.frozenPayment ? 'is-success' : 'is-danger'}`}></div>
                            </div>
                            <div className="columns">
                                <div className="column">
                                    <strong>Buyer Status</strong>
                                    <div className="columns">
                                        <div className="column">
                                            <strong>Status:&nbsp;</strong>
                                            <div className={`button  is-small ${this.state.statusBuyer ? 'is-success' : 'is-danger'}`}></div>
                                        </div>
                                        <div className="column">
                                            <strong>Consensus:&nbsp;</strong>
                                            <div className={`button  is-small ${this.state.consensusBuyer ? 'is-success' : 'is-danger'}`}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="column">
                                    <strong>Seller Status</strong>
                                    <div className="columns">
                                        <div className="column">
                                            <strong>Status:&nbsp;</strong>
                                            <div className={`button  is-small ${this.state.statusSeller ? 'is-success' : 'is-danger'}`}></div>
                                        </div>
                                        <div className="column">
                                            <strong>Consensus:&nbsp;</strong>
                                            <div className={`button is-small  ${this.state.consensusSeller ? 'is-success' : 'is-danger'}`}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                this.state.address === this.state.buyer && !this.state.statusBuyer &&
                                <div>
                                    <div className="field">
                                        <label className="label">Do you agree the Transaction (Vote when ready) as Buyer:&nbsp;</label>
                                        <button type="button" onClick={() => { this.setStatusForContract(true) }} className={`button is-success  ${this.state.settingStatus ? 'is-loading' : ''}`}>Accept</button>
                                        <button type="button" onClick={() => { this.setStatusForContract(false) }} className={`button is-danger  ${this.state.settingStatus ? 'is-loading' : ''}`}>Decline</button>
                                    </div>
                                </div>
                            }
                            {
                                this.state.address === this.state.seller && !this.state.statusSeller &&
                                <div>
                                    <div className="field">
                                        <label className="label">Do you agree the Transaction (Vote when ready)  as Seller:&nbsp;</label>
                                        <button type="button" onClick={() => { this.setStatusForContract(true) }} className={`button is-success  ${this.state.settingStatus ? 'is-loading' : ''}`}>Accept</button>
                                        <button type="button" onClick={() => { this.setStatusForContract(false) }} className={`button is-danger  ${this.state.settingStatus ? 'is-loading' : ''}`}>Decline</button>
                                    </div>
                                </div>
                            }
                            {
                                ((this.state.address === this.state.seller && this.state.statusSeller) || (this.state.address === this.state.buyer && this.state.statusBuyer)) && 
                                <div>
                                    <h1><strong>You already voted in this transaction</strong></h1>
                                </div>
                            }
                        </div>
                    </section>
                }
            </div>
        )
    }
}

export default ListContract;