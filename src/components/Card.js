import React from 'react';
import defaultImage from '../img/defaultImage.jpg';


class Card extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = () => {
   this.props.onClick(this.props.id)
  };

  render() {

    return (
      //al hacer clic en el elemento se dispara el método handleClick
      <div className="card m-1" onClick={this.handleClick}>
        {this.props.showImage ? (//Se comprueba el estado showImage para mostrar la imagen correspondiente
          <img src={this.props.img} alt={`card-${this.props.id}`} />//Si el estado showImage es verdadero se muestra la imagen que se recibio como parámetro
        ) : (
          <img src={defaultImage} alt="reverseCard" />//Si el estado showImage es falso se muestra la imagen por defecto
        )}
      </div>
    );
  }
}

export default Card;
