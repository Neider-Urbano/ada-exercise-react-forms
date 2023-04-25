import { useEffect, useState } from "react";
import "./AppFacebook.css";
import validator from "validator";

function AppFacebook() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let error = "";
    if (email.length === "") error = "Email es requerido";
    else if (validator.isEmail(email) == false) error = "Email invalido";

    if (error === "") {
      if (password.length === "") error = "Password es requerido";
      else if (password != "ada321") error = "Contraseña incorrecta";
    }
    setError(error);
  }, [email, password]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name == "email") setEmail(value);
    if (name == "password") setPassword(value);
  };

  const clickOnSubmit = (e) => {
    e.preventDefault();
    if (error == "") {
      alert("Bienvenido Usuario");
      setEmail("");
      setPassword("");
      setError("");
    }
  };

  return (
    <div className="container-facebook">
      <h1 className="title">Facebook</h1>
      <form
        onSubmit={(e) => {
          clickOnSubmit(e);
        }}
      >
        <div>
          <label>Correo</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              handleInput(e);
            }}
            placeholder="Correo electronico"
          />
        </div>

        <div>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              handleInput(e);
            }}
            placeholder="Contraseña"
          />
        </div>

        {error.length > 0 && <p className="error">{error}</p>}

        <input type="submit" value="Iniciar sesión" className="inputSesion" />
      </form>
    </div>
  );
}

export default AppFacebook;
