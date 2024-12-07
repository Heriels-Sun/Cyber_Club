import { useState, useEffect } from "react";
import { useAccount } from "@gear-js/react-hooks";
import { InitialChargingPage } from './ChargingPage';
import { ChargingPage } from './chargAndAccess';
import { Logo } from './logo';

function Home() {
  document.body.style.backgroundColor = "#01031C";
  const { accounts, account } = useAccount();
  const [showLogo, setShowLogo] = useState(true);
  const [contentToRender, setContentToRender] = useState(<Logo />);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false);
      if (account) {
        setContentToRender(<ChargingPage />);
      } else {
        setContentToRender(<InitialChargingPage />);
      }
    }, 1800);

    return () => clearTimeout(timer);
  }, [account]);


  return contentToRender;
}

export { Home };