import Balance from './Balance';
import { useEffect, useState } from 'react';
import  {ethers}  from 'ethers';

import placeholder from '../images/question.png';

function Home({contract, signer}) {
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
          <NFTImage {...{ tokenId: i, getCount, contract, signer }} />
        </div>
      ))}
    </div>
  );
}
function NFTImage({ tokenId, getCount, contract, signer}) {
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
      console.log(signer)
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