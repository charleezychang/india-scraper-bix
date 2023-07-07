import axios from "axios";
import { load } from "cheerio";
import { useState } from "react";
import { Card } from "../interfaces";
import dayjs from "dayjs";
import useFirebaseAuth from "../firebase/useFirebaseAuth";
import useFirebaseDatabase from "../firebase/useFirebaseDatabase";

function useImportCards() {
  const [deck, setDeck] = useState<Card[] | null>(null)
  const { user } = useFirebaseAuth()
  const { addCard, readDeck, initializeDeck } = useFirebaseDatabase()

  async function testScrape(url: string) {
    const response = await axios.get(url);
    const $ = load(response.data);

    const answers = $('.ps-1.pt-1').each(function (i, elem) {
      let nodeAsString = $(this).toString().replace(/["']/g, "")
      let indexAlpha = $(this).toString().replace(/["']/g, "").indexOf("alpha-")

      console.log(nodeAsString.substring(indexAlpha).slice(6, 7));

    });
    // let questions: string[] = []
    // $('.bix-td-option-val.d-flex.flex-row.align-items-center > .flex-wrap').each(function (i, elem) {
    //   // return console.log($(this).text());
    //   questions.push($(this).text())
    // });
    // console.log(questions)
  }

  async function scrapeWebsite(url: string) {
    console.log(url)
    // Parse the page for looping
    let indexLastForwardSlash = url.lastIndexOf('/')
    let splitUrl = url.split('/')
    let page = parseInt(splitUrl[splitUrl.length - 1])
    let topic = splitUrl[splitUrl.length - 2].split("-").filter(x => x.length > 0).map((x) => (x.charAt(0).toUpperCase() + x.slice(1))).join(" ");
    let itemBank: Card[] = []
    // Loop through each page
    // do {
    //   try {
    //     const questions: string[] = []
    //     const options: string[] = []
    //     const answers: string[] = []

    //     // Initialize cheerio
    //     const response = await axios.get(url.slice(0, indexLastForwardSlash) + "/" + page);
    //     const $ = load(response.data);

    //     // Populate questions
    //     $('.bix-td-qtxt.table-responsive.w-100').each(function (i, elem) {
    //       questions.push($(this).text())
    //     });

    //     // Populate options
    //     $('.bix-td-option-val.d-flex.flex-row.align-items-center > .flex-wrap').each(function (i, elem) {
    //       options.push($(this).text())
    //     });

    //     // Populate answers
    //     $('.ps-1.pt-1').each(function (i, elem) {
    //       let nodeAsString = $(this).toString().replace(/["']/g, "")
    //       let indexAlpha = $(this).toString().replace(/["']/g, "").indexOf("alpha-")
    //       answers.push(nodeAsString.substring(indexAlpha).slice(6, 7))
    //     });
    //     // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    //     // Populate cards (5 cards per page)
    //     questions.forEach((entry, i) => {
    //       let card: Card = {
    //         topic: topic,
    //         question: entry,
    //         options: {
    //           a: options[i * 4],
    //           b: options[i * 4 + 1],
    //           c: options[i * 4 + 2],
    //           d: options[i * 4 + 3],
    //         },
    //         answer: answers[i],
    //         timesCorrect: 0,
    //         timesWrong: 0,
    //         nextInterval: dayjs().format('MM/DD/YYYY')
    //       }

    //       console.log(card)
    //       itemBank.push(card)
    //     })

    //     // setDeck($.text())
    //     page--;
    //   } catch (error) {
    //     console.error("Error:", error);
    //   }

    // }
    // while (page.toString().slice(4, page.toString().length) != '00')
    // itemBank.forEach(card => {

    // })
    initializeDeck()
    // addCard(JSON.parse(JSON.stringify({
    //   topic: "Chemical Engineering Basics",
    //   question: "Polystyrene is a light, transparent, thermoplastic material used for making",
    //   options: {
    //     a: "toys and combs",
    //     b: "packaging bags",
    //     c: "non-sticking utensils",
    //     d: "electrical insulation"
    //   },
    //   answer: "a",
    //   timesCorrect: 0,
    //   timesWrong: 0,
    //   cooldown: dayjs().subtract(1, 'day').format('MM/DD/YYYY')
    // })))

    // addCard(JSON.parse(JSON.stringify({
    //   topic: "Chemical Engineering Basics",
    //   question: "The difference between gross & net calorific values of fuel is due to the",
    //   options: {
    //     "a": "sensible heat carried away by the flue gases.",
    //     "b": "heat carried away by the steam from the moisture content of the fuel.",
    //     "c": "heat lost by radiation.",
    //     "d": "heat carried away by steam from the combustion of hydrogen in the fuel."
    //   },
    //   answer: "d"
    // })))

    // console.log(readDeck())
  }



  return {
    // deck: deck
    scrapeWebsite: (url: string) => scrapeWebsite(url),
    testScrape: (url: string) => testScrape(url)
  };
}

export default useImportCards;
