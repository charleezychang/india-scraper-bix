import { Button, CardBody, CardHeader, Text, Input, VStack, Divider, Tooltip, HStack } from '@chakra-ui/react'

import React, { ChangeEvent, useEffect, useState } from 'react'
import FlashCardOption from './FlashCardOption'
import { Card } from '../interfaces'
import Image from 'next/image'
import TooltipIcon from '../assets/icons/Tooltip.svg'
import PrimaryButton from './PrimaryButton'
import CooldownOption from './CooldownOption'

interface Props {
  card: Card | undefined
}

function FlashCard({card} : Props) {
  const [chosenAnswer, setChosenAnswer] = useState<string | null>(null)
  const [answerRevealed, setAnswerRevealed] = useState<boolean>(false)
  const [cooldown, setCooldown] = useState<number | null>(null)
  const [customCooldown, setCustomCooldown] = useState<number | null>(null)
  const [extractedCard, setExtractedCard] = useState<any>(null)

  useEffect(() => {
    for (const generatedProperty in card) {
      setExtractedCard(card[generatedProperty])
    }
  }, [])
  
  useEffect(() => {
    console.log(extractedCard)
  }, [extractedCard])
  

  const handleRevealAnswer = (answer: string) => {
    if (answerRevealed) {
      return
    }
    
    setChosenAnswer(answer)
    setAnswerRevealed(true)
  }

  const handleSelectCooldown = (selectedCooldown: number) => {
    if (!answerRevealed) {
      return
    }
    setCustomCooldown(null)
    setCooldown(selectedCooldown)
  }

  const handleCustomCooldownChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!answerRevealed) {
      return
    }
    setCooldown(null)
    setCustomCooldown(parseInt(e.target.value))
  }

  return (
    <>
      <Text className='tw-mb-4' color='brand.text'>{extractedCard?.question}</Text>
      <VStack className='tw-mb-4'>
        <FlashCardOption displayText={extractedCard?.options.a} onClick={() => handleRevealAnswer('a')} selected={chosenAnswer} optionLetter='a' answer={extractedCard?.answer} answerRevealed={answerRevealed} />
        <FlashCardOption displayText={extractedCard?.options.b} onClick={() => handleRevealAnswer('b')} selected={chosenAnswer} optionLetter='b' answer={extractedCard?.answer} answerRevealed={answerRevealed} />
        <FlashCardOption displayText={extractedCard?.options.c} onClick={() => handleRevealAnswer('c')} selected={chosenAnswer} optionLetter='c' answer={extractedCard?.answer} answerRevealed={answerRevealed} />
        <FlashCardOption displayText={extractedCard?.options.d} onClick={() => handleRevealAnswer('d')} selected={chosenAnswer} optionLetter='d' answer={extractedCard?.answer} answerRevealed={answerRevealed} />
      </VStack>
      <Divider color='brand.text' className='tw-mb-2' />
      <HStack spacing={1} className='tw-mb-2'>
        <Text color='brand.text'>Cooldown</Text>
        <Tooltip label='When do you want to show this card again? You can choose among 1d, 3d, 7d, 14d, or input custom cooldown.'>
          <Image className='tw-w-4 tw-h-4' src={TooltipIcon} alt='' />
        </Tooltip>
      </HStack>
      <HStack spacing={2} className='tw-mb-4'>
        <CooldownOption displayText='1' onClick={() => { handleSelectCooldown(1) }} selected={cooldown} answerRevealed={answerRevealed} />
        <CooldownOption displayText='3' onClick={() => { handleSelectCooldown(3) }} selected={cooldown} answerRevealed={answerRevealed} />
        <CooldownOption displayText='7' onClick={() => { handleSelectCooldown(7) }} selected={cooldown} answerRevealed={answerRevealed} />
        <CooldownOption displayText='14' onClick={() => { handleSelectCooldown(14) }} selected={cooldown} answerRevealed={answerRevealed} />
        <Input disabled={!answerRevealed} borderColor={answerRevealed ? customCooldown ? 'brand.accent' : 'brand.text' : 'brand.secondary'} height='36px' padding={2} type='number' textAlign={'center'} color='brand.text' placeholder='' onChange={handleCustomCooldownChange} />
      
      </HStack>
      <Divider color='brand.text'/>
    </>

  )
}

export default FlashCard