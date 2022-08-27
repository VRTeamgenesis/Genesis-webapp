import React, { useState } from 'react';
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
import { publish } from "./Utils/events";
import { FILE_ENCRYPTKEY, WEB3_TOKEN } from './Utils/CONSTANTS';

import { Web3Storage } from 'web3.storage'
const client = new Web3Storage({ token: WEB3_TOKEN });
async function initFiles() {
  const promisesList = [];
  for (let loop = 0; loop < MYWEB3_lIST.length; loop++) {
    try {
      promisesList.push(new Promise((resolve) => {
        client.get(MYWEB3_lIST[loop]).then((res) => {
          res.files().then((files) => {


            const blob = new Blob([files[0]], { type: 'text/plain' });

            var reader = new FileReader();
            reader.onload = function () {
              // console.log( CryptoJS.AES.decrypt(this.result, FILE_ENCRYPTKEY).toString(CryptoJS.enc.Utf8))
              // resolve({ img: CryptoJS.AES.decrypt(this.result, FILE_ENCRYPTKEY).toString(CryptoJS.enc.Utf8) });
              publish("initalImages", { img: CryptoJS.AES.decrypt(this.result, FILE_ENCRYPTKEY).toString(CryptoJS.enc.Utf8), pos:loop })
            }
            reader.readAsText(blob);
          })
        })

      })
      
      )
    } catch (e) {
      console.log(e)
    }
   
  }
  
  // Promise.all(promisesList).then((list) => {
  //   console.log(list)
  //   publish("initalImages", list)
  // })
}
initFiles();

function App() {
  const [list, setList] = useState(IMAGE_LIST);

  const context = {
    list, setList
  }



  return (
    <ChakraProvider >
      <AppContext.Provider value={context}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Listing />}></Route>
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
