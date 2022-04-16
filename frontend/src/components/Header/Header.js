import React from "react";
import logoPic from '../../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Header(props) {
  const location = useLocation();

  function handleHeaderLink() {
    switch (location.pathname) {
        case '/':
          return(
            <div className="header__user-info">
              <p className="header__email">{props.email}</p>
              <Link to="/sign-in" onClick={props.onClick} className="header__signout-button buttons">Выйти</Link>
            </div>
          );

        case '/sign-in':
          return(
            <Link
              to="/sign-up"
              className="header__auth-btns buttons"
            >Регистрация</Link>
          );

        case '/sign-up':
          return(
            <Link
              to="/sign-in"
              className="header__auth-btns buttons"
            >Войти</Link>
          );
      }
  }

	return(
		<header className="header">
		  <img className="header__logo" src={logoPic} alt="Логотип Mesto" />
      <>{handleHeaderLink()}</>
		</header>
	);
}

export default Header;
