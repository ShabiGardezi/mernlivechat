import { useContext } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,IconButton ,Text,useDisclosure
} from '@chakra-ui/react';
import {SearchIcon}  from "@chakra-ui/icons"
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import  SUModal  from './SUmodal';
import {userContext} from "../context/userState"

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user ,_setUser} = useContext(userContext);



const handleLogout=()=>{
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  _setUser()
}





  return (
    <>
    <SUModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} borderRadius="8px">
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>
            <Flex align={"center"}>
            <IconButton onClick={onOpen}
  colorScheme='messenger'
  aria-label='Search database'
  borderRadius={"8px"}
  icon={<SearchIcon />}/>
  <Text ml="5px" fontSize={"1.1rem"} fontWeight="semibold">Search Users</Text>
  </Flex>
  </Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={user.profileImage}
                    name={user.name}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={user.profileImage}
                      name={user.name}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{user.name}</p>
                  </Center>
                  <br />
                
                 <Box  textAlign={"center"}>
                  <Button  w="90%" onClick={handleLogout}  color={"white"} bgColor={"red.500"} _hover={{bgColor:"red.600" }}>Logout</Button>
                  </Box>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}