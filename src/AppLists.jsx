import React, { useEffect, useState } from "react";
import foods from "./instrumentos.json";
import "./AppList.css";

const AppLists = () => {
  const [dataFoods, setDataFoods] = useState(foods);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [precio, setPrecio] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    let error = "";
    if (name.length == 0) {
      error = "El nombre es requerido";
    } else if (name?.length < 4) {
      error = "Nombre demasiado corto";
    }

    if (error.length == 0) {
      if (url.length == 0) {
        error = "La url es requerida";
      } else if (url.substr(0, 5) !== "https") {
        error = "url invalida";
      }
    }

    if (error.length == 0) {
      if (precio.length == 0) {
        error = "El precio es requerido";
      } else if (precio > 10000000) {
        error = "instrumento demasidao costoso";
      } else if (precio < 10000) {
        error = "Costo muy bajo del instrumento";
      }
    }
    setError(error);
  }, [name, url, precio]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name == "name") setName(value);
    else if (name == "url") setUrl(value);
    else if (name == "precio") setPrecio(value);
  };

  const clickOnSubmit = (e) => {
    e.preventDefault();
    if (error === "") {
      setDataFoods((data) => [
        ...data,
        {
          id: Math.max(...data.map((x) => x.id)) + 1,
          name: name,
          url: url,
          precio: precio,
        },
      ]);
      alert("nuevo instrumento");
      setName("");
      setUrl("");
      setPrecio("");
      setError("");
    }
  };

  return (
    <div>
      <section className="container-crear-instrumento">
        <h1>Crear nuevo instrumento</h1>
        <form
          onSubmit={(e) => {
            clickOnSubmit(e);
          }}
        >
          <label>
            Nombre
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => {
                handleOnChange(e);
              }}
            />
          </label>

          <label>
            Url
            <input
              type="url"
              name="url"
              value={url}
              onChange={(e) => {
                handleOnChange(e);
              }}
            />
          </label>

          <label>
            Precio
            <input
              type="number"
              name="precio"
              value={precio}
              onChange={(e) => {
                handleOnChange(e);
              }}
            />
          </label>

          {error?.length > 0 && <p className="error">{error}</p>}

          <input type="submit" value="Enviar" className="input-enviar" />
        </form>
      </section>

      <section className="container-list-instrument">
        <h1>Lista de instrumentos</h1>
        <div className="instruments">
          {dataFoods.map((food) => {
            return (
              <div key={food.id} className="instrument">
                <h3>
                  {food.id}.{food.name}
                </h3>
                <img src={food.url} />
                <p>$ {food.precio}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default AppLists;
