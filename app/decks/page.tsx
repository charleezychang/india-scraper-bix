"use client";

import {
  Card,
  CardBody,
  VStack
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Profile from "@/src/components/Profile";
import useFirebaseDatabase from "@/src/firebase/useFirebaseDatabase";
import FlashCard from "@/src/components/FlashCard";
import dayjs from "dayjs";
import { Card as CardType } from "@/src/interfaces";
import useFirebaseAuth from "@/src/firebase/useFirebaseAuth";

function Page() {
  const { user } = useFirebaseAuth();
  const { initializeDeck, readDeck } = useFirebaseDatabase();
  const [isDeckInitialized, setIsDeckInitialized] = useState(false);
  const [deck, setDeck] = useState<CardType[]>([]);
  const [cardShown, setCardShown] = useState<CardType>()

  useEffect(() => {
    initializeDeck();

    const fetchData = async () => {
      try {
        initializeDeck();
        const res = await readDeck(dayjs());
        setDeck(res as CardType[]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData().then(res => {
      setIsDeckInitialized(true)
    })
  }, [user]);

  useEffect(() => {
    if (deck.length > 0) {
      showRandomCard();
    }
  }, [deck]);

  const showRandomCard = () => {
    const index = Math.floor(Math.random() * deck.length);
    const item = deck && deck[index];
    const updatedDeck = [...deck];
    updatedDeck.splice(index, 1);

    // Update the deck state with the updated array
    // setDeck(updatedDeck);

    setCardShown(item)
  };


  return (
    <div className="tw-flex tw-items-center tw-justify-center tw-h-screen">
      <VStack>
        <div className="tw-self-start">
          <Profile />
        </div>
        <Card className="tw-bg-[#242424] tw-w-[350px] tw-rounded-b-xl tw-rounded-tr-xl tw-p-4 tw-items-center tw--translate-y-8">
          <CardBody>
            <FlashCard card={cardShown} showRandomCard={showRandomCard} />
          </CardBody>
        </Card>
      </VStack>
    </div>
  );
}

export default Page;
