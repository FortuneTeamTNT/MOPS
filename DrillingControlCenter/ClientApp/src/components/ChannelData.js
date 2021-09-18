import axios from 'axios';
import React, {Component} from 'react';
import {Button} from "devextreme-react";

export class ChannelData extends Component {
    static displayName = ChannelData.name;

    constructor(props) {
        super(props);
        this.state = {channels: [], loading: true, selectedFile: null};
    }

    componentDidMount() {
        this.populateChannelData();
    }

    static renderChannelTable(channels) {
        return (
            <table className='table' aria-labelledby="tabelLabel">
                <thead>
                <tr>
                    <th>Дата</th>
                    <th>ИС</th>
                    <th>Время отклика сетевого устройства</th>
                    <th>Процент потери сетевого устройства</th>
                    <th>Предупреждение</th>
                    <th>Рекомендация</th>
                </tr>
                </thead>
                <tbody>
                {channels.map(channel =>
                    <tr style={channel.rec === 2 ? {background: 'orangered'} : (channel.rec === 1 ? {background: 'lightyellow'} : {})}
                        key={channel.date}>
                        <td style={{minWidth: '9rem'}}>{channel.dateString}</td>
                        <td>{channel.system}</td>
                        <td>{channel.responseTime}</td>
                        <td>{channel.packetLossPercentage}</td>
                        <td>{channel.alert}</td>
                        <td>{channel.recommendation}</td>
                    </tr>
                )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Загрузка...</em></p>
            : ChannelData.renderChannelTable(this.state.channels);

        return (
            <div>
                <h5 id="tabelLabel">Сбой каналов связи</h5>
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

    async populateChannelData() {
        const response = await fetch('channeldata');
        const data = await response.json();
        this.setState({channels: data, loading: false});
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
        const response = await axios.post("channeldata", formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        });
        const data = await response.data;
        this.setState({channels: data, loading: false});
    }
}
