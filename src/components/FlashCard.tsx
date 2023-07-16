import { Button, CardBody, CardHeader, Text, Input, VStack, Divider, Tooltip, HStack, Flex, Box } from '@chakra-ui/react'

import React, { ChangeEvent, useEffect, useState } from 'react'
import FlashCardOption from './FlashCardOption'
import { Card } from '../interfaces'
import Image from 'next/image'
import TooltipIcon from '../assets/icons/Tooltip.svg'
import Correct from '../assets/icons/Correct.svg'
import Wrong from '../assets/icons/Wrong.svg'
import Percent from '../assets/icons/Percent.svg'
import PrimaryButton from './PrimaryButton'
import CooldownOption from './CooldownOption'
import useFirebaseDatabase from '../firebase/useFirebaseDatabase'

interface Props {
  card: Card | undefined
  showRandomCard: () => void
}

function FlashCard({ card, showRandomCard }: Props) {
  const { addCard, removeCard } = useFirebaseDatabase()
  const [chosenAnswer, setChosenAnswer] = useState<string | null>(null)
  const [answerRevealed, setAnswerRevealed] = useState<boolean>(false)
  const [cooldown, setCooldown] = useState<number | null>(null)
  const [customCooldown, setCustomCooldown] = useState<number | string>('')
  const [extractedCard, setExtractedCard] = useState<any>(null)
  const [percentage, setPercentage] = useState<number | string>('--')

  useEffect(() => {
    setAnswerRevealed(false)
    setChosenAnswer(null)
    setCustomCooldown('')
    for (const generatedProperty in card) {
      setExtractedCard(card[generatedProperty])
    }
  }, [card])

  useEffect(() => {
    showPercentage()
  }, [card, answerRevealed])
  

  const showNumberRight = () => {
    if (answerRevealed && chosenAnswer == extractedCard?.answer) {
      return extractedCard?.timesCorrect + 1
    }
    else {
      return extractedCard?.timesCorrect
    }
  }

  const showNumberWrong = () => {
    if (answerRevealed && chosenAnswer != extractedCard?.answer) {
      return extractedCard?.timesWrong + 1
    }
    else {
      return extractedCard?.timesWrong
    }
  }

  const showPercentage = () => {
    if (!answerRevealed && extractedCard?.timesCorrect == 0 && extractedCard?.timesWrong == 0) {
      setPercentage('--')
    }
    else if (answerRevealed && chosenAnswer == extractedCard?.answer) {
      setPercentage((((extractedCard?.timesCorrect + 1) / (extractedCard?.timesCorrect + extractedCard?.timesWrong + 1))*100).toFixed(1))
    }
    else if (answerRevealed && chosenAnswer != extractedCard?.answer) {
      setPercentage(((extractedCard?.timesCorrect ) / (extractedCard?.timesCorrect + extractedCard?.timesWrong + 1)*100).toFixed(1))
    }
  }

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
    setCustomCooldown('')
    setCooldown(selectedCooldown)
  }

  const handleCustomCooldownChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!answerRevealed) {
      return
    }
    setCooldown(null)
    setCustomCooldown(parseInt(e.target.value))
  }

  const handleNextCard = () => {
    const newCooldown = customCooldown != '' ? customCooldown as number : cooldown as number
    // add this card to chosen cooldown date 
    addCard({
      ...extractedCard,
      // with updated timesCorrect or timesWrong
      timesCorrect: chosenAnswer == extractedCard.answer ? extractedCard.timesCorrect + 1 : extractedCard.timesCorrect,
      timesWrong: chosenAnswer != extractedCard.answer ? extractedCard.timesWrong + 1 : extractedCard.timesWrong,
    }, newCooldown)
    // delete this current card from todays deck
    for (const generatedProperty in card) {
      removeCard(generatedProperty)
    }
    showRandomCard()
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
        <Input value={customCooldown} disabled={!answerRevealed} borderColor={answerRevealed ? customCooldown ? 'brand.accent' : 'brand.text' : 'brand.secondary'} height='36px' padding={2} type='number' textAlign={'center'} color='brand.text' placeholder='' onChange={handleCustomCooldownChange} />

      </HStack>
      <Divider color='brand.text' className='tw-mb-4' />
      <Flex flexDirection='row' justifyContent='space-between'>
        <HStack>
          <Box
            display='flex'
            flexDirection='row'
            alignItems='center'
            gap='2px'
            marginRight='4px'
            height='36px'
            color='brand.text'
            borderRadius='4px'
            fontSize='16px'
            fontWeight='semibold'
            width='50px'
          >
            <Image src={Correct} alt='check-icon' />
            {showNumberRight()}
          </Box>
          <Box
            display='flex'
            flexDirection='row'
            alignItems='center'
            gap='2px'
            marginRight='4px'
            height='36px'
            color='brand.text'
            borderRadius='4px'
            fontSize='16px'
            fontWeight='semibold'
            width='50px'

          >
            <Image src={Wrong} alt='x-icon' />
            {showNumberWrong()}
          </Box>
          <Box
            display='flex'
            flexDirection='row'
            alignItems='center'
            gap='2px'
            marginRight='4px'
            height='36px'
            color='brand.text'
            borderRadius='4px'
            fontSize='16px'
            fontWeight='semibold'
            width='50px'
          >
            <Image src={Percent} alt='percent-icon' />
            {percentage}
          </Box>
        </HStack>
        <PrimaryButton displayText="Next" onClick={handleNextCard} disabled={!answerRevealed || (!cooldown && customCooldown == '')}/>
      </Flex>
    </>

  )
}

export default FlashCard