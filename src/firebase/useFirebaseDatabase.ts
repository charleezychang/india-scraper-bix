import { getDatabase, ref, set, onValue, push } from "firebase/database";
import { Card } from "../interfaces";
import useFirebaseAuth from "./useFirebaseAuth";

function useFirebaseDatabase() {
    const { user } = useFirebaseAuth()
    const db = getDatabase();

    function writeCard(card: Card) {
        // if (user) {
        //     // set will rewrite unless u push
        //     console.log(db)
        //     console.log('users/' + user.uid)
        //     const reference = ref(db, 'users/' + user['uid'])
        //     set(reference, card)
        //     // set(ref(db, 'users/' + user.uid), card);
        //     // push(ref(db, 'users/' + user.uid + '/cards'), card);
            // set(push(ref(db, 'users/' + user.uid + '/cards')), card)
        // }
        const db = getDatabase();
        set(ref(db, 'users/' + user?.uid + '/cards'), {
          username: 'aa',
          email: 'aaa',
          profile_picture : 'aaa'
        });

    }

    function readCard() {
        if (user) {
            // listener receives a snapshot that contains the data at the specified path
            onValue(ref(db, 'users/' + user.uid + '/cards'), (snapshot) => {
                // val() gets the data (only)
                const data = snapshot.val()
            });
        }
    }

    function readAllCard() {

    }

    function updateCard() {

    }
    
    function writeUser() {

    }


    return {
        writeCard: (card: Card) => writeCard(card) 
    }
}

export default useFirebaseDatabase
