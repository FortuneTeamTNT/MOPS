import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {Layout} from './components/Layout';
import {Home} from './components/Home';
import {Monitoring} from './components/Monitoring';
import {Analytics} from './components/Analytics';
import {BounceTree} from "./components/BounceTree";
import {ItData} from "./components/ItData";

import './custom.css'
import 'devextreme/dist/css/dx.light.css';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home}/>
                <Route path='/it-data' component={ItData}/>
                <Route path='/monitoring' component={Monitoring}/>
                <Route path='/bounce-tree' component={BounceTree}/>
                <Route path='/analytics' component={Analytics}/>
            </Layout>
        );
    }
}
