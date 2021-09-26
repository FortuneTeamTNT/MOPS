import React from 'react';

import {Tabs} from "devextreme-react";
import {BounceTree} from "./BounceTree";
import {Directory} from "./Directory";

export const tabs = [{
    'id': 1,
    'text': 'Дерево отказов'
}, {
    'id': 2,
    'text': "Справочник"
}];

export class ReferenceData extends React.Component {
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
                    <BounceTree/>
                </div>
                <div style={selectedIndex === 1 ? {} : {contentVisibility: 'hidden'}}>
                    <Directory/>
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