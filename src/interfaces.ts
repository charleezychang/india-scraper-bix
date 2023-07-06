import { Dayjs } from "dayjs";

export interface Card {
    [key: string]: {
        topic: string;
        question: string;
        options: {
            a: string;
            b: string;
            c: string;
            d: string;
        }
        answer: string;
        timesCorrect: number;
        timesWrong: number;
        cooldown: Dayjs;
    }
}

export interface User {
    uid: string;
    name: string;
    email: string;
    photoURL: string;
}