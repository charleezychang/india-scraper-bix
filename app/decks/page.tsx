"use client";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Text,
  Input,
  VStack,
  CardFooter,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import PrimaryButton from "@/src/components/PrimaryButton";
import Profile from "@/src/components/Profile";
import useFirebaseDatabase from "@/src/firebase/useFirebaseDatabase";
import FlashCard from "@/src/components/FlashCard";
import dayjs from "dayjs";
import { Card as CardType } from "@/src/interfaces";
import useFirebaseAuth from "@/src/firebase/useFirebaseAuth";
import { shuffle } from "@/src/hooks/utils";

function Page() {
  const { user, loading, logOut } = useFirebaseAuth();
  const { initializeDeck, readDeck } = useFirebaseDatabase();
  const [deck, setDeck] = useState<CardType[]>([]);
  const [shuffledDeck, setShuffledDeck] = useState<CardType[]>([]);
  const [cardShown, setCardShown] = useState<CardType>()

  useEffect(() => {
    // initializeDeck();
  }, []);

  useEffect(() => {
    initializeDeck();

    setDeck((prevState) => readDeck(dayjs()));
    console.log("on deck");
  }, [user]);

  useEffect(() => {
    showRandomCard()
    console.log(deck);
  }, [deck]);

useEffect(() => {
    console.log(cardShown)
}, [cardShown])


  const showRandomCard = () => {
    const index = Math.floor(Math.random() * deck.length);
    const item = deck[index];
    const splicedDeck = deck.splice(index, 1);
    // const shuffledDeck = {'asdasd' : {
    //     topic: 'sss',
    //     question: 'jello',
    //     options: {
    //       a: 'aaaaaaaaaa',
    //       b: 'bbbbbbbbb',
    //       c: 'ccccccccccccc',
    //       d: 'dddddddddddd',
    //     },
    //     answer: 'a',
    //     timesCorrect: 0,
    //     timesWrong: 0,
    //   }}
    console.log(item)
    setCardShown(item)
  };



  return (
    <div className="tw-flex tw-items-center tw-justify-center tw-h-screen">
      <VStack>
        <div className="tw-self-start">
          <Profile />
        </div>
        <Card className="tw-bg-[#242424] tw-w-[350px] tw-rounded-b-xl tw-rounded-tr-xl tw-p-4 tw-items-center tw--translate-y-8">
          {/* <CardHeader display="flex" alignItems="center" flexDirection='column'>
                        <Text className='tw-text-white tw-text-2xl'>Deck</Text>
                    </CardHeader> */}
          <CardBody>
            <FlashCard card={cardShown}/>
            </CardBody>
          <CardFooter>
            <PrimaryButton displayText="Next →" onClick={() => {}} />
          </CardFooter>
        </Card>
      </VStack>
    </div>
  );
}

export default Page;
