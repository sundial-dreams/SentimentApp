import Taro, { Component } from "@tarojs/taro";
import { Button, Text, View } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import { mergeClass } from "../tools/tools";
import "./style.less"

type RecordButtonProps = {
    startRecord: () => any,
    stopRecord: () => any,
    resetRecord: () => any,
    clearRecord: () => any,
    time: number
}
type RecordButtonState = {
    startTime: number,
    isRecord: boolean
}

export default class RecordButton extends Component<RecordButtonProps, RecordButtonState> {
    public state = {
        startTime: 0,
        isRecord: false
    };
    private timer;

    constructor (props) {
        super(props);
    }

    private handleStart = () => {
        this.setState({
            isRecord: true
        });
        this.timer = setInterval(() => {
            this.setState((state) => ({
                startTime: state.startTime + 1
            }))
        }, 1000);
        this.props.startRecord();
    };
    private handleStop = () => {
        this.setState({
            startTime: 0,
            isRecord: false
        });
        clearInterval(this.timer);
        this.props.stopRecord();
    };
    componentWillUnmount (): void {
        clearInterval(this.timer);
    }

    render () {
        const { isRecord } = this.state;
        const { time } = this.props;
        return (
            <View className="record__button__view">
                <Text className={ mergeClass("record__button__text", isRecord && "record__button__text__show") }>
                    ••••••••
                    <Text className="record__button__text__time">
                        { isRecord ? "   " + (time - this.state.startTime) + "   " : 0 }
                    </Text>
                    ••••••••
                </Text>
                <Button className={ mergeClass("record__button__btn", isRecord && "record__btn__active") }
                        onClick={ isRecord ? this.handleStop : this.handleStart }
                >
                    <AtIcon prefixClass="icon" value="record" size={ 45 }/>
                </Button>
                <Button onClick={ this.props.clearRecord }
                        className={ mergeClass("__btn__", isRecord && "record__button__cancel-btn") }
                >
                    <AtIcon prefixClass="icon" value="reset"/>
                </Button>
                <Button onClick={ this.props.resetRecord }
                        className={ mergeClass("__btn__", isRecord && "record__button__reset-btn") }
                >
                    <AtIcon prefixClass="icon" value="trash"/>
                </Button>
            </View>
        )
    }
}