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
import {Tabs} from "devextreme-react";
import axios from "axios";

export const tabs = [{
    'id': 1,
    'text': 'ИТ-мониторинг'
}, {
    'id': 2,
    'text': "Мониторинг буровой"
}];

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
            servercharts: [],
            bitloads: []
        };
        this.onTabsSelectionChanged = this.onTabsSelectionChanged.bind(this);
    }

    componentDidMount() {
        this.populateData();
    }

    async populateData() {
        const response = await fetch('serverchartdata');
        const data = await response.json();
        this.setState({servercharts: data});

        const response2 = await fetch('bitloaddata');
        const data2 = await response2.json();
        this.setState({bitloads: data2});
    }

    render() {
        const {selectedIndex, servercharts, bitloads} = this.state;
        return (
            <div style={{maxWidth: 1100 + 'px'}}>
                <Tabs
                    dataSource={tabs}
                    selectedIndex={selectedIndex}
                    onOptionChanged={this.onTabsSelectionChanged}
                />
                <div style={selectedIndex === 0 ? {} : {visibility: 'hidden', height: 0 + 'rem'}}>
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
                <div style={selectedIndex === 1 ? {} : {visibility: 'hidden', height: 0 + 'rem'}}>
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
