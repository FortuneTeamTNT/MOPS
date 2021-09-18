import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {Layout} from './components/Layout';
import {Home} from './components/Home';
import {Monitoring} from './components/Monitoring';
import {Analytics} from './components/Analytics';
import {ServerData} from './components/ServerData';
import {ChannelData} from "./components/ChannelData";
import {DrillingData} from "./components/DrillingData";
import {BounceTree} from "./components/BounceTree";

import './custom.css'
import 'devextreme/dist/css/dx.light.css';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home}/>
                <Route path='/monitoring' component={Monitoring}/>
                <Route path='/analytics' component={Analytics}/>
                <Route path='/server-data' component={ServerData}/>
                <Route path='/channel-data' component={ChannelData}/>
                <Route path='/drilling-data' component={DrillingData}/>
                <Route path='/bounce-tree' component={BounceTree}/>
            </Layout>
        );
    }
}
