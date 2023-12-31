import { Card, SkeletonCircle } from '@chakra-ui/react'
import React from 'react'
import { Avatar } from '@chakra-ui/react'
import useFirebaseAuth from '../firebase/useFirebaseAuth'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem
} from '@chakra-ui/react'
import Image from 'next/image'
import Graph from '@/src/assets/icons/Graph.svg'
import Add from '@/src/assets/icons/Add.svg'
import Import from '@/src/assets/icons/Import.svg'
import Logout from '@/src/assets/icons/Logout.svg'
import { useRouter } from "next/navigation";

interface Props {
    handleImportModalOpen: () => void
}

function Profile({ handleImportModalOpen }: Props) {
    const { user, loading, logOut } = useFirebaseAuth()
    const router = useRouter();

    const handleStatisticsClick = () => {
        router.push("/statistics");
    }

    return (
        <Card className='tw-bg-[#242424] tw-px-4 tw-pt-4 tw-pb-6 tw-rounded-xl'>
            {loading && <SkeletonCircle size='12' />}
            {!loading &&
                <Menu>
                    {/* <ImportModal isOpen={isOpen} onClose={handleImportModalClose} /> */}
                    <MenuButton>
                        <Avatar src={user?.photoURL} name={user?.displayName} />
                    </MenuButton>
                    <MenuList bgColor='brand.secondary' borderColor='brand.text' color='brand.text'>
                        <MenuItem
                            _focus={{ bg: "brand.primary" }}
                            icon={<Image src={Graph} alt='graph-icon' />}
                            onClick={handleStatisticsClick}
                        >
                            Statistics
                        </MenuItem>
                        <MenuItem
                            _focus={{ bg: "brand.primary" }}
                            icon={<Image src={Add} alt='graph-icon' />}
                        >
                            Add Card
                        </MenuItem>
                        <MenuItem
                            _focus={{ bg: "brand.primary" }}
                            icon={<Image src={Import} alt='graph-icon' />}
                            onClick={handleImportModalOpen}
                        >
                            Import
                        </MenuItem>
                        <MenuItem
                            _focus={{ bg: "brand.error" }}
                            icon={<Image src={Logout} alt='graph-icon' />}
                            onClick={logOut}
                        >
                            Logout
                        </MenuItem>
                    </MenuList>
                </Menu>
            }
        </Card>
    )
}

export default Profile