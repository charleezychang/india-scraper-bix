import { Box } from '@chakra-ui/react'
import React from 'react'

interface Props {
    displayText: string
    onClick: () => any
    selected: number | null
    answerRevealed: boolean
}

function CooldownOption({ displayText, onClick, selected, answerRevealed }: Props) {

    const handleClick = () => {
        onClick()
    }

    return (
        <Box
            as={answerRevealed ? 'button' : undefined}
            display='flex'
            alignItems='center'
            height='36px'
            transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
            px='16px'
            borderRadius='4px'
            fontSize='14px'
            fontWeight='semibold'
            bg={answerRevealed ? selected == parseInt(displayText) ? 'brand.accent' : 'brand.text' : 'brand.secondary'}
            color='brand.primary'
            onClick={handleClick}
        >
            {displayText}d
        </Box>
    )
}

export default CooldownOption