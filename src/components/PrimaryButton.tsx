import { Box } from '@chakra-ui/react'
import React from 'react'

interface Props {
    displayText: string
    onClick: () => any
    width?: string
}

function PrimaryButton({ displayText, onClick, width }: Props) {

    const handleClick = () => {
        onClick()
    }

    return (
        <Box
            as='button'
            height='36px'
            width={width && width}
            lineHeight='1.2'
            transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
            px='16px'
            borderRadius='4px'
            fontSize='14px'
            fontWeight='semibold'
            bg='brand.accent'
            color='brand.primary'
            _hover={{ bg: '#ebedf0' }}
            _active={{
                bg: '#dddfe2',
                transform: 'scale(0.98)',
                borderColor: '#bec3c9',
            }}
            _focus={{
                boxShadow:
                    '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
            }}
            onClick={handleClick}
        >
            {displayText}
        </Box>
    )
}

export default PrimaryButton