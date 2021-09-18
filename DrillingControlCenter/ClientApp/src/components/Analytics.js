import React, {Component} from 'react';

const rx_live = /^[+-]?\d*(?:[.,]\d*)?$/;

export class Analytics extends Component {
    static displayName = Analytics.name;

    constructor(props) {
        super(props);

        this.state = {
            clientApplicationCrashRate: 0.02,
            databaseOverflowRate: 0.03,
            communicationChannelFailureRate: 0.04,
            mailServerFailureRate: 0.01,
            owaFailureRate: 0.03,
            fileServerFailureRate: 0.03,
            value: ''
        };

        this.handleChangeClientApplicationCrashRate = this.handleChangeClientApplicationCrashRate.bind(this);
        this.handleChangeDatabaseOverflowRate = this.handleChangeDatabaseOverflowRate.bind(this);
        this.handleChangeCommunicationChannelFailureRate = this.handleChangeCommunicationChannelFailureRate.bind(this);
        this.handleChangeMailServerFailureRate = this.handleChangeMailServerFailureRate.bind(this);
        this.handleChangeOwaFailureRate = this.handleChangeOwaFailureRate.bind(this);
        this.handleChangeFileServerFailureRate = this.handleChangeFileServerFailureRate.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.calcProbabilityOfFailures();
    }

    async calcProbabilityOfFailures() {
        this.setState({
            value: Number(1 -
                ((1 - this.state.clientApplicationCrashRate)
                    * (1 - this.state.databaseOverflowRate)
                    * (1 - this.state.communicationChannelFailureRate)
                    * (1 - this.state.mailServerFailureRate)
                    * (1 - this.state.owaFailureRate)
                    * (1 - this.state.fileServerFailureRate))).toFixed(2)
        });
    }

    handleChangeClientApplicationCrashRate(event) {
        if (rx_live.test(event.target.value)) {
            this.setState({clientApplicationCrashRate: event.target.value});
        }
    }

    handleChangeDatabaseOverflowRate(event) {
        if (rx_live.test(event.target.value)) {
            this.setState({databaseOverflowRate: event.target.value});
        }
    }

    handleChangeCommunicationChannelFailureRate(event) {
        if (rx_live.test(event.target.value)) {
            this.setState({communicationChannelFailureRate: event.target.value});
        }
    }

    handleChangeMailServerFailureRate(event) {
        if (rx_live.test(event.target.value)) {
            this.setState({mailServerFailureRate: event.target.value});
        }
    }

    handleChangeOwaFailureRate(event) {
        if (rx_live.test(event.target.value)) {
            this.setState({owaFailureRate: event.target.value});
        }
    }

    handleChangeFileServerFailureRate(event) {
        if (rx_live.test(event.target.value)) {
            this.setState({fileServerFailureRate: event.target.value});
        }
    }

    handleSubmit(event) {
        this.setState({
            value: Number(1 -
                ((1 - this.state.clientApplicationCrashRate)
                    * (1 - this.state.databaseOverflowRate)
                    * (1 - this.state.communicationChannelFailureRate)
                    * (1 - this.state.mailServerFailureRate)
                    * (1 - this.state.owaFailureRate)
                    * (1 - this.state.fileServerFailureRate))).toFixed(2)
        })
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h5>Вероятность отказов</h5>
                <form onSubmit={this.handleSubmit}>
                    <label style={{minWidth: 19 + 'rem'}}>
                        Частота сбоя клиентского приложения:{" "}
                    </label>
                    <input type="text" pattern="[+-]?\d+(?:[.,]\d+)?"
                           value={this.state.clientApplicationCrashRate}
                           onChange={this.handleChangeClientApplicationCrashRate}/>
                    <br/>
                    <label style={{minWidth: 19 + 'rem'}}>
                        Частота переполнения баз данных:{" "}
                    </label>
                    <input type="text" pattern="[+-]?\d+(?:[.,]\d+)?"
                           value={this.state.databaseOverflowRate}
                           onChange={this.handleChangeDatabaseOverflowRate}/>
                    <br/>
                    <label style={{minWidth: 19 + 'rem'}}>
                        Частота сбоя канала связи:{" "}
                    </label>
                    <input type="text" pattern="[+-]?\d+(?:[.,]\d+)?"
                           value={this.state.communicationChannelFailureRate}
                           onChange={this.handleChangeCommunicationChannelFailureRate}/>
                    <br/>
                    <label style={{minWidth: 19 + 'rem'}}>
                        Частота сбоя почтового сервера:{" "}
                    </label>
                    <input type="text" pattern="[+-]?\d+(?:[.,]\d+)?"
                           value={this.state.mailServerFailureRate}
                           onChange={this.handleChangeMailServerFailureRate}/>
                    <br/>
                    <label style={{minWidth: 19 + 'rem'}}>
                        Частота отказа OWA:{" "}
                    </label>
                    <input type="text" pattern="[+-]?\d+(?:[.,]\d+)?"
                           value={this.state.owaFailureRate}
                           onChange={this.handleChangeOwaFailureRate}/>
                    <br/>
                    <label style={{minWidth: 19 + 'rem'}}>
                        Частота сбоя файлового сервера:{" "}
                    </label>
                    <input type="text" pattern="[+-]?\d+(?:[.,]\d+)?"
                           value={this.state.fileServerFailureRate}
                           onChange={this.handleChangeFileServerFailureRate}/>
                    <br/>
                    <p/>
                    <input type="submit" className="btn btn-primary" value="Вычислить"/>
                    <br/>
                    <p/>
                    <p aria-live="polite">Вероятность отказов: <strong>{this.state.value}</strong></p>
                </form>
            </div>
        );
    }
}
