import React from "react";

class Header extends React.Component {
  render() {
    return (
      <header>
        <h1 className="'title">Juego de Memoria</h1>
        <button className="btn-restart">Reiniciar Partida</button>
      </header>
    );
  }
}
export default Header;
