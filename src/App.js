import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario'
import ListadoImagenes from './components/ListadoImagenes'

function App() {
  // state de la appp
  const [busqueda, setBusqueda] = useState('');
  const [imagenes, setImagenes] = useState([]);
  
  useEffect(() => {
    if(busqueda === '') return;

    const consultaApi = async () => {
      const imagenesPorPagina = 30;
      const key ='2446661-bac9f89614ac87b8b95a78e62';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      setImagenes(resultado.hits);
    }

    consultaApi();
      

  }, [busqueda]);
  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
        <Formulario 
          setBusqueda={setBusqueda}
        />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes
          imagenes={imagenes}
        />
      </div>
    </div>
  );
}

export default App;
