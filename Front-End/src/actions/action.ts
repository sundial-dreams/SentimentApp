import { SHOW_SENTIMENT, RESET_SENTIMENT } from "../constants/const";

export const makeSentiment = (sentiment) => ({
    type: SHOW_SENTIMENT,
    sentiment
});
export const resetSentiment = () => ({
    type: RESET_SENTIMENT
});