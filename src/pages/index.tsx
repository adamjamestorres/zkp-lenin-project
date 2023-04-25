import {ConnectWallet} from "@components/ConnectWallet";
import Image from "next/image";
import * as ethlogo from '../public/eth.png';


function HomePage (){

  return (
    <div>
      <div className="mx-auto  w-5/6 lg:max-w-7xl pt-6 flex ">
        <div className="mx-10 justify-center align-middle">
        <Image src={ethlogo} width={20} height={30}/>
        <span className="mx-2">Lenin.</span>
        </div>
    <ConnectWallet/>
      </div>
    </div>
  );
}

export default HomePage;
