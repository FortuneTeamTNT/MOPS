import React, {Component} from 'react';
import axios from "axios";
import {TextArea} from "devextreme-react";

export class MlData extends Component {
    static displayName = MlData.name;

    constructor(props) {
        super(props);

        this.state = {
            param: 0,
            value: ''
        };

        this.handleChangeParam = this.handleChangeParam.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async calcValue() {
        const response = await axios.get('Ml/Test?bitLoad=' + this.state.param);
        const data = await response.data;
        this.setState({value: data});
        debugger;
    }

    handleChangeParam(event) {
        this.setState({param: event.target.value});
    }

    handleSubmit(event) {
        this.calcValue();
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h5>Прогнозирование</h5>
                <form onSubmit={this.handleSubmit}>
                    <label style={{minWidth: 19 + 'rem'}}>
                        Нагрузка на долото:{" "}
                    </label>
                    <input type="text" pattern="[+-]?\d+(?:[.,]\d+)?"
                           value={this.state.param}
                           onChange={this.handleChangeParam}/>
                    <br/>
                    <p/>
                    <input type="submit" className="btn btn-primary" value="Вычислить"/>
                    <br/>
                    <p/>
                    <p aria-live="polite">Результат:</p>
                    <TextArea
                        height={300}
                        width={1100}
                        value={this.state.value}/>
                </form>
            </div>
        );
    }
}
