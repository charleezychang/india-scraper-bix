"use client";

import {
  Card,
  CardBody,
  VStack,
  useDisclosure
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Profile from "@/src/components/Profile";
import useFirebaseDatabase from "@/src/firebase/useFirebaseDatabase";
import FlashCard from "@/src/components/FlashCard";
import dayjs from "dayjs";
import { Card as CardType } from "@/src/interfaces";
import useFirebaseAuth from "@/src/firebase/useFirebaseAuth";
import FlashCardSkeleton from "@/src/components/FlashCardSkeleton";
import NoCards from "@/src/components/NoCards";
import ImportModal from "@/src/components/ImportModal";

function Page() {
  const { user } = useFirebaseAuth();
  const { initializeDeck, readDeck } = useFirebaseDatabase();
  const [deck, setDeck] = useState<CardType[]>([]);
  const [cardShown, setCardShown] = useState<CardType>()
  const [isInitializing, setIsInitializing] = useState<boolean>(false)
  const [shownInitialCard, setShowInitialCard] = useState<boolean>(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    fetchData()
  }, [user]);

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

  useEffect(() => {
    if (!shownInitialCard && deck.length > 0) {
      showRandomCard();
      setShowInitialCard(true)
    }
  }, [deck]);

  const showRandomCard = () => {
    if (deck.length == 0) {
      return
    }
    const index = Math.floor(Math.random() * deck.length);
    const item = deck && deck[index];
    const updatedDeck = [...deck];
    updatedDeck.splice(index, 1);

    setDeck(updatedDeck);
    setCardShown(item)
  };

  const handleImportModalOpen = () => {
    onOpen()
  }

  const handleImportModalClose = () => {
    onClose()
    fetchData()
  }

  return (
    <div className="tw-flex tw-items-center tw-justify-center tw-h-screen">
      <VStack>
        <ImportModal isOpen={isOpen} onClose={handleImportModalClose} />

        <div className="tw-self-start">
          <Profile handleImportModalOpen={handleImportModalOpen} />
        </div>
        <Card className="tw-bg-[#242424] tw-w-[350px] tw-min-h-[442px] tw-rounded-b-xl tw-rounded-tr-xl tw-p-4 tw-items-center tw--translate-y-8">
          {
            isInitializing ?
              <FlashCardSkeleton /> :
              <CardBody>
                {cardShown && !isInitializing ? <FlashCard card={cardShown} showRandomCard={showRandomCard} /> : <NoCards handleImportModalOpen={handleImportModalOpen} />}
              </CardBody>
          }
        </Card>
      </VStack>
    </div>
  );
}

export default Page;
