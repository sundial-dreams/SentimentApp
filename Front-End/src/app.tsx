import '@tarojs/async-await';
import Taro, { Component, Config } from '@tarojs/taro';
import { Provider } from '@tarojs/redux';
import 'taro-ui/dist/style/index.scss'
import configStore from './store';
import Index from "./pages/index";
import './app.less';

const store = configStore();

class App extends Component {

    public config: Config = {
        pages: [
            'pages/index/index'
        ],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: 'WeChat',
            navigationBarTextStyle: 'black'
        }
    };

    componentDidMount () {
    }

    componentDidShow () {
    }

    componentDidHide () {
    }

    componentDidCatchError () {
    }

    render () {
        return (
            <Provider store={ store }>
                <Index/>
            </Provider>
        )
    }
}

Taro.render(<App/>, document.getElementById('app'));
