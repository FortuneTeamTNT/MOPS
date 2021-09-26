import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {Layout} from './components/Layout';
import {Home} from './components/Home';
import {Monitoring} from './components/Monitoring';
import {AnalyticData} from './components/AnalyticData';
import {ItData} from "./components/ItData";
import {ReferenceData} from "./components/ReferenceData";

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
                <Route path='/analytic-data' component={AnalyticData}/>
                <Route path='/reference-data' component={ReferenceData}/>
            </Layout>
        );
    }
}
