import React, { useEffect, useState } from "react";
import "./AppExercise.css";

const AppExercise = () => {
  const [name, setName] = useState("");
  const [edad, setEdad] = useState("");
  const [urlImg, setUrlImg] = useState("");
  const [error, setError] = useState("");
  const [cardVisibility, setCardVisibility] = useState(false);

  const handleCampos = (e) => {
    const { name, value } = e.target;
    if (name == "name") setName(value);
    if (name == "edad") setEdad(value);
    if (name == "urlImg") setUrlImg(value);
    setError(validateCampo(name, value));
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    let errorEncontrado = "";
    errorEncontrado = validateCampo("name", name);
    if (errorEncontrado == "") errorEncontrado = validateCampo("edad", edad);
    if (errorEncontrado == "")
      errorEncontrado = validateCampo("urlImg", urlImg);
    setError(errorEncontrado);
    if (errorEncontrado == "") {
      setCardVisibility(true);
    }
  };

  const validateCampo = (name, value) => {
    let errorFound = "";
    if (name == "name") {
      if (value.length == 0) {
        errorFound = "nombre es requerido";
      } else if (value.length < 4) {
        errorFound = "nombre demasiado corto";
      }
    }
    if (name == "edad") {
      if (value.length == 0) {
        errorFound = "Edad es requerida";
      } else if (value < 18) {
        errorFound = "Usted no es mayor de edad";
      }
    }
    if (name == "urlImg") {
      if (value.length == 0) {
        errorFound = "Url es requerida";
      } else if (value.substr(0, 4) !== "http") {
        errorFound = "La url es invalido";
      }
    }
    return errorFound;
  };

  return (
    <div className="conatiner-form">
      <form
        onSubmit={(e) => {
          onSubmitForm(e);
        }}
        className="form"
      >
        <h1 className="title">Registrar nuevo usuario</h1>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            name="name"
            onChange={(e) => {
              handleCampos(e);
            }}
            value={name}
          />
        </div>

        <div>
          <label htmlFor="edad">Edad:</label>
          <input
            type="number"
            name="edad"
            onChange={(e) => {
              handleCampos(e);
            }}
            value={edad}
          />
        </div>

        <div>
          <label htmlFor="urlImg">Profile image Url:</label>
          <input
            type="url"
            name="urlImg"
            onChange={(e) => {
              handleCampos(e);
            }}
            value={urlImg}
          />
        </div>
        {error.length > 0 && <p className="error">{error}</p>}
        <input type="submit" value="submit" className="inputSubmit" />
      </form>
      {cardVisibility && (
        <section className="section-user">
          <h2>{name}</h2>
          <img src={urlImg} alt="img user" />
          <p>foto de perfil</p>
          <p>{edad}</p>
          <button type="button">take a car</button>
        </section>
      )}
    </div>
  );
};

export default AppExercise;
