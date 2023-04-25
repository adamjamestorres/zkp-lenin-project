import { ConnectWallet } from '@components/ConnectWallet';

function HomePage() {
  return (
    <div>
      <div className="mx-auto  w-5/6 lg:max-w-7xl pt-6 flex ">
        <div className="mx-10 justify-center align-middle">
          <span className="mx-2">Lenin.</span>
        </div>
        <ConnectWallet />
      </div>
    </div>
  );
}

export default HomePage;
