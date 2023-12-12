import { useState, useEffect } from 'react';
import { useAccount, useApi, useAlert } from "@gear-js/react-hooks";
import { AccountsModal } from '../../components/layout/header/account/accounts-modal/AccountsModal';
import { NewWindow1 } from './newWindow1';
import { ChargingPageAndAccess } from './chargAndAccess';

function ChargingPage() {
  document.body.style.backgroundImage = "url('fondo.jpg')";
  document.body.style.backgroundAttachment = "fixed";
  document.body.style.backgroundSize = "cover";

  const { accounts, account } = useAccount();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  let contentToRender;

  if (account) {
    contentToRender = <ChargingPageAndAccess/>
  }else {
    contentToRender = <AccountsModal accounts={accounts} close={closeModal} />;
  }
  
  return contentToRender
}

export { ChargingPage };