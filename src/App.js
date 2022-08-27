import React, { useEffect, useState } from 'react';
import {
  ChakraProvider,
} from '@chakra-ui/react';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import { SignIn } from './SignIn';
import { SignupCard } from './SignUp';
import { AccountSetupMethod } from './AccountSetup';
import { Listing } from './Listing';
import { AppContext } from './context';
import { IMAGE_LIST, MYWEB3_lIST } from './MockupData/mockupInfo';




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
