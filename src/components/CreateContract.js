import React, { Component } from 'react';
import web3 from '../web3';
import contract from '../contract';

class CreateContract extends Component {
    state = {
        address: '',
        ether: 0.0005,
        loading: false,
        message: 'The transaction might take a while!!! Hold on'
    }

    clear = () => {
        this.setState({
            address : '',
            ether: 0.0005,
            message: 'The transaction might take a while!!! Hold on'
        });
    }

    createContract = async () => {
        this.setState({loading: true});
        const accounts = await web3.eth.getAccounts();
        if(accounts.length > 0){
            const result = await contract.methods.createEscrowContract(this.state.address)
                .send({
                    from: accounts[0],
                    value: web3.utils.toWei(this.state.ether, 'ether')
                });
            this.setState({
                message: `Succesfully deployed to address: ${result.events.ContractCreated.returnValues.contractAddress}`
            })
        } else {
            alert('You do not have any account, please use Metamask');
        }
        this.setState({loading: false});
    }

    render(){
        return(
            <section className="section">
                <div style={{padding: '20px'}}>
                    <div className="container">
                        <div className="field">
                            <label className="label">Seller Address</label>
                            <div className="control">
                                <input onChange={event => this.setState({address: event.target.value})} className="input" value={this.state.address} type="text" v-model="address" placeholder="Seller Address"/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Amount of Ether</label>
                            <div className="control">
                                <input onChange={event => this.setState({ ether: event.target.value })} className="input" value={this.state.ether} min="0.0005" max="25" step="0.0005" type="number" placeholder="Amount of Ether"/>
                            </div>
                        </div>
                        <div className="field is-grouped">
                            <div className="control">
                                <button onClick={this.createContract} className={`button is-link ${this.state.loading ?'is-loading': ''}`}>Submit</button>
                            </div>
                            <div className="control">
                                <button type="button" onClick={this.clear} className="button is-text">Cancel</button>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">{this.state.message}</label>
                        </div>
                    </div>
                </div>
            </section> 
        )
    }
}

export default CreateContract;