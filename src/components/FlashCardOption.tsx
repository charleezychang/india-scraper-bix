import { Box, Spinner, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

interface Props {
    displayText: string
    onClick: () => any
    width?: string
    selected: string | null
    optionLetter: string
    answerRevealed: boolean
    answer: string
}

function FlashCardOption({ displayText, onClick, selected, optionLetter, answerRevealed, answer }: Props) {

    const handleClick = () => {
        onClick()
    }

    return (
        <Box
            as={!answerRevealed ? 'button' : undefined}
            position='relative'
            display="flex"
            minHeight='36px'
            textAlign='left'
            width='100%'
            transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
            paddingRight='16px'
            borderRadius='8px'
            fontSize='14px'
            fontWeight='semibold'
            bg={(answerRevealed && optionLetter == answer) ? 'brand.accent' : ((optionLetter == selected) && (selected != answer)) ? 'brand.error' : 'brand.text'}
            color={(answerRevealed && optionLetter == answer) ? 'brand.primary' : ((optionLetter == selected) && (selected != answer)) ? 'brand.text' : 'brand.primary'}
            _hover={!answerRevealed ? { bg: 'brand.primary', color: 'brand.text' } : undefined}
            justifyContent="start"
            alignItems='stretch'
            onClick={handleClick}
        >
            <Text
                bgColor='brand.primary'
                minWidth='30px'
                color='brand.text'
                fontSize='16px'
                display="flex"
                alignItems='center'
                justifyContent="center"
                borderLeftRadius='6px'
                marginRight='8px'
                className='tw-h-[inherit]'
            >
                {optionLetter}.
            </Text>
            <Box alignSelf='center' paddingY='8px'>
                {displayText}
            </Box>
        </Box>
    )
}

export default FlashCardOption