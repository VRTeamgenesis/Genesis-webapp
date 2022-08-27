import { Box,  Input, InputGroup, InputLeftElement, Button } from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons';

function Search(){
    return (        <Box maxW={'700px'} w={'lg'} >
    <InputGroup>
        <InputLeftElement
            pointerEvents='none'
            children={<SearchIcon color='gray.300' />}
        />
        <Input type='text' placeholder='Search photos, Files' />
        <Button>Search</Button>
    </InputGroup>
    
</Box>)
}
export {Search}