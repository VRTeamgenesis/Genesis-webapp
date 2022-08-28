import React, { useCallback, useEffect } from "react";
import './Listing.css'
import Masonry from "react-masonry-css";
import { Stack, Flex, Heading, Highlight, Center, Box, useToast } from "@chakra-ui/react";
import { NavBar } from "./Components/Navbar";
import { useAppContext } from "./context";
import { UploadImageBoy } from "./images/UploadImageBoy";
import { subscribe, unsubscribe } from "./Utils/events";
import { firebaseApp, firebaseAuth } from "./Utils/loginUtils";
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { getDatabase, ref, child, get } from "firebase/database";
import { initFiles } from './Utils/processUtils';
import { getAuth, onAuthStateChanged } from "firebase/auth";
function Listing() {
    const history = useNavigate();
    const toast = useToast();
    const { list, setList } = useAppContext();
    const setImageList = useCallback(({ detail }) => {
        setList((prev) => {
            return [...prev, detail]
        });
    }, [setList]);
    const showToast = useCallback(({detail}) =>{
  
        toast({
            position:'top',
            title: detail.msg,
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
    },[])
    useEffect(() => {
        subscribe("initalImages", setImageList);
        subscribe("showToast",showToast)
        return (() => {
            unsubscribe("initalImages", setImageList);
            unsubscribe("showToast",showToast)
        })
    }, [setImageList,showToast]);
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {



            console.log(firebaseAuth)
            if (!user) {
                history("/signin");
            } else {
                // firebaseAuth.currentUser.getIdToken().then((idToken) => {

                // fetch("https://40.113.171.199:8443/api/data/list", {
                //     method: "POST",
                //     headers: {
                //         Accept: "application/json",
                //         "Content-Type": "application/json"
                //     },
                //     body: JSON.stringify({ idToken }),
                // }).then((resp) => {
                //     console.log(resp);
                // })


                // });
            }
        })
    
}, [firebaseAuth])
return (
    <>
        <NavBar />
        {
            list.length !== 0 &&
            <Flex
                minH={'calc(100vh - 90px)'}
                align={'center'}
                justify={'center'}
                alignItems={'flex-start'}
            >

                <Stack spacing={2} mx={'auto'} maxW={'900px'}>

                    <Masonry breakpointCols={3}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column">
                        {list.map((item, index) => (

                            <img
                                src={item.img}
                                alt={item.title}
                                loading="lazy"

                                style={{
                                    borderBottomLeftRadius: 4,
                                    borderBottomRightRadius: 4,
                                    display: 'block',
                                    width: '100%',
                                    padding: '2px'
                                }}
                            />

                        ))}
                    </Masonry>

                </Stack>
            </Flex>
        }
        {
            list.length === 0 &&
            <>
                <Flex align={'center'} py={10}
                    justify={'center'} direction='column'>
                    <Center>
                        <Heading lineHeight='tall' py='10' cursor={'pointer'} onClick={() => {
                            document.getElementById("uploadBtn").click();
                        }}>
                            <Highlight
                                query='Upload'
                                styles={{ px: '2', py: '1', rounded: 'full', bg: 'red.100' }}
                            >
                                Upload Files
                            </Highlight>
                        </Heading>
                    </Center>
                    <Box w='md' h={'md'}>

                        <UploadImageBoy />
                    </Box>
                </Flex>
            </>
        }

    </>
);
}
export { Listing }