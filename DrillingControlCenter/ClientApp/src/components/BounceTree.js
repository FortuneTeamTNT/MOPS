import React, {Component, useState} from 'react';

import ReactFlow, {addEdge, Background, Controls, MiniMap, removeElements} from 'react-flow-renderer';

import treeElements from './BounceTreeElements';

const onLoad = (reactFlowInstance) => {
    console.log('flow loaded:', reactFlowInstance);
    reactFlowInstance.fitView();
};

const OverviewFlow = () => {
    const [elements, setElements] = useState(treeElements);
    const onElementsRemove = (elementsToRemove) =>
        setElements((els) => removeElements(elementsToRemove, els));
    const onConnect = (params) => setElements((els) => addEdge(params, els));

    return (
        <ReactFlow
            elements={elements}
            onElementsRemove={onElementsRemove}
            onConnect={onConnect}
            onLoad={onLoad}
            snapToGrid={true}
            snapGrid={[15, 15]}
        >
            <Controls/>
            <Background color="#aaa" gap={16}/>
        </ReactFlow>
    );
};

export class BounceTree extends Component {
    static displayName = BounceTree.name;

    render() {
        return (
            <div style={{height: 50 + 'rem', width: 90 + 'rem'}}>
                <OverviewFlow/>
            </div>
        );
    }
}
