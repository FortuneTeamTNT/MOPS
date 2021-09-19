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
            newClientApplicationCrashRate: 0.01,
            newDatabaseOverflowRate: 0.01,
            newCommunicationChannelFailureRate: 0.01,
            newMailServerFailureRate: 0.01,
            newOwaFailureRate: 0.01,
            newFileServerFailureRate: 0.01,
            newClientApplicationCrashRateAmount: 1000000,
            newDatabaseOverflowRateAmount: 25000,
            newCommunicationChannelFailureRateAmount: 1500000,
            newMailServerFailureRateAmount: 700000,
            newOwaFailureRateAmount: 15000,
            newFileServerFailureRateAmount: 12500,
            value: '',
            newValue: ''
        };

        this.handleChangeClientApplicationCrashRate = this.handleChangeClientApplicationCrashRate.bind(this);
        this.handleChangeDatabaseOverflowRate = this.handleChangeDatabaseOverflowRate.bind(this);
        this.handleChangeCommunicationChannelFailureRate = this.handleChangeCommunicationChannelFailureRate.bind(this);
        this.handleChangeMailServerFailureRate = this.handleChangeMailServerFailureRate.bind(this);
        this.handleChangeOwaFailureRate = this.handleChangeOwaFailureRate.bind(this);
        this.handleChangeFileServerFailureRate = this.handleChangeFileServerFailureRate.bind(this);
        this.handleChangeNewClientApplicationCrashRate = this.handleChangeNewClientApplicationCrashRate.bind(this);
        this.handleChangeNewDatabaseOverflowRate = this.handleChangeNewDatabaseOverflowRate.bind(this);
        this.handleChangeNewCommunicationChannelFailureRate = this.handleChangeNewCommunicationChannelFailureRate.bind(this);
        this.handleChangeNewMailServerFailureRate = this.handleChangeNewMailServerFailureRate.bind(this);
        this.handleChangeNewOwaFailureRate = this.handleChangeNewOwaFailureRate.bind(this);
        this.handleChangeNewFileServerFailureRate = this.handleChangeNewFileServerFailureRate.bind(this);
        this.handleChangeNewClientApplicationCrashRateAmount = this.handleChangeNewClientApplicationCrashRateAmount.bind(this);
        this.handleChangeNewDatabaseOverflowRateAmount = this.handleChangeNewDatabaseOverflowRateAmount.bind(this);
        this.handleChangeNewCommunicationChannelFailureRateAmount = this.handleChangeNewCommunicationChannelFailureRateAmount.bind(this);
        this.handleChangeNewMailServerFailureRateAmount = this.handleChangeNewMailServerFailureRateAmount.bind(this);
        this.handleChangeNewOwaFailureRateAmount = this.handleChangeNewOwaFailureRateAmount.bind(this);
        this.handleChangeNewFileServerFailureRateAmount = this.handleChangeNewFileServerFailureRateAmount.bind(this);

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
                    * (1 - this.state.fileServerFailureRate))).toFixed(2),
            newValue: Number(1 -
                ((1 - this.state.newClientApplicationCrashRate)
                    * (1 - this.state.newDatabaseOverflowRate)
                    * (1 - this.state.newCommunicationChannelFailureRate)
                    * (1 - this.state.newMailServerFailureRate)
                    * (1 - this.state.newOwaFailureRate)
                    * (1 - this.state.newFileServerFailureRate))).toFixed(2)
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

    handleChangeNewClientApplicationCrashRate(event) {
        if (rx_live.test(event.target.value)) {
            this.setState({newClientApplicationCrashRate: event.target.value});
        }
    }

    handleChangeNewDatabaseOverflowRate(event) {
        if (rx_live.test(event.target.value)) {
            this.setState({newDatabaseOverflowRate: event.target.value});
        }
    }

    handleChangeNewCommunicationChannelFailureRate(event) {
        if (rx_live.test(event.target.value)) {
            this.setState({newCommunicationChannelFailureRate: event.target.value});
        }
    }

    handleChangeNewMailServerFailureRate(event) {
        if (rx_live.test(event.target.value)) {
            this.setState({newMailServerFailureRate: event.target.value});
        }
    }

    handleChangeNewOwaFailureRate(event) {
        if (rx_live.test(event.target.value)) {
            this.setState({newOwaFailureRate: event.target.value});
        }
    }

    handleChangeNewFileServerFailureRate(event) {
        if (rx_live.test(event.target.value)) {
            this.setState({newFileServerFailureRate: event.target.value});
        }
    }

    handleChangeNewClientApplicationCrashRateAmount(event) {
        if (rx_live.test(event.target.value)) {
            this.setState({newClientApplicationCrashRateAmount: event.target.value});
        }
    }

    handleChangeNewDatabaseOverflowRateAmount(event) {
        if (rx_live.test(event.target.value)) {
            this.setState({newDatabaseOverflowRateAmount: event.target.value});
        }
    }

    handleChangeNewCommunicationChannelFailureRateAmount(event) {
        if (rx_live.test(event.target.value)) {
            this.setState({newCommunicationChannelFailureRateAmount: event.target.value});
        }
    }

    handleChangeNewMailServerFailureRateAmount(event) {
        if (rx_live.test(event.target.value)) {
            this.setState({newMailServerFailureRateAmount: event.target.value});
        }
    }

    handleChangeNewOwaFailureRateAmount(event) {
        if (rx_live.test(event.target.value)) {
            this.setState({newOwaFailureRateAmount: event.target.value});
        }
    }

    handleChangeNewFileServerFailureRateAmount(event) {
        if (rx_live.test(event.target.value)) {
            this.setState({newFileServerFailureRateAmount: event.target.value});
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
                    * (1 - this.state.fileServerFailureRate))).toFixed(2),
            newValue: Number(1 -
                ((1 - this.state.newClientApplicationCrashRate)
                    * (1 - this.state.newDatabaseOverflowRate)
                    * (1 - this.state.newCommunicationChannelFailureRate)
                    * (1 - this.state.newMailServerFailureRate)
                    * (1 - this.state.newOwaFailureRate)
                    * (1 - this.state.newFileServerFailureRate))).toFixed(2)
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
                    <label style={{minWidth: 19 + 'rem', fontSize: 16 + 'px'}}>
                        <strong>Рекомендации:</strong>
                    </label>
                    <label style={{fontSize: 16 + 'px'}}>
                        <strong>Вероятность отказов</strong>
                    </label>
                    <label style={{marginLeft: 2.5 + 'rem', fontSize: 16 + 'px'}}>
                        <strong>Стоимость, руб.</strong>
                    </label>
                    <br/>
                    <label style={{minWidth: 19 + 'rem'}}>
                        Добавить резервный сервер:{" "}
                    </label>
                    <input type="text" pattern="[+-]?\d+(?:[.,]\d+)?"
                           value={this.state.newClientApplicationCrashRate}
                           onChange={this.handleChangeNewClientApplicationCrashRate}/>
                    <input type="text" pattern="[+-]?\d+(?:[.,]\d+)?"
                           style={{marginLeft: 3 + 'rem'}}
                           value={this.state.newClientApplicationCrashRateAmount}
                           onChange={this.handleChangeNewClientApplicationCrashRateAmount}/>
                    <br/>
                    <label style={{minWidth: 19 + 'rem'}}>
                        Добавить 10 Тб места в базе данных:{" "}
                    </label>
                    <input type="text" pattern="[+-]?\d+(?:[.,]\d+)?"
                           value={this.state.newDatabaseOverflowRate}
                           onChange={this.handleChangeNewDatabaseOverflowRate}/>
                    <input type="text" pattern="[+-]?\d+(?:[.,]\d+)?"
                           style={{marginLeft: 3 + 'rem'}}
                           value={this.state.newDatabaseOverflowRateAmount}
                           onChange={this.handleChangeNewDatabaseOverflowRateAmount}/>
                    <br/>
                    <label style={{minWidth: 19 + 'rem'}}>
                        Выделить резервный канал связи:{" "}
                    </label>
                    <input type="text" pattern="[+-]?\d+(?:[.,]\d+)?"
                           value={this.state.newCommunicationChannelFailureRate}
                           onChange={this.handleChangeNewCommunicationChannelFailureRate}/>
                    <input type="text" pattern="[+-]?\d+(?:[.,]\d+)?"
                           style={{marginLeft: 3 + 'rem'}}
                           value={this.state.newCommunicationChannelFailureRateAmount}
                           onChange={this.handleChangeNewCommunicationChannelFailureRateAmount}/>
                    <br/>
                    <label style={{minWidth: 19 + 'rem'}}>
                        Добавить дополнительый почтовый сервер:{" "}
                    </label>
                    <input type="text" pattern="[+-]?\d+(?:[.,]\d+)?"
                           value={this.state.newMailServerFailureRate}
                           onChange={this.handleChangeNewMailServerFailureRate}/>
                    <input type="text" pattern="[+-]?\d+(?:[.,]\d+)?"
                           style={{marginLeft: 3 + 'rem'}}
                           value={this.state.newMailServerFailureRateAmount}
                           onChange={this.handleChangeNewMailServerFailureRateAmount}/>
                    <br/>
                    <label style={{minWidth: 19 + 'rem'}}>
                        Обновить web-клиент OWA:{" "}
                    </label>
                    <input type="text" pattern="[+-]?\d+(?:[.,]\d+)?"
                           value={this.state.newOwaFailureRate}
                           onChange={this.handleChangeNewOwaFailureRate}/>
                    <input type="text" pattern="[+-]?\d+(?:[.,]\d+)?"
                           style={{marginLeft: 3 + 'rem'}}
                           value={this.state.newOwaFailureRateAmount}
                           onChange={this.handleChangeNewOwaFailureRateAmount}/>
                    <br/>
                    <label style={{minWidth: 19 + 'rem'}}>
                        Добавить 5 Тб места на файловом сервере:{" "}
                    </label>
                    <input type="text" pattern="[+-]?\d+(?:[.,]\d+)?"
                           value={this.state.newFileServerFailureRate}
                           onChange={this.handleChangeNewFileServerFailureRate}/>
                    <input type="text" pattern="[+-]?\d+(?:[.,]\d+)?"
                           style={{marginLeft: 3 + 'rem'}}
                           value={this.state.newFileServerFailureRateAmount}
                           onChange={this.handleChangeNewFileServerFailureRateAmount}/>
                    <br/>
                    <p/>
                    <p aria-live="polite" style={{color: "green"}}><strong>Вероятность отказов с учётом выполненных
                        мероприятий: {this.state.newValue}</strong></p>
                </form>
            </div>
        );
    }
}
