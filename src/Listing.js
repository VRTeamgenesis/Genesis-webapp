import React, { useCallback, useEffect } from "react";
import './Listing.css'
import Masonry from "react-masonry-css";
import { Stack, Flex, Heading, Highlight, Center, Box } from "@chakra-ui/react";
import { NavBar } from "./Components/Navbar";
import { useAppContext } from "./context";
import { UploadImageBoy } from "./images/UploadImageBoy";
import { subscribe, unsubscribe } from "./Utils/events";

function Listing() {
    const { list,setList } = useAppContext();
    const setImageList = useCallback(({detail})=>{
        setList(detail)
    },[setList]);
    useEffect(()=>{
        subscribe("initalImages",setImageList);
        return (()=>{
            unsubscribe("initalImages",setImageList);
        })
    },[setImageList]);
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
                <Flex  align={'center'} py={10} 
                    justify={'center'} direction='column'>
                  <Center>
                        <Heading lineHeight='tall'py='10' cursor={'pointer'} onClick={()=>{
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