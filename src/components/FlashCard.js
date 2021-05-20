import React,  { Component } from 'react';

class FlashCard extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isFront: true,
        front: this.props.front,
        back: this.props.back,
      };
    }
  
    getCard = () => {
      if (this.state.isFront) {
        return this.state.front;
      } else {
        return this.state.back;
      }
    };
  
    flipCard = () => {
      this.setState({
        isFront: !this.state.isFront,
      });
    };
  
    render() {
      const contents = this.getCard();
      return (
        <div className="FlashCard" onClick={(e) => this.flipCard(e)}>
          {contents}
        </div>
      );
    }
  }

export default FlashCard;