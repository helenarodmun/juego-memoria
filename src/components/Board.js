import React from "react";
import Card from "./Card";
import carta1 from "../img/carta1.jpg";
import carta2 from "../img/carta2.jpg";
import carta3 from "../img/carta3.jpg";
import carta4 from "../img/carta4.jpg";
import carta5 from "../img/carta5.jpg";
import carta6 from "../img/carta6.jpg";

class Board extends React.Component {
  cardsImages = [carta1, carta2, carta3, carta4, carta5, carta6];

  //estado inicial del tablero
  state = {
    cards: [],
    firstCard: null,
    secondCard: null,
  };

  constructor(props) {
    super(props);
    //objeto card que se utilizará para la creación de cada carta
    this.card = {
      id: "",
      img: "",
      showImage: false,
      matched: false,
    };
    this.handleClickCard = this.handleClickCard.bind(this);
    this.generateBoard();
  }

  // Función que maneja el clic en una carta
  handleClickCard(id) {
    // Se obtienen las variables "cards", "firstCard" y "secondCard" del estado actual
    const { cards, firstCard, secondCard } = this.state;

    // Si no hay ninguna carta mostrada
    if (firstCard === null) {
      // Se actualiza el estado de la carta clickeada a "mostrada"
      const updatedCards = cards.map((card) => {
        if (card.id === id) {
          return { ...card, showImage: true };
        } else {
          return card;
        }
      });
      // Se actualiza el estado de las cartas y se asigna la carta clickeada como la primera
      this.setState({ cards: updatedCards, firstCard: id });
      // Si ya hay una carta mostrada
    } else if (secondCard === null) {
      // Se actualiza el estado de la carta clickeada a "mostrada"
      const updatedCards = cards.map((card) => {
        if (card.id === id) {
          return { ...card, showImage: true };
        } else {
          return card;
        }
      });
      // Se actualiza el estado de las cartas y se asigna la carta clickeada como la segunda
      this.setState({ cards: updatedCards, secondCard: id }, () => {
        // Al terminar de actualizar el estado se verifica si las dos cartas coinciden
        setTimeout(() => {
          const { cards, firstCard, secondCard } = this.state;
          const firstCardObj = cards.find((card) => card.id === firstCard);
          const secondCardObj = cards.find((card) => card.id === secondCard);
          // Si las cartas coinciden, se actualiza su estado a "matched"
          if (firstCardObj.img === secondCardObj.img) {
            const updatedCards = cards.map((card) => {
              if (card.id === firstCard || card.id === secondCard) {
                return { ...card, matched: true };
              } else {
                return card;
              }
            });
            // Se actualiza el estado de las cartas y se resetean las variables de primera y segunda carta
            this.setState({
              cards: updatedCards,
              firstCard: null,
              secondCard: null,
            });
            // Si las cartas no coinciden, se ocultan
          } else {
            const updatedCards = cards.map((card) => {
              if (card.id === firstCard || card.id === secondCard) {
                return { ...card, showImage: false };
              } else {
                return card;
              }
            });
            // Se actualiza el estado de las cartas y se resetean las variables de primera y segunda carta
            this.setState({
              cards: updatedCards,
              firstCard: null,
              secondCard: null,
            });
          }
        }, 1000);
      });
    }
  }

  // algoritmo Fisher-Yates shuffle es un algoritmo de mezcla utilizado para desordenar arrays de forma aleatoria
  shuffleCards(array) {
    //Se itera sobre el array desde el último elemento hacia el primer elemento
    for (let i = array.length - 1; i > 0; i--) {
      //Se elige una posición aleatoria dentro del sub-array que queda por iterar (desde la posición actual hasta el primer elemento)
      const j = Math.floor(Math.random() * (i + 1));
      //Se intercambian las posiciones actual y la posición aleatoria elegida
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  generateBoard() {
    //desordena el array de imágenes
    this.cardsImages = this.shuffleCards(this.cardsImages);

    for (let i = 0; i < this.cardsImages.length; i++) {
      //crea una nueva carta usando el objeto card
      let newCard = { ...this.card };
      //define el id de la carta
      newCard.id = [i];
      //define la imagen de la carta
      newCard.img = this.cardsImages[i];
      //agrega la nueva carta al arreglo
      //newCard.showImage = true;
      this.state.cards.push(newCard);

      //crea una nueva carta duplicada
      let duplicateCard = { ...newCard };
      duplicateCard.id = [i];
      //agrega la nueva carta duplicada al arreglo
      this.state.cards.push(duplicateCard);
    }
    //actualiza el estado del tablero con el array de cartas desordenado
    this.setState({
      cards: this.shuffleCards(this.state.cards),
    });
    console.log(this.state.cards);
  }
  resetGame() {
    const initialCards = this.generateCards();
    this.setState({
      cards: initialCards,
      firstCard: null,
      secondCard: null,
      attempts: 0,
      matchedCards: [],
    });
  }
  render() {
    return (
      <div className="board d-flex flex-wrap justify-content-center">
        {this.state.cards.map(
          (
            card,
            index //recorre cada carta del tablero
          ) => (
            <Card
              key={index}
              id={card.id}
              img={card.img}
              showImage={card.showImage}
              matched={card.matched}
              onClick={this.handleClickCard}
            />
          )
        )}
      </div>
    );
  }
}
export default Board;
