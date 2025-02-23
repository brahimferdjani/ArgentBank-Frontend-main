import Props from "prop-types";

function Transaction({ transaction, id }) {
  return (
    <>
      <section className="account" key={id}>
        <div className="account-content-wrapper">
          <h3 className="account-title">{transaction.title}</h3>
          <p className="account-amount">{transaction.amount}</p>
          <p className="account-amount-description">
            {transaction.description}
          </p>
        </div>
        <div className="cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </>
  );
}

Transaction.propTypes = {
  transaction: Props.object,
  id: Props.number,
};

export default Transaction;
