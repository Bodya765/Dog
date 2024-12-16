import { SyntheticEvent, useState } from "react";
import LabelWithInput from "./LabelWithInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(''); 
  const navigate = useNavigate();

  function onSubmit(e: SyntheticEvent): void {
    e.preventDefault();
    axios.post(`https://dogs.kobernyk.com/login`, { username, password })
      .then(response => {
        setToken(response.data.token);
        setTimeout(() => navigate('/'), 10); // Navigate after setting the token
      })
  }

  return (
    <>
      <h1>Сторінка авторизації</h1>
      <form onSubmit={onSubmit}>
        <LabelWithInput
          labelName="Імʼя користувача"
          name="username"
          type="text"
          value={username}
          onChange={setUsername}
        />
        <LabelWithInput
          labelName="Пароль"
          name="password"
          type="password"
          value={password}
          onChange={setPassword}
        />
        <button type="submit">Авторизуватися</button>
      </form>
    </>
  );
};

export default Login;
