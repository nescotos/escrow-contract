import React from 'react';

const HomePage = () => {
    return(
        <div>
            <section className="hero is-dark is-medium">
                <div className="hero-body has-text-centered">
                    <div className="container">
                        <h1 className="title">
                            What is this Application about?
                </h1>
                        <h2 className="subtitle">
                            This application allows you to use a decentralized architecture to allow payments for Escrow Contracts without a third party using Ethereum Network and Ether as money.
                </h2>
                        <h2 className="subtitle">
                            You and the other part just need an Ethereum Account to start using this application, the application will generate an address to be able to track, use and close the contract.
                </h2>
                    </div>
                </div>
            </section>
            <section className="hero is-info is-medium">
                <div className="hero-body has-text-centered">
                    <div className="container">
                        <h1 className="title">
                            Escrow Payments
                </h1>
                        <h2 className="subtitle">
                            An escrow is a contractual arrangement in which a third party receives and disburses money or documents for the primary transacting parties, with the disbursement dependent on conditions agreed to by the transacting parties, or an account established by a broker for holding funds on behalf of the broker's principal or some other person until the consummation or termination of a transaction; or, a trust account held in the borrower's name to pay obligations such as property taxes and insurance premiums. The word derives from the Old French word escroue, meaning a scrap of paper or a scroll of parchment; this indicated the deed that a third party held until a transaction was completed.
                </h2>
                    </div>
                </div>
            </section>
            <section className="hero is-dark is-medium">
                <div className="hero-body has-text-centered">
                    <div className="container">
                        <h1 className="title">
                            What is Ethereum?
                </h1>
                        <h2 className="subtitle">
                            Ethereum is a decentralized platform that runs smart contracts: applications that run exactly as programmed without any possibility of downtime, censorship, fraud or third-party interference.
                </h2>
                        <h2 className="subtitle">
                            These apps run on a custom built blockchain, an enormously powerful shared global infrastructure that can move value around and represent the ownership of property.
                </h2>
                        <h2 className="subtitle">
                            This enables developers to create markets, store registries of debts or promises, move funds in accordance with instructions given long in the past (like a will or a futures contract) and many other things that have not been invented yet, all without a middleman or counterparty risk.
                </h2>
                        <h2 className="subtitle">
                            The project was bootstrapped via an ether presale in August 2014 by fans all around the world. It is developed by the Ethereum Foundation, a Swiss non-profit, with contributions from great minds across the globe.
                </h2>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HomePage;