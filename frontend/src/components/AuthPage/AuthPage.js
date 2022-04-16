import React from "react";
import {Link} from  'react-router-dom';

function AuthPage(props) {
  return(
    <section className="auth-page">
      <h3 className="auth-page__title">{props.title}</h3>
      <form
        className={`auth-page__form auth-page__form_type_${props.name}`}
        name={props.name}
        onSubmit={props.onSubmit}>
        {props.children}
        <button type="submit" className="auth-page__subButton">{props.submitText}</button>
			</form>
      {props.reg ?
        <div className="sign-in">
        <p>Уже зарегистрированы?</p>
        <Link to="/sign-in" className="sign-in__link buttons">Войти</Link>
        </div> : ''
      }
    </section>
  )
}

export default AuthPage;
