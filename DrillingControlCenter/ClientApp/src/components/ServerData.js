import axios from 'axios';
import React, {Component} from 'react';
import {Button} from "devextreme-react";
import DataGrid, {Column, Scrolling, Pager, Paging, HeaderFilter} from 'devextreme-react/data-grid';
import './Styles.css';

const allowedPageSizes = [5, 10, 'all'];

export class ServerData extends Component {
    static displayName = ServerData.name;

    constructor(props) {
        super(props);
        this.state = {
            servers: [],
            loading: true,
            selectedFile: null,
            displayMode: 'compact',
            showPageSizeSelector: true,
            showInfo: true,
            showNavButtons: true
        };
    }

    componentDidMount() {
        this.populateServerData();
    }

    static renderServerTable(servers,
                             displayMode,
                             showPageSizeSelector,
                             showInfo,
                             showNavButtons) {
        return (
            <div>
                <DataGrid
                    id='gridContainer'
                    dataSource={servers}
                    keyExpr="date"
                    showBorders={true}
                >
                    <HeaderFilter visible={true}/>
                    <Column caption="Дата" dataField="dateString" cellRender={cellRender} width={8 + 'rem'}/>
                    <Column caption="Система" dataField="system" cellRender={cellRender} width={12 + 'rem'}/>
                    <Column caption="Свободное место на диске" dataField="freeDiskSpace" cellRender={cellRender}
                            width={10 + 'rem'}/>
                    <Column caption="Предупреждение" dataField="alert" cellRender={cellRender} width={10 + 'rem'}/>
                    <Column caption="Рекомендация" dataField="recommendation" cellRender={cellRender}/>
                    <Scrolling rowRenderingMode='virtual'></Scrolling>
                    <Paging defaultPageSize={10}/>
                    <Pager
                        visible={true}
                        allowedPageSizes={allowedPageSizes}
                        displayMode={displayMode}
                        showPageSizeSelector={showPageSizeSelector}
                        showInfo={showInfo}
                        showNavigationButtons={showNavButtons}/>
                </DataGrid>
            </div>
        );

        function cellRender(cellData) {
            return <div style={cellData.data.alert >= 2 ?
                {whiteSpace: 'pre-wrap', color: 'orangered', height: 2 + 'rem'} : (cellData.data.alert === 1 ?
                    {
                        whiteSpace: 'pre-wrap',
                        color: 'yellowgreen',
                        height: 2 + 'rem'
                    } : {height: 2 + 'rem'})}>{cellData.value}</div>;
        }
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Загрузка...</em></p>
            : ServerData.renderServerTable(
                this.state.servers,
                this.state.displayMode,
                this.state.showPageSizeSelector,
                this.state.showInfo,
                this.state.showNavButtons);

        return (
            <div>
                <h5 id="tabelLabel">Сбой серверов</h5>
                {/*<div>*/}
                {/*    <input type="file" onChange={this.onFileChange}/>*/}
                {/*    <Button text="Загрузить" onClick={this.onFileUpload}/>*/}
                {/*    {" "}*/}
                {/*    <Button text="Очистить" onClick={this.onDeleteData}/>*/}
                {/*</div>*/}
                <p/>
                {contents}
            </div>
        );
    }

    async populateServerData() {
        const response = await fetch('serverdata');
        const data = await response.json();
        this.setState({servers: data, loading: false});
    }

    onFileChange = event => {
        this.setState({selectedFile: event.target.files[0]});
    };

    onFileUpload = () => {
        if (!this.state.selectedFile) {
            return;
        }

        console.log(this.state.selectedFile);
        this.setState({loading: true});

        const formData = new FormData();
        formData.append(
            'File', this.state.selectedFile
        );

        this.getData(formData);
    };

    onDeleteData = () => {
        this.setState({loading: true});
        this.getData(null);
    };

    async getData(formData) {
        const response = await axios.post("serverdata", formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        });
        const data = await response.data;
        this.setState({servers: data, loading: false});
    }
}
