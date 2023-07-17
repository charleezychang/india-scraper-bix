import { Box, Divider, Flex, Text } from '@chakra-ui/react'
import NoCardsImage from '../assets/images/NoCards.png'
import Import from '../assets/icons/Import.svg'
import Add from '../assets/icons/Add.svg'
import Image from 'next/image'

interface Props {
    handleImportModalOpen: () => void
}

function NoCards({ handleImportModalOpen }: Props) {

    return (
        <Box height='100%'>
            <Flex direction='column' justifyContent='center' alignItems='center' className=''>
                <Image className='tw-scale-50 tw--translate-y-4' src={NoCardsImage} alt='box-icon' />
                <Text color='brand.text' fontWeight='semibold' fontSize='20px' className='tw--translate-y-8'>Looks like you&apos;re out of cards!</Text>
            </Flex>
            <Divider className='tw-mb-8' />
            <Flex gap='8px'>
                <Box
                    display='flex'
                    flexGrow={1}
                    flexBasis='0'
                    flexDirection='column'
                    alignItems='center'
                    as='button'
                    color='brand.primary'
                    borderColor='brand.primary'
                    borderWidth='2px'
                    borderRadius='8px'
                    borderStyle='dashed'
                    paddingY='30px'
                    onClick={handleImportModalOpen}
                >
                    <Image src={Import} alt='import-icon' />
                    Import
                </Box>
                <Box
                    display='flex'
                    flexGrow={1}
                    flexBasis='0'
                    flexDirection='column'
                    alignItems='center'
                    as='button'
                    color='brand.primary'
                    borderColor='brand.primary'
                    borderWidth='2px'
                    borderRadius='8px'
                    borderStyle='dashed'
                    paddingY='30px'
                >
                    <Image src={Add} alt='add-icon' />
                    Add
                </Box>
            </Flex>
        </Box>
    )
}

export default NoCards