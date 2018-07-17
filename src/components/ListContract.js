import React, { Component } from 'react';
import { getContractFromAddress } from '../utils';
class ListContract extends Component{
    state = {
        contractAddress : '',
        loading: false,
        contract: null,
        buyer: '',
        seller: ''
    }

    getContract = async() => {
        const contract = getContractFromAddress(this.state.contractAddress);
        const buyer = await contract.methods.buyer().call();
        const seller = await contract.methods.seller().call();
        this.setState({buyer, seller});
        console.log(buyer, seller);
        console.log(contract);
    }

    clear = () => {
        this.setState({contractAddress: ''});
    }

    render() {
        return (
            <section className="section">
                <div style={{ padding: '20px' }}>
                    <div className="container">
                        <div className="field">
                            <label className="label">Contract Address</label>
                            <div className="control">
                                <input onChange={event => this.setState({ contractAddress: event.target.value })} className="input" value={this.state.address} type="text" v-model="address" placeholder="Seller Address" />
                            </div>
                        </div>
                        <div className="field is-grouped">
                            <div className="control">
                                <button onClick={this.getContract} className="button is-link">Search Contract</button>
                            </div>
                            <div className="control">
                                <button type="button" onClick={this.clear} className="button is-text">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default ListContract;