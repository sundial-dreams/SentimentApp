import Taro, { Component, Config } from '@tarojs/taro'
import { connect } from "@tarojs/redux"
import { View } from '@tarojs/components'
import { fetchUrl, sentimentMap } from "../../tools/tools"
import RecordButton from "../../components/recordButton"
import SentimentView from "../../components/sentimentView";
import { State } from "../../reducers/reducer"
import { Dispatch } from "redux"
import { makeSentiment, resetSentiment } from "../../actions/action"
import "./index.less"

type PageOwnProps = {
    sentiment: string;
    handleSentiment: (value) => any;
    resetSentiment: () => any
}

type PageState = {}

type Response = {
    err: boolean;
    data: number
}

@connect(
    (state: State) => ({
        ...state
    }),
    (dispatch: Dispatch) => ({
        handleSentiment: (value) => dispatch(makeSentiment(value)),
        resetSentiment: () => dispatch(resetSentiment())
    })
)
class Index extends Component<PageOwnProps | any, PageState> {
    public state = {
        text: "hello world"
    };

    public recorderManager = Taro.getRecorderManager();
    public config: Config = {
        navigationBarTitleText: "analyzer"
    };

    constructor (props) {
        super(props)
    }

    componentDidMount () {
        this.recorderManager.onStop(res => {
            const { tempFilePath } = res;
            Taro.uploadFile({
                filePath: tempFilePath,
                name: "temp.wav",
                url: fetchUrl,
                success: data => {
                    console.log(data);
                    let value = JSON.parse(data.data);
                    let mySentiment = sentimentMap[(value as Response).data];
                    console.log(mySentiment);
                    this.props.handleSentiment(mySentiment)
                },
                fail: err => {
                    console.log(err)
                }
            })
        })
    }

    private handleStart = () => {
        this.props.resetSentiment();
        this.recorderManager.start({
            duration: 60000,
            format: "mp3"
        })
    };
    private handleStop = () => {
        this.recorderManager.stop();
    };

    render () {
        return (
            <View className="index__page">
                <View className="index__top">
                    <SentimentView/>
                </View>
                <View  className="index__bg"/>
                <View className="index__bottom">
                    <RecordButton
                        time={ 60 }
                        startRecord={ this.handleStart }
                        stopRecord={ this.handleStop }
                        resetRecord={ () => {
                             this.recorderManager.start({
                                duration: 60000,
                                format: "mp3"
                            })
                        } }
                        clearRecord={ () => {
                            this.recorderManager.resume()
                        } }
                    />
                </View>
            </View>
        )
    }
}

export default Index