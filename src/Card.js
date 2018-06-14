import React, { Component } from 'react'

class Card extends Component {
  
  render() {
    let c = `card ${this.props.className}`
    return (
      <div 
        className={c}
        style={{backgroundColor:this.props.color}}  
        onClick={() => this.props.fnClickOnCard(this.props.index)}
      />
    )
  }
}

export default Card