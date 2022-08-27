import React,{useState} from 'react';
import {
  ChakraProvider,
} from '@chakra-ui/react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { SignIn } from './SignIn';
import { SignupCard } from './SignUp';
import { AccountSetupMethod } from './AccountSetup';
import { Listing } from './Listing';
import { AppContext } from './context';
import { IMAGE_LIST, MYWEB3_lIST } from './MockupData/mockupInfo';
import CryptoJS from "crypto-js";
import { fetchWeb3StorageClient } from './Utils/processUtils';
import { publish } from "./Utils/events";
import { FILE_ENCRYPTKEY } from './Utils/CONSTANTS';


async function initFiles() {
  const promisesList = [];
  for (let loop = 0; loop < MYWEB3_lIST.length; loop++) {
      const web3Client = await fetchWeb3StorageClient();
      const res = await web3Client.get(MYWEB3_lIST[loop]); // Web3Response
      const files = await res.files(); // Web3File[]
      promisesList.push(new Promise((resolve) => {
          const blob = new Blob([files[0]], { type: 'text/plain' });
          var reader = new FileReader();
          reader.onload = function () {
              resolve({ img: CryptoJS.AES.decrypt(this.result, FILE_ENCRYPTKEY).toString(CryptoJS.enc.Utf8) });
          }
          reader.readAsText(blob);
      }
      ))
  }
  Promise.all(promisesList).then((list) => {
    publish("initalImages", list)
  })
}
initFiles();

function App() {
  const [list,setList] = useState(IMAGE_LIST);

  const context = {
    list, setList
  }



  return (
    <ChakraProvider >
      <AppContext.Provider value={context}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn />}></Route>
            <Route path='/signup' element={<SignupCard />}></Route>
            <Route path='/signin' element={<SignIn />}></Route>
            <Route path='/encryptionMethod' element={<AccountSetupMethod />}></Route>
            <Route path='/listing' element={<Listing />}></Route>
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </ChakraProvider>
  );
}

export default App;
