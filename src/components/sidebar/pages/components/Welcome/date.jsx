import React from 'react';

export class DataHoje extends React.Component {
    constructor() {
        super();

        function formatDate(val){
            if(val < 10){
                return '0';
            }else{
                return '';
            }
        }

        var today = new Date(),
            date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();       

        this.state = {
            date: date
        };
    }

    render() {
        return (
            <h1 style={{color: "#cacaca", fontSize: 20, fontWeight: 500}}>{this.state.date}</h1>
        );
    }
}