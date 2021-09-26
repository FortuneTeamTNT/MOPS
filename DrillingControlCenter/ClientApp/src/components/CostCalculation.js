import React, {Component} from 'react';

export class CostCalculation extends Component {
    static displayName = CostCalculation.name;

    constructor(props) {
        super(props);

        this.state = {
            param1: '',
            param2: '',
            param3: '',
            param4: '',
            param5: '',
            param6: '',
            param7: '',
            value: ''
        };

        this.handleChangeParam1 = this.handleChangeParam1.bind(this);
        this.handleChangeParam2 = this.handleChangeParam2.bind(this);
        this.handleChangeParam3 = this.handleChangeParam3.bind(this);
        this.handleChangeParam4 = this.handleChangeParam4.bind(this);
        this.handleChangeParam5 = this.handleChangeParam5.bind(this);
        this.handleChangeParam6 = this.handleChangeParam6.bind(this);
        this.handleChangeParam7 = this.handleChangeParam7.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.calcValue();
    }

    async calcValue() {
        this.setState({
            value: ''
        });
    }

    handleChangeParam1(event) {
        this.setState({param1: event.target.value});
    }

    handleChangeParam2(event) {
        this.setState({param2: event.target.value});
    }

    handleChangeParam3(event) {
        this.setState({param3: event.target.value});
    }

    handleChangeParam4(event) {
        this.setState({param4: event.target.value});
    }

    handleChangeParam5(event) {
        this.setState({param5: event.target.value});
    }

    handleChangeParam6(event) {
        this.setState({param6: event.target.value});
    }

    handleChangeParam7(event) {
        this.setState({param7: event.target.value});
    }

    handleSubmit(event) {
        this.setState({
            value: ''
        })
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h5>Расчет стоимости скважин</h5>
                <form onSubmit={this.handleSubmit}>
                    <label style={{minWidth: 19 + 'rem'}}>
                        Нагрузка на долото:{" "}
                    </label>
                    <input type="text" pattern="[+-]?\d+(?:[.,]\d+)?"
                           value={this.state.param1}
                           onChange={this.handleChangeParam1}/>
                    <br/>
                    <label style={{minWidth: 19 + 'rem'}}>
                        Твердость грунта:{" "}
                    </label>
                    <input type="text" pattern="[+-]?\d+(?:[.,]\d+)?"
                           value={this.state.param2}
                           onChange={this.handleChangeParam2}/>
                    <br/>
                    <label style={{minWidth: 19 + 'rem'}}>
                        Скорость бурения:{" "}
                    </label>
                    <input type="text" pattern="[+-]?\d+(?:[.,]\d+)?"
                           value={this.state.param3}
                           onChange={this.handleChangeParam3}/>
                    <br/>
                    <label style={{minWidth: 19 + 'rem'}}>
                        Коэффициент износа долота:{" "}
                    </label>
                    <input type="text" pattern="[+-]?\d+(?:[.,]\d+)?"
                           value={this.state.param4}
                           onChange={this.handleChangeParam4}/>
                    <br/>
                    <label style={{minWidth: 19 + 'rem'}}>
                        Глубина проходки:{" "}
                    </label>
                    <input type="text" pattern="[+-]?\d+(?:[.,]\d+)?"
                           value={this.state.param5}
                           onChange={this.handleChangeParam5}/>
                    <br/>
                    <label style={{minWidth: 19 + 'rem'}}>
                        Глубина скважины к текущему времени:{" "}
                    </label>
                    <input type="text" pattern="[+-]?\d+(?:[.,]\d+)?"
                           value={this.state.param6}
                           onChange={this.handleChangeParam6}/>
                    <br/>
                    <label style={{minWidth: 19 + 'rem'}}>
                        Количество замен долота:{" "}
                    </label>
                    <input type="text" pattern="[+-]?\d+(?:[.,]\d+)?"
                           value={this.state.param7}
                           onChange={this.handleChangeParam7}/>
                    <br/>
                    <p/>
                    <input type="submit" className="btn btn-primary" value="Вычислить"/>
                    <br/>
                    <p/>
                    <p aria-live="polite">Стоимость скважины: <strong>{this.state.value}</strong></p>
                </form>
            </div>
        );
    }
}
