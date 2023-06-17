export interface Deck {
    name: string;
    cards: Card[];
}

export interface Card {
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
    nextInterval: Date;
}