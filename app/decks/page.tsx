"use client";

import {
  Card,
  CardBody,
  Spinner,
  Text,
  VStack
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Profile from "@/src/components/Profile";
import useFirebaseDatabase from "@/src/firebase/useFirebaseDatabase";
import FlashCard from "@/src/components/FlashCard";
import dayjs from "dayjs";
import { Card as CardType } from "@/src/interfaces";
import useFirebaseAuth from "@/src/firebase/useFirebaseAuth";
import FlashCardSkeleton from "@/src/components/FlashCardSkeleton";

function Page() {
  const { user } = useFirebaseAuth();
  const { initializeDeck, readDeck } = useFirebaseDatabase();
  const [deck, setDeck] = useState<CardType[]>([]);
  const [cardShown, setCardShown] = useState<CardType>()
  const [isInitializing, setIsInitializing] = useState<boolean>(false)
  const [shownInitialCard, setShowInitialCard] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsInitializing(true)
        await initializeDeck();
        const res = await readDeck(dayjs());
        setDeck(res as CardType[]);
        setIsInitializing(false)

      } catch (error) {
        setIsInitializing(false)
        console.error(error);
      }
    };

    fetchData()
  }, [user]);

  useEffect(() => {
    if (!shownInitialCard && deck.length > 0) {
      showRandomCard();
      setShowInitialCard(true)
    }
  }, [deck]);

  useEffect(() => {
    console.log('deckd');
    console.log(deck)
  }, [deck])

  const showRandomCard = () => {
    if (deck.length == 0) {
      return
    }
    const index = Math.floor(Math.random() * deck.length);
    const item = deck && deck[index];
    const updatedDeck = [...deck];
    updatedDeck.splice(index, 1);

    // Update the deck state with the updated array
    setDeck(updatedDeck);
    setCardShown(item)
  };


  return (
    <div className="tw-flex tw-items-center tw-justify-center tw-h-screen">
      <VStack>
        <div className="tw-self-start">
          <Profile />
        </div>
        <Card className="tw-bg-[#242424] tw-w-[350px] tw-min-h-[442px] tw-rounded-b-xl tw-rounded-tr-xl tw-p-4 tw-items-center tw--translate-y-8">
          {
            isInitializing ?
              <FlashCardSkeleton /> :
              <CardBody>
                {cardShown && !isInitializing ? <FlashCard card={cardShown} showRandomCard={showRandomCard} /> : <Text>asd</Text>}
              </CardBody>
          }
        </Card>
      </VStack>
    </div>
  );
}

export default Page;
