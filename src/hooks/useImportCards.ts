import axios from "axios";
import { load } from "cheerio";
import { useState } from "react";

// interface Deck {
//     username: string;
// }

function useImportCards() {
    const [deck, setDeck] = useState<string | null>(null)

    // function loadCards() {
        
    //     scrapeWebsite().then(res => {
    //         res
    //     })
    // }

    async function scrapeWebsite(url: string) {
    try {
      const response = await axios.get(url);
      const $ = load(response.data);
      console.log($);
      setDeck($.text())
      // Use Cheerio to manipulate the HTML and extract desired data
      //   const title = $("h1").text();
      //   console.log("Website title:", title);
    //   return $
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return {
    // deck: deck
    scrapeWebsite: (url: string) => scrapeWebsite(url)
  };
}

export default useImportCards;
