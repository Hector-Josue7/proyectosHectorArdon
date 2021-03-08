import React, { Component } from 'react'

import Cuadrado from './Cuadrado';

export default class Tablero extends Component {
    renderCuadrado(i){
        return <Cuadrado value={this.props.cuadrados[i]}
        onClick={ ()=> this.props.onClick(i)}
        
        />
    }
   
    render() {
        return (
            <div>
                 <div className="border-row">
                    {this.renderCuadrado(0)}
                    {this.renderCuadrado(1)}
                    {this.renderCuadrado(2)}
                 </div>
                 <div className="border-row">
                    {this.renderCuadrado(3)}
                    {this.renderCuadrado(4)}
                    {this.renderCuadrado(5)}
                 </div>
                 <div className="border-row">
                    {this.renderCuadrado(6)}
                    {this.renderCuadrado(7)}
                    {this.renderCuadrado(8)}
                 </div>
            </div>
        )
    }
}
