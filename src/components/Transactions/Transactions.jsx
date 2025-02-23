import { transactionsData } from "../../data/data";
import Transaction from "../transaction/transaction";
import "./style.scss";

function transactions() {
  return (
    <>
      {transactionsData.map((transaction) => (
        <Transaction key={transaction.id} transaction={transaction} />
      ))}
    </>
  );
}

export default transactions;
