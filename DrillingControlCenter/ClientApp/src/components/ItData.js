import React from 'react';

import {Tabs} from "devextreme-react";
import {ServerData} from "./ServerData";
import {ChannelData} from "./ChannelData";
import {DrillingData} from "./DrillingData";

export const tabs = [{
    'id': 1,
    'text': 'Серверы'
}, {
    'id': 2,
    'text': "Каналы связи"
}, {
    'id': 3,
    'text': "Бурение"
}];

export class ItData extends React.Component {
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
                    <ServerData/>
                </div>
                <div style={selectedIndex === 1 ? {} : {contentVisibility: 'hidden'}}>
                    <ChannelData/>
                </div>
                <div style={selectedIndex === 2 ? {} : {contentVisibility: 'hidden'}}>
                    <DrillingData/>
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