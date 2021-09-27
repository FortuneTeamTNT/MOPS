import React from 'react';

import {Tabs} from "devextreme-react";
import {Analytics} from "./Analytics";
import {CostCalculation} from "./CostCalculation";

export const tabs = [{
    'id': 1,
    'text': 'Вероятность отказов'
}];

export class AnalyticData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0
        };
        this.onTabsSelectionChanged = this.onTabsSelectionChanged.bind(this);
    }

    render() {
        const {selectedIndex} = this.state;
        return (
            <div>
                <Tabs
                    dataSource={tabs}
                    selectedIndex={selectedIndex}
                    onOptionChanged={this.onTabsSelectionChanged}
                />
                <div style={selectedIndex === 0 ? {} : {contentVisibility: 'hidden'}}>
                    <Analytics/>
                </div>
                <div style={selectedIndex === 1 ? {} : {contentVisibility: 'hidden'}}>
                    <CostCalculation/>
                </div>
            </div>
        );
    }

    onTabsSelectionChanged(args) {
        if (args.name === 'selectedIndex') {
            this.setState({
                selectedIndex: args.value
            });
        }
    }
}