import React, {Component} from 'react';
import DataGrid, {Column, HeaderFilter, Pager, Paging, Scrolling} from "devextreme-react/data-grid";

export class Directory extends Component {
    static displayName = Directory.name;

    render() {
        return (
            <div>
                <h1>Справочные данные</h1>
                <h5>Параметры бурения</h5>
                <div>
                    <DataGrid
                        id='gridContainer'
                        dataSource={[
                            {
                                "name": "Нагрузка на долото",
                                "alert1": "от 0 до 15",
                                "alert2": "от 15 до 25",
                                "alert3": "от 25 до 35",
                                "alert4": "от 35 до 70"
                            },
                            {
                                "name": "Твердость грунта",
                                "alert1": "1",
                                "alert2": "2",
                                "alert3": "3",
                                "alert4": "3"
                            },
                            {
                                "name": "Скорость бурения",
                                "alert1": "15 м/c",
                                "alert2": "11 м/c",
                                "alert3": "7 м/c",
                                "alert4": "3 м/c"
                            },
                            {
                                "name": "Коэффициент износа долота",
                                "alert1": "1",
                                "alert2": "1,5",
                                "alert3": "2",
                                "alert4": "5"
                            }]}
                        keyExpr="name"
                        showBorders={true}
                    >
                        <HeaderFilter visible={true}/>
                        <Column caption="Наименование параметра" dataField="name"/>
                        <Column caption="Норм" dataField="alert1"/>
                        <Column caption="Норм" dataField="alert2"/>
                        <Column caption="Важно" dataField="alert3"/>
                        <Column caption="Критично" dataField="alert4"/>
                        <Scrolling rowRenderingMode='virtual'></Scrolling>
                        <Paging defaultPageSize={10}/>
                        <Pager
                            visible={false}
                            allowedPageSizes={true}
                            displayMode={'compact'}
                            showPageSizeSelector={true}
                            showInfo={true}
                            showNavigationButtons={true}/>
                    </DataGrid>
                </div>
                <br/>
                <h5>Параметры каналов связи</h5>
                <div>
                    <DataGrid
                        id='gridContainer2'
                        dataSource={[
                            {
                                "name": "Время отклика",
                                "alert1": "от 0 до 10",
                                "alert2": "от 10 до 25",
                                "alert3": "от 25 до 100"
                            }]}
                        keyExpr="name"
                        showBorders={true}
                    >
                        <HeaderFilter visible={true}/>
                        <Column caption="Наименование параметра" dataField="name"/>
                        <Column caption="Норм" dataField="alert1"/>
                        <Column caption="Важно" dataField="alert2"/>
                        <Column caption="Критично" dataField="alert3"/>
                        <Scrolling rowRenderingMode='virtual'></Scrolling>
                        <Paging defaultPageSize={10}/>
                        <Pager
                            visible={false}
                            allowedPageSizes={true}
                            displayMode={'compact'}
                            showPageSizeSelector={true}
                            showInfo={true}
                            showNavigationButtons={true}/>
                    </DataGrid>
                </div>
            </div>
        );
    }
}
