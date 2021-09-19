import axios from 'axios';
import React, {Component} from 'react';
import {Button} from "devextreme-react";
import { serverdata } from './servers.js';

export class ServerData extends Component {
    static displayName = ServerData.name;

    constructor(props) {
        super(props);
        this.state = {servers: [], loading: true, selectedFile: null};
    }

    componentDidMount() {
        this.populateServerData();
    }

    static renderServerTable(servers) {
        return (
            <table className='table' aria-labelledby="tabelLabel">
                <thead>
                <tr>
                    <th>Дата</th>
                    <th>ИС</th>
                    <th>Объем свободного места на диске</th>
                    <th>Предупреждение</th>
                    <th>Рекомендация</th>
                </tr>
                </thead>
                <tbody>
                {servers.map(server =>
                    <tr style={server.alert === 2 ? {background: 'orangered'} : (server.alert === 1 ? {background: 'lightyellow'} : {})}
                        key={server.date}>
                        <td style={{minWidth: '9rem'}}>{server.dateString}</td>
                        <td>{server.system}</td>
                        <td>{server.freeDiskSpace}</td>
                        <td>{server.alert}</td>
                        <td>{server.recommendation}</td>
                    </tr>
                )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Загрузка...</em></p>
            : ServerData.renderServerTable(this.state.servers);

        return (
            <div>
                <h5 id="tabelLabel">Сбой серверов</h5>
                <div>
                    <input type="file" onChange={this.onFileChange}/>
                    <Button text="Загрузить" onClick={this.onFileUpload}/>
                    {" "}
                    <Button text="Очистить" onClick={this.onDeleteData}/>
                </div>
                <p/>
                {contents}
            </div>
        );
    }

    async populateServerData() {
        // const response = await fetch('serverdata');
        // const data = await response.json();
        this.setState({servers: serverdata, loading: false});
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
        // const response = await axios.post("serverdata", formData, {
        //     headers: {'Content-Type': 'multipart/form-data'}
        // });
        // const data = await response.data;
        this.setState({servers: serverdata, loading: false});
    }
}
