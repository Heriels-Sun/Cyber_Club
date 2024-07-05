import { Account } from '@gear-js/react-hooks';
import { AccountButton } from '../account-button';
import styles from './Wallet.module.scss';

type Props = {
  // balance: Account['balance'];
  balance: {
    value: string;
    unit: string;
  } | undefined;
  address: string;
  name: string | undefined;
  onClick: () => void;
};

function Wallet({ balance, address, name, onClick }: Props) {
  return (
    <div className={styles.wallet}>
      <p className={styles.balance} style={{ color: "purple", fontSize: "18px"}}>
        {balance?.value} <span className={styles.currency} style={{ color: "gray"}}>{balance?.unit}</span>
      </p>
      <AccountButton address={address} name={name} onClick={onClick} />
    </div>
  );
}

export { Wallet };