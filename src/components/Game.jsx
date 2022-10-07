import React, { Component } from 'react'
import Cards from './common/card'

import front1 from './img/front1.png'
import front2 from './img/front2.png'
import front3 from './img/front3.png'
import front4 from './img/front4.png'
import front5 from './img/front5.png'
import front6 from './img/front6.png'
import front7 from './img/front7.png'
import front8 from './img/front8.png'
import WinPanel from './winPanel'

export class Game extends Component {
    state = {
        Cards : [
            {id : 1 , type : "a" , img:front1},
            {id : 2 , type : "b" , img:front2},
            {id : 3 , type : "c" , img:front3},
            {id : 4 , type : "d" , img:front4},
            {id : 5 , type : "e" , img:front5},
            {id : 6 , type : "f" , img:front6},
            {id : 7 , type : "g" , img:front7},
            {id : 8 , type : "h" , img:front8},
            {id : 9 , type : "h" , img:front8},
            {id : 10 , type : "a" , img:front1},
            {id : 11 , type : "b" , img:front2},
            {id : 12 , type : "c" , img:front3},
            {id : 13 , type : "d" , img:front4},
            {id : 14 , type : "e" , img:front5},
            {id : 15 , type : "f" , img:front6},
            {id : 16 , type : "g" , img:front7}
        ],
        clicker: 0,
        one: null,
        two: null,
        oneId: null,
        twoId: null,
        enable : false,
        restart: false,
        win: 0,
        flips: 0,
        start: true
    }
    handleClick = (item, type) => {
        this.rotate(item);
        if (this.state.clicker === 0) 
            this.next(item, type)
        else 
            this.check(item, type)
    }
    next = (item, type) => {
        this.setState({clicker : 1});
        const one = type;
        this.setState({one})
        const oneId = item;
        this.setState({oneId})
    }
    check = (item, type) => {
        this.setState({clicker : 0});
        const two = type;
        this.setState({two})
        const twoId = item;
        this.setState({twoId})
        this.setState({enable : true})
        this.handleWin(type, twoId);
        this.setState({flips: this.state.flips + 1})
    }
    handleWin = (two, twoId) => {
        this.setState({enable : true})
        const { one, oneId } = this.state;
        setTimeout(() => {
            this.setState({enable : false})
            if (one === two) {
            this.setState({win : this.state.win + 1})
            
        }
        else {
            console.log("lose")
            this.unRotate(oneId)
            this.unRotate(twoId)
        }
        }, 1000);
        
    }
    
    rotate = (item) => {
        document.getElementById(`back${item}`).style.transform= "rotateY(0deg)";
        document.getElementById(`front${item}`).style.transform= "rotateY(180deg)";
    }
    unRotate = (item) => {
        document.getElementById(`back${item}`).style.transform= "rotateY(-180deg)";
        document.getElementById(`front${item}`).style.transform= "rotateY(0deg)";
    }
    componentDidMount() {
        this.shuffle();
    }
    shuffle = () => {
        const list = this.state.Cards
        let Cards = list.sort(() => Math.random() - 0.5)
        this.setState(Cards)
    }
    handleRestart = () => {
        this.shuffle();
        this.setState({ restart: true,
                        clicker: 0,
                        one: null,
                        two: null,
                        oneId: null,
                        twoId: null,
                        enable : false,
                        win:0,
                        flips: 0
        })
        
        setTimeout(() => {
            this.setState({restart: false})
        }, 1000);
    }
    render() {
        return (
            <div className="game">
                <WinPanel show={this.state.win} flip={this.state.flips} restart={this.handleRestart} />
                <h1>Memory Card Game</h1>
                <div className="cardss">
                    {this.state.Cards.map(card=>
                        <Cards 
                            key={card.id} 
                            id={card.id} 
                            onClick={this.handleClick} 
                            type={card.type}
                            enable={this.state.enable}
                            img={card.img}
                            restart={this.state.restart}
                            start={this.state.start}
                        /> 
                    )}
                </div>
                <div className="new">
                    <button onClick={this.handleRestart} className="restart">
                        New game
                    </button>
                    <div className="under-line"></div>
                </div>
            </div>
        )
    }
}

export default Game


// work with the winPanel
// restart button