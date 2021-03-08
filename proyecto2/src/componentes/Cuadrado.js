import React from 'react'

export default function Cuadrado(props) {
    return (
       <button className ="cuadrado" onClick={props.onClick}>
         {props.value}
       </button>
    )
}
