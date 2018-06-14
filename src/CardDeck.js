import React, { Component } from 'react'
import Card from './Card'

class CardDeck extends Component {

  colors = ['red', 'blue', 'green', 'purple', 'pink']

  colorList = [...this.colors, ...this.colors]

  shuffle = function(a) {
    let b = [...a]
    for (let i = b.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [b[i], b[j]] = [b[j], b[i]];
    }
    return b;
  }

  state = {
    canClick: true,
    cardDeck: this.shuffle(this.colorList).map(c => {
      return {
        color: c,
        isObserve: false,
        isCorrect: false,
      }
    })
  }

  fnSuffleDeck = () => {
    this.setState({cardDeck: this.shuffle(this.state.cardDeck)})
  }
  
  fnIsFinished = () => {
    let result = this.state.cardDeck.reduce((sum, card) => {
      return sum + (card.isCorrect?1:0)
    }, 0)
    console.log(`f: ${result}`)
    return result===10?true:false
  }
  
  fnIsObserve2Card = () => {
    let result = this.state.cardDeck.reduce((sum, card) => {
      return sum + (card.isObserve?1:0)
    }, 0)
    console.log(`O: ${result}`)
    return result===2?true:false
  }
  
  fnIsCorrectObserve = () => {
    if(this.fnIsObserve2Card === false) {
       return false
    }
    
    let result = this.state.cardDeck.reduce((sum, card) => {
      if(card.isObserve) {
        sum.push(card.color)
      }
      return sum
    }, [])
    console.log(`C: ${result}`)
    return result[0]===result[1]?true:false
  }

  fnClickOnCard = (index) => {
    console.log(index)
    
    if(this.fnIsFinished()) {
      return
    }
      
    if(this.fnIsObserve2Card()) {
      return
    }
      
    let tempDeck = [...this.state.cardDeck]
    
    if(tempDeck[index].isObserve || tempDeck[index].isCorrect) {
      return
    }
    
    tempDeck[index]['isObserve'] = true
    this.setState({
      cardDeck: tempDeck
    }, console.log(this.state))
    
    if(this.fnIsFinished() || this.fnIsObserve2Card()) {
      this.setState({
        canClick: false
      })
    }
    
    if(this.fnIsCorrectObserve()) {
      let tempNoObserveDeck = this.state.cardDeck.map(card => {
        if(card.isObserve || card.isCorrect) {
          return {
            color: card.color,
            isObserve: false,
            isCorrect: true,
          }
          
        } else {
          return {
            color: card.color,
            isObserve: false,
            isCorrect: false,
          }
        }
      })
                    
      this.setState((prevState, props) => ({
        canClick: true,
        cardDeck: tempNoObserveDeck
      }))
      
      return
    }
    
    if(this.fnIsObserve2Card()) {
      setTimeout(() => {
        let tempNoObserveDeck = this.state.cardDeck.map(card => {
          return {
            color: card.color,
            isObserve: false,
            isCorrect: card.isCorrect,
          }
        })
        
        this.setState({
          canClick: true,
          cardDeck: tempNoObserveDeck
        })
        
      }, 1000)
    } 
  }
  
  fnNewGame = () => {
    this.setState({
      canClick: true,
      cardDeck: this.shuffle(this.colorList).map(c => {
        return {
          color: c,
          isObserve: false,
          isCorrect: false,
        }
      })
    })
  }
  
  render() {
    return (
      <div onLoad={this.fnSuffleDeck}>
      
        {this.state.cardDeck.map((item,index) => (
          <Card 
            key={index}
            color={item.isObserve||item.isCorrect?item.color:'grey'}
            index={index}
            fnClickOnCard={this.fnClickOnCard}
            className={this.state.canClick&&(!item.isObserve)&&(!item.isCorrect)?'can-click':'cannot-click'}
          />
        ))}
        
        <div style={{clear:'both'}}>
          <button type="button" onClick={this.fnNewGame}>new game</button>
        </div>
      
      </div>
    )
  }
}

export default CardDeck