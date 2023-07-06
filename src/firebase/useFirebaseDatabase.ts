import { getDatabase, ref, set, onValue, push } from "firebase/database";
import { Card } from "../interfaces";
import useFirebaseAuth from "./useFirebaseAuth";
import dayjs from "dayjs";

function useFirebaseDatabase() {
    const { user } = useFirebaseAuth()
    const db = getDatabase();

    function addCard(card: Card) {
        // set will rewrite unless u add 'push'
        // set(ref(db, 'users/' + user.uid), card);

        // userId/cards/date
        console.log(card)
        set(push(ref(db, user?.uid + '/cards/' + dayjs().format('MM/DD/YYYY').toString().replaceAll('/', ''))), card)
    }

    function readCard() {
        if (user) {
            // listener receives a snapshot that contains the data at the specified path
            onValue(ref(db, 'users/' + user.uid + '/cards'), (snapshot) => {
                // val() gets the data (only one)
                const data = snapshot.val()
            });
        }
    }

    function readDeck() {
        const deck: Card[] = []
        
        onValue(ref(db, 'users/' + user?.uid + '/cards'), (snapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach(childSnapshot => {
                    const key = childSnapshot.key
                    const value = childSnapshot.val()
    
                    deck.push({
                        key: value
                    })
                })
            }
            else {
                console.log("No data available")
            }
        });

        return deck
    }

    function updateCard() {

    }
    
    function writeUser() {

    }


    return {
        addCard: (card: Card) => addCard(card),
        readDeck: readDeck
    }
}

export default useFirebaseDatabase
