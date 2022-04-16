import React, { useState } from "react";
import AuthPage from "../AuthPage/AuthPage";

function Login(props) {
  const [formData, setFormData] = useState({
    mail: '',
    password: '',
  })

  function handleChange(e) {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.handleLogin(formData);
    setFormData({mail:'', password:''});
  }

  return(
    <AuthPage
      name="login"
      title="Вход"
      submitText="Войти"
      onSubmit={handleSubmit}
      reg={false}
    >
      <div className="input-box">
        <input
          required
          minLength="2"
          maxLength="40"
          type="text"
          value={formData.mail || ''}
          onChange={handleChange}
          placeholder="Email"
          id="mail-input"
          className="auth-page__input auth-page__input_type_mail"
          name="mail"
        />
        <span className="auth-page__input-error mail-input-error"></span>
      </div>

      <div className="input-box">
        <input
          required
          minLength="2"
          maxLength="200"
          type="password"
          value={formData.password || ''}
          onChange={handleChange}
          placeholder="Пароль"
          id="password-input"
          className="auth-page__input auth-page__input_type_password"
          name="password"
        />
        <span className="auth-page__input-error password-input-error"></span>
      </div>
    </AuthPage>
  )
}

export default Login;
