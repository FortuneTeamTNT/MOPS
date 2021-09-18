import axios from 'axios';
import React, {Component} from 'react';
import {Button} from "devextreme-react";

export class DrillingData extends Component {
    static displayName = DrillingData.name;

    constructor(props) {
        super(props);
        this.state = {bitloads: [], loading: true, selectedFile: null};
    }

    componentDidMount() {
        this.populateBitLoadData();
    }

    static renderBitLoadTable(bitloads) {
        return (
            <table className='table' aria-labelledby="tabelLabel">
                <thead>
                <tr>
                    <th>Дата</th>
                    <th>Нагрузка на долото</th>
                    <th>Предупреждение</th>
                    <th>Рекомендация</th>
                </tr>
                </thead>
                <tbody>
                {bitloads.map(bitload =>
                    <tr style={bitload.alert === 2 ? {background: 'orangered'} : (bitload.alert === 1 ? {background: 'lightyellow'} : {})}
                        key={bitload.date}>
                        <td style={{minWidth: '9rem'}}>{bitload.dateString}</td>
                        <td>{bitload.bitLoad}</td>
                        <td>{bitload.alert}</td>
                        <td>{bitload.recommendation}</td>
                    </tr>
                )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Загрузка...</em></p>
            : DrillingData.renderBitLoadTable(this.state.bitloads);

        return (
            <div>
                <h5 id="tabelLabel">Нагрузка на долото</h5>
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

    async populateBitLoadData() {
        const response = await fetch('bitloaddata');
        const data = await response.json();
        this.setState({bitloads: data, loading: false});
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
        const response = await axios.post("bitloaddata", formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        });
        const data = await response.data;
        this.setState({bitloads: data, loading: false});
    }
}
