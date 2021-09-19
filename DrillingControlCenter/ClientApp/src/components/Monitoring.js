import React, {Component} from 'react';
import { serverchartdata } from './servercharts.js';
import { bitloaddata } from './bitloads.js';

import {
    Chart,
    Series,
    ArgumentAxis,
    CommonSeriesSettings,
    CommonAxisSettings,
    Grid,
    Export,
    Legend,
    Margin,
    Tooltip,
    Label,
    Format
} from 'devextreme-react/chart';
import {Button} from "devextreme-react";
import axios from "axios";

export const systems = [
    {value: 'freeDiskSpace1', name: 'Petrel'},
    {value: 'freeDiskSpace2', name: 'Геонафт'},
    {value: 'freeDiskSpace3', name: 'Вспомогательные сервисы'}
];

export const values = [
    {value: 'bitLoad', name: 'Нагрузка на долото'}
];

export class Monitoring extends Component {
    static displayName = Monitoring.name;

    constructor(props) {
        super(props);

        this.state = {
            type: 'spline',
            servercharts: [],
            bitloads: []
        };
    }

    componentDidMount() {
        this.populateData();
    }

    async populateData() {
        // const response = await fetch('serverchartdata');
        // const data = await response.json();
        this.setState({servercharts: serverchartdata});

        // const response2 = await fetch('bitloaddata');
        // const data2 = await response2.json();
        this.setState({bitloads: bitloaddata});
    }

    render() {
        return (
            <div>
                <div>
                    <input type="file" onChange={this.onFileChange}/>
                    <Button text="Загрузить" onClick={this.onFileUpload}/>
                    {" "}
                    <Button text="Очистить" onClick={this.onDeleteData}/>
                </div>

                <React.Fragment>
                    <Chart
                        palette="Violet"
                        dataSource={this.state.servercharts}
                        title="Объем свободного места на диске"
                    >
                        <CommonSeriesSettings
                            argumentField="dateString"
                            type={this.state.type}
                        />
                        <CommonAxisSettings>
                            <Grid visible={true}/>
                        </CommonAxisSettings>
                        {
                            systems.map(function (item) {
                                return <Series key={item.value} valueField={item.value} name={item.name}/>;
                            })
                        }
                        <Margin bottom={20}/>
                        <ArgumentAxis
                            allowDecimals={false}
                            axisDivisionFactor={60}
                        >
                            <Label>
                                <Format type="decimal"/>
                            </Label>
                        </ArgumentAxis>
                        <Legend
                            verticalAlignment="top"
                            horizontalAlignment="right"
                        />
                        <Export enabled={true}/>
                        <Tooltip enabled={true}/>
                    </Chart>
                </React.Fragment>

                <React.Fragment>
                    <Chart
                        palette="Violet"
                        dataSource={this.state.bitloads}
                        title="Нагрузка на долото"
                    >
                        <CommonSeriesSettings
                            argumentField="dateString"
                            type={this.state.type}
                        />
                        <CommonAxisSettings>
                            <Grid visible={true}/>
                        </CommonAxisSettings>
                        {
                            values.map(function (item) {
                                return <Series key={item.value} valueField={item.value} name={item.name}/>;
                            })
                        }
                        <Margin bottom={20}/>
                        <ArgumentAxis
                            allowDecimals={false}
                            axisDivisionFactor={60}
                        >
                            <Label>
                                <Format type="decimal"/>
                            </Label>
                        </ArgumentAxis>
                        <Legend
                            verticalAlignment="top"
                            horizontalAlignment="right"
                        />
                        <Export enabled={true}/>
                        <Tooltip enabled={true}/>
                    </Chart>
                </React.Fragment>
            </div>
        );
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
        // const response = await axios.post("serverchartdata", formData, {
        //     headers: {'Content-Type': 'multipart/form-data'}
        // });
        // const data = await response.data;
        this.setState({servercharts: serverchartdata, loading: false});
    }
}
