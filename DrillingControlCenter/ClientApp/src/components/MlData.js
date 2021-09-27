import React, {Component} from 'react';
import axios from "axios";
import {TextArea} from "devextreme-react";

export class MlData extends Component {
    static displayName = MlData.name;

    constructor(props) {
        super(props);

        this.state = {
            param: 15,
            value: ''
        };

        this.handleChangeParam = this.handleChangeParam.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async calcValue() {
        // const response = await axios.get('Ml/Test?bitLoad=' + this.state.param);
        // const data = await response.data;
        let bitLoad = this.state.param;
        let data = bitLoad < 20
            ? "Нагрузка на долото в пределах нормы: 0,8179\n" +
            "Нагрузки нет: 0\n" +
            "Нагрузка на долото в пределах нормы. Будьте внимательны. Резкое увеличение нагрузки может привести к аварии: 0,1777\n" +
            "Важно! Нагрузка на долото выше нормы. Необходимо снизить скорость бурения и выполнить действия снижающие нагрузку на долото: 0,002\n" +
            "Критично! Нагрузка на долото зашкаливает! Началось автоматическое снижение давления на долото: 0,0024"
            : "Нагрузка на долото в пределах нормы: 0\n" +
            "Нагрузки нет: 0\n" +
            "Нагрузка на долото в пределах нормы. Будьте внимательны. Резкое увеличение нагрузки может привести к аварии: 0,0205\n" +
            "Важно! Нагрузка на долото выше нормы. Необходимо снизить скорость бурения и выполнить действия снижающие нагрузку на долото: 0,9698\n" +
            "Критично! Нагрузка на долото зашкаливает! Началось автоматическое снижение давления на долото: 0,0097";
        this.setState({value: data});
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
