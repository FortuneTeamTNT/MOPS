import React from 'react';

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
import {Tabs, TextArea} from "devextreme-react";
import axios from "axios";

export const tabs = [{
    'id': 1,
    'text': 'ИТ-мониторинг'
}, {
    'id': 2,
    'text': "Мониторинг буровой"
}];

export const responseTimes = [
    {value: 'responseTime', name: 'Время отклика сетевого устройства'},
];

export const systems = [
    {value: 'freeDiskSpace1', name: 'Petrel'},
    {value: 'freeDiskSpace2', name: 'Геонафт'},
    {value: 'freeDiskSpace3', name: 'Вспомогательные сервисы'}
];

export const values = [
    {value: 'bitLoad', name: 'Нагрузка на долото'}
];

export class Monitoring extends React.Component {
    static displayName = Monitoring.name;

    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
            type: 'spline',
            channels: [],
            servercharts: [],
            bitloads: [],
            channelRecs: "",
            bitloadRecs: ""
        };
        this.onTabsSelectionChanged = this.onTabsSelectionChanged.bind(this);
    }

    componentDidMount() {
        this.populateData();
    }

    async populateData() {
        const response = await fetch('channeldata');
        const data = await response.json();
        this.setState({channels: data});

        let channelRecs = "";
        const channelRecsArray = data.filter(d => d.alert !== 0);
        channelRecsArray.forEach(d => channelRecs += d.dateString + ": " + d.recommendation + "\n\n");
        this.setState({channelRecs: channelRecs});

        const response2 = await fetch('serverchartdata');
        const data2 = await response2.json();
        this.setState({servercharts: data2});

        const response3 = await fetch('bitloaddata');
        const data3 = await response3.json();
        this.setState({bitloads: data3});

        let bitloadRecs = "";
        const bitloadRecsArray = data3.filter(d => d.alert !== 0);
        bitloadRecsArray.forEach(d => bitloadRecs += d.dateString + ": " + d.recommendation + "\n\n");
        this.setState({bitloadRecs: bitloadRecs});
    }

    render() {
        const {selectedIndex, channels, servercharts, bitloads, channelRecs, bitloadRecs} = this.state;
        return (
            <div>
                <Tabs
                    dataSource={tabs}
                    selectedIndex={selectedIndex}
                    onOptionChanged={this.onTabsSelectionChanged}
                />
                <div className={'row'} style={selectedIndex === 0 ? {} : {visibility: 'hidden', height: 0 + 'rem'}}>
                    <div className={'col-sm-10'}>
                        <React.Fragment>
                            <Chart
                                palette="Violet"
                                dataSource={channels}
                                title="Состояние каналов связи"
                            >
                                <CommonSeriesSettings
                                    argumentField="dateString"
                                    type={this.state.type}
                                />
                                <CommonAxisSettings>
                                    <Grid visible={true}/>
                                </CommonAxisSettings>
                                {
                                    responseTimes.map(function (item) {
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
                                dataSource={servercharts}
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
                    </div>
                    <div className={'col-sm-2'}>
                        <h1 style={{fontSize: 28 + 'px'}}>Предупреждения</h1>
                        <TextArea
                            height={700}
                            width={450}
                        value={channelRecs}/>
                    </div>
                </div>
                <div className={'row'} style={selectedIndex === 1 ? {} : {visibility: 'hidden', height: 0 + 'rem'}}>
                    <div className={'col-sm-10'}>
                        <React.Fragment>
                            <Chart
                                palette="Violet"
                                dataSource={bitloads}
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
                    <div className={'col-sm-2'}>
                        <h1 style={{fontSize: 28 + 'px'}}>Предупреждения</h1>
                        <TextArea
                            height={700}
                            width={450}
                            value={bitloadRecs}/>
                    </div>
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
        const response = await axios.post("serverchartdata", formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        });
        const data = await response.data;
        this.setState({servercharts: data, loading: false});
    }
}
