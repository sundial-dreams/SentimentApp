import { AnyAction } from "redux";
import * as ActionType from "../constants/const";
export type State = {
    sentiment: string
};
const none = "";
const initState: State = {
    sentiment: none
};

export default function reducer (state = initState, action: AnyAction) {
    switch (action.type) {
        case ActionType.SHOW_SENTIMENT: {
            return {
                ...state,
                sentiment: action.sentiment
            }
        }
        case ActionType.RESET_SENTIMENT: {
            return {
                ...state,
                sentiment: none
            }
        }
        default : {
            return state
        }
    }
};
