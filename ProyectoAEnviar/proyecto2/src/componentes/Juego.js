
//import { unstable_concurrentAct } from 'react-dom/test-utils';
import React, {Component} from 'react';
import Tablero from './Tablero';

export default class Juego extends Component {
    constructor(props){
        super(props);
        this.state ={
            x_es_el_siguiente: true,
            numero_paso:0,
            historia: [
                {cuadrados: Array(9).fill(null)}
            ]
        }
    }
   saltarA(salto){
    this.setState({
        numero_paso: salto,
        x_es_el_siguiente: (salto%2) ===0
    })
   }

    manipularClick(i){
        const historia = this.state.historia.slice(0,this.state.numero_paso+1);
        const actual = historia[historia.length-1];
        const cuadrados = actual.cuadrados.slice();
        const ganador = calcularGanador(cuadrados);
        if(ganador || cuadrados[i] ){
            return;
        }

        cuadrados[i] = this.state.x_es_el_siguiente?'X':'O';
        this.setState({
            historia:historia.concat({
                cuadrados: cuadrados
            }),
            x_es_el_siguiente: !this.state.x_es_el_siguiente,
            numero_paso: historia.length

        });
    }
   
    render() {
        const historia = this.state.historia;
        const actual = historia[this.state.numero_paso]; 
        const ganador = calcularGanador(actual.cuadrados);
        const movimientos = historia.map( (salto, movimiento) =>{
            const desc = movimiento? 'Ir al #'+ movimiento: 'Iniciar el juego';
            return (
                <li key ={movimiento}>
                    <button onClick={ () =>{this.saltarA(movimiento)}}> 
                       {desc}
                    </button>
                </li>
            )
        });
        let estado;
        if(ganador){
         estado = 'Ganador es ' + ganador;
        }else{
            estado = 'Siguiente jugador es '+ (this.state.x_es_el_siguiente?'X':'O');
        }


        return (
            <div className="juego">
                <div className ="juego-tablero">
                   <Tablero onClick={(i) =>this.manipularClick(i)}
                   cuadrados={actual.cuadrados} />
                </div>
                <div className="info-juego">
                   <div>{estado}</div>
                   <ul>{movimientos}</ul>

                </div>
            </div>
        )
    }
}

function calcularGanador(cuadrados){
    const lineas = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    for(let i=0; i<lineas.length;i++){
        const [a,b,c] = lineas[i];
        if(cuadrados[a] && cuadrados[a] === cuadrados[b] && cuadrados[b] === cuadrados[c]){
            return cuadrados[a];
        }
    }
    
    return null;
}