import { Box, Spinner } from '@chakra-ui/react'
import React from 'react'

interface Props {
    displayText: string
    onClick: () => any
    width?: string
    isLoading?: boolean
    disabled?: boolean
}

function PrimaryButton({ displayText, onClick, width, isLoading, disabled }: Props) {
    console.log(displayText + disabled)
    const handleClick = () => {
        onClick()
    }

    return (
        <Box
            as={disabled ? 'button' : undefined}
            display='flex'
            disabled={disabled}
            flexDirection='row'
            alignItems='center'
            height='36px'
            width={width && width}
            lineHeight='1.2'
            transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
            px='16px'
            borderRadius='4px'
            fontSize='14px'
            fontWeight='semibold'
            bg={disabled ? 'brand.primary' : 'brand.accent'}
            color={disabled ? 'brand.secondary' : 'brand.primary'}
            _hover={disabled ? { bg: '' } : { bg: '#ebedf0' }}
            _active={disabled ? {} : {
                bg: '#dddfe2',
                transform: 'scale(0.98)',
                borderColor: '#bec3c9',
            }}
            onClick={handleClick}
        >
            {isLoading ? <Spinner size='sm' /> : displayText}
        </Box>
    )
}

export default PrimaryButton