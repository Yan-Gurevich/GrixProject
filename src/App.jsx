import Install from './components/Install';
import Home from './components/Home';
import Grix from './artifacts/contracts/GRIX.sol/GRIX.json';
import { ethers } from 'ethers';
import { useEffect } from 'react';
import { useState } from 'react';


function App() {
  const [contract, setContract] = useState(null);
  const [signer, setSigner] = useState(null);
  useEffect(() => {
    async function getContract() {
      const contractAddress = '0xEb1CDDFD24E000E871b698b1A9B225eB9B5877d8';
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner(); 
      const contract = new ethers.Contract(contractAddress, Grix.abi, signer);
      setContract(contract);
      setSigner(signer)
    }
    if(window.ethereum) {
      getContract();
    }
  }, []);

  if (!window.ethereum)
    return <Install />
  if (!contract) {
    return <div>Loading...</div>; // or some loading spinner
  }
  return <Home {...{contract, signer}}/>;  
}

export default App;