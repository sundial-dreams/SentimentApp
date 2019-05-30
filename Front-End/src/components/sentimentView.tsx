import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { State } from "../reducers/reducer";
import { Dispatch } from "redux";
import "./style.less"
type SentimentViewProps = {
    sentiment: string;
    dispatch: Dispatch
}
type SentimentViewState = {}

@connect(
    (state: State) => ({
        ...state
    }),
    (dispatch: Dispatch) => ({ dispatch })
)
class SentimentView extends Component<SentimentViewProps | any, SentimentViewState> {
    constructor (props) {
        super(props);
    }

    render () {
        const { sentiment } = this.props;
        return (
            <View className="sentiment__view">
                { sentiment ? <Text className="sentiment__view__text">you look so
                    {" " + sentiment.sentiment}
                <Text className="sentiment__view__sentiment">
                    { sentiment.emotion }
                </Text>
                </Text> : "(✿◕‿◕✿)" }
            </View>
        )
    }
}

export default SentimentView