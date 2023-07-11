import { Box, Card, HStack, Spinner, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import useFirebaseAuth from '../firebase/useFirebaseAuth'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
} from '@chakra-ui/react'

function Profile() {
    const { user, loading } = useFirebaseAuth()
    console.log(user)
    console.log(user?.photoURL)
    console.log(user?.displayName)


    return (
        <Card className='tw-bg-[#242424] tw-px-4 tw-pt-4 tw-pb-6 tw-rounded-xl'>
            {loading && <Spinner size='lg' color='brand.primary' />}
            {!loading &&
                <Menu>
                    <MenuButton>
                        <Avatar src={user?.photoURL} name={user?.displayName} />
                    </MenuButton>
                    <MenuList bgColor='brand.secondary' borderColor='brand.text' color='brand.text'>
                        <MenuItem _focus={ { bg: "brand.primary" } } onClick={() => alert('asd')}>Statistics</MenuItem>
                        <MenuItem _focus={ { bg: "brand.primary" } }>Add Card</MenuItem>
                        <MenuItem _focus={ { bg: "brand.primary" } }>Import</MenuItem>
                        <MenuItem _focus={ { bg: "brand.primary" } }>Logout</MenuItem>
                    </MenuList>
                </Menu>
            }
        </Card>
    )
}

export default Profile