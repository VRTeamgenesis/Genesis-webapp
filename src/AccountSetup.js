
import React, { useState } from "react";

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Stack,
    Text,
    Heading,
    Input,
    useColorModeValue,
    RadioGroup, Radio, Button, Divider, HStack
} from '@chakra-ui/react';



function AccountSetupMethod() {
    const [value, setValue] = useState('1')
    return (

        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={12} mx={'auto'} minW={'lg'} py={12} px={6} >
              
                    <Text align={'center'}><Heading fontSize={'4xl'}>Account Setup</Heading></Text>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        spacing={4}
                        p={8}>
                        <FormLabel>Encryption Type</FormLabel>
                        <Stack spacing={4} justify='space-around'>
                            <RadioGroup onChange={setValue} value={value}>
                                <Stack direction='column'>
                                    <Radio value='1'>Intel SGX Encryption Method</Radio>
                                    <Radio value='2'>Use Pass Phrase</Radio>
                                </Stack>
                            </RadioGroup>
                            {
                                value === '2' &&
                                <Input placeholder="Enter Pass phrase"></Input>
                            }
                        </Stack>
                        <br />
                        <Stack spacing={4}>
                            <FormControl id="web3" isRequired>
                                <FormLabel>Web3.storage token</FormLabel>
                                <Input type="input" />
                            </FormControl>
                            <FormControl id="nft">
                                <FormLabel>NFT.Storage token</FormLabel>
                                <Input type="input" />
                            </FormControl>
                        </Stack>
                        <br />
                        <Box>
                            <Button bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>Proceed</Button>
                        </Box>
                    </Box>
                
            </Stack>

        </Flex>

    );

}

export { AccountSetupMethod };
