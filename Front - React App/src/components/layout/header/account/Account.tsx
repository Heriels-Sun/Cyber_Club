import { useState } from 'react';
import { AccountsModal } from './accounts-modal';
import { Wallet } from './wallet';
import { 
  useApi, 
  useAccount, 
  useBalance, 
  useBalanceFormat 
} from '@gear-js/react-hooks';
import { CyberPoints } from '../cyberPoints';

function Account() {
  const { isApiReady } = useApi();
  const { account, accounts } = useAccount();
  const { balance } = useBalance(account?.address);
  const { getFormattedBalance } = useBalanceFormat();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formattedBalance = isApiReady && balance ? getFormattedBalance(balance) : undefined;



  const openModal = () => {
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {account ? (
        <Wallet balance={formattedBalance} address={account.address} name={account.meta.name} onClick={openModal} />
      ) : (
        <>
        </>
      )}
      {isModalOpen && <AccountsModal accounts={accounts} close={closeModal} />}
    </>
  );
}

export { Account };
