import { useAccount } from "@gear-js/react-hooks";
import { InitialChargingPage } from './ChargingPage';
import { ChargingPage } from './chargAndAccess';

function Home() {
  document.body.style.backgroundColor = "#01031C";
  const { accounts, account } = useAccount();

  let contentToRender;

  if (account) {
    contentToRender = <ChargingPage/>
  }else {
    contentToRender = <InitialChargingPage />;
  }

  return contentToRender;
}

export { Home };