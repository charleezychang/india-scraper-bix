import axios from "axios";
import { load } from "cheerio";
import { useState } from "react";
import useFirebaseDatabase from "../firebase/useFirebaseDatabase";

function useImportCards() {
  const { addCard } = useFirebaseDatabase()
  const [isImporting, setIsImporting] = useState<boolean>(false)


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

  const clz = (page: string) => {
    let lz = ''
    let foundNlz = false
    for (var i = 0; i < page.length; i++) {
      if (page.charAt(i) == '0' && !foundNlz) {
        lz = lz + '0'
      }
      else {
        foundNlz = true
      }
    }
    return lz
  }

  async function scrapeWebsite(url: string) {
    setIsImporting(true)
    // Parse the page for looping
    let indexLastForwardSlash = url.lastIndexOf('/')
    let splitUrl = url.split('/')
    let page = parseInt(splitUrl[splitUrl.length - 1])
    let lz = clz(splitUrl[splitUrl.length - 1])
    let totalPage = lz + page.toString()
    let topic = splitUrl[splitUrl.length - 2].split("-").filter(x => x.length > 0).map((x) => (x.charAt(0).toUpperCase() + x.slice(1))).join(" ");
    // Loop through each page
    do {
      try {
        const questions: string[] = []
        const options: string[] = []
        const answers: string[] = []

        // Initialize cheerio
        const response = await axios.get(url.slice(0, indexLastForwardSlash) + "/" + totalPage);
        const $ = load(response.data);

        // Populate questions
        $('.bix-td-qtxt.table-responsive.w-100').each(function (i, elem) {
          questions.push($(this).text())
        });

        // Populate options
        $('.bix-td-option-val.d-flex.flex-row.align-items-center > .flex-wrap').each(function (i, elem) {
          options.push($(this).text())
        });

        // Populate answers
        $('.ps-1.pt-1').each(function (i, elem) {
          let nodeAsString = $(this).toString().replace(/["']/g, "")
          let indexAlpha = $(this).toString().replace(/["']/g, "").indexOf("alpha-")
          answers.push(nodeAsString.substring(indexAlpha).slice(6, 7))
        });
        // Populate cards (5 cards per page)
        questions.forEach((entry, i) => {
          addCard(JSON.parse(JSON.stringify({
            topic: topic,
            question: entry,
            options: {
              a: options[i * 4],
              b: options[i * 4 + 1],
              c: options[i * 4 + 2],
              d: options[i * 4 + 3],
            },
            answer: answers[i],
            timesCorrect: 0,
            timesWrong: 0,
          })))
        })

        page--;
        totalPage = lz + page.toString()
      } catch (error) {
        console.error("Error:", error);
      }
    }
    while (totalPage.toString().slice(4, totalPage.toString().length) != '00')

    setIsImporting(false)
  }

  return {
    scrapeWebsite: (url: string) => scrapeWebsite(url),
    testScrape: (url: string) => testScrape(url),
    isImporting: isImporting
  };
}

export default useImportCards;
