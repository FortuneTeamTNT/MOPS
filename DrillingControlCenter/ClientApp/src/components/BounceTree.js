import React, {Component} from 'react';

export class BounceTree extends Component {
    static displayName = BounceTree.name;

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h3>Дерево отказов</h3>
                <img alt="" src="/bounce_tree.png"/>
            </div>
        );
    }
}
