import Balance from './Balance';
import { useEffect, useState } from 'react';

import  {ethers}  from 'ethers';
import Grix from '../artifacts/contracts/GRIX.sol/GRIX.json';

import placeholder from '../images/question.png';

const contractAddress = '0xb6b635378396b14De24554aFaAfC0143D0B02b0B';

const provider = new ethers.BrowserProvider(window.ethereum);

const signer = await provider.getSigner();

const contract = new ethers.Contract(contractAddress, Grix.abi, signer);

function Home() {
  const [totalMinted, setTotalMinted] = useState(0);

  useEffect(() => {
    getCount();
  }, []);


  const getCount = async () => {
    const count = await contract.count();
    setTotalMinted(parseInt(count));
  };

  return (
    <div>
      <Balance />

      {Array(totalMinted + 1)
      .fill(0)
      .map((_, i) => (
        <div key={i}>
          <NFTImage tokenId={i} getCount={getCount} />
          </div>
      ))}
    </div>
  );
}
function NFTImage({ tokenId, getCount }) {
    const imgCID = 'QmaRQ7pARV2wMkfRfsLasqMHpkPXCq1aUz87uo4PUVcHzs';
    const jsonCID = 'QmVaR4X8EPGqXqP2AWFevYMWUVbNDURk1KFTX39eXektSe';


    const metadataURI = `${jsonCID}/img${tokenId}.json`;
    const imageURI = `https://gateway.pinata.cloud/ipfs/${imgCID}/img${tokenId}.jpg`;
  
    const [isMinted, setIsMinted] = useState(false);
    useEffect(() => {
      getMintedStatus();
    }, [isMinted]);
  
    const getMintedStatus = async () => {
      const result = await contract.isContentOwned(metadataURI);
      setIsMinted(result);
    };
  
    const mintToken = async () => {
      const connection = contract.connect(signer);
      const addr = connection.target;
      const result = await contract.payToMint(addr, metadataURI, {
        value: ethers.parseEther('0.01'),
      });
  
      await result.wait();
      getMintedStatus();
      getCount();
    };
  
    async function getURI() {
      const uri = await contract.tokenURI(tokenId);
      alert(uri);
    }
    return (
      <div>
        <img src={isMinted ? imageURI : placeholder}></img>
          <h5>ID #{tokenId}</h5>
          {!isMinted ? (
            <button onClick={mintToken}>
              Mint
            </button>
          ) : (
            <button onClick={getURI}>
              Taken! Show URI
            </button>
          )}
      </div>
    );
  }
  
  export default Home;