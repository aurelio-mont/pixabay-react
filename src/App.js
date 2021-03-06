import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario'
import ListadoImagenes from './components/ListadoImagenes'

function App() {
  // state de la appp
  const [busqueda, setBusqueda] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [paginaactual, setPaginaActual] = useState(1);
  const [totalpaginas, setTotalPaginas] = useState(1);

  
  useEffect(() => {
    if(busqueda === '') return;

    const consultaApi = async () => {
      const imagenesPorPagina = 30;
      const key ='2446661-bac9f89614ac87b8b95a78e62';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      setImagenes(resultado.hits);
      
      //Calcular el total de paginas
      const calcularTotoalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
      setTotalPaginas(calcularTotoalPaginas);

      // Mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth' });
    }

    consultaApi();

  }, [busqueda, paginaactual]);

  // Definir pagina antarior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;
    if (nuevaPaginaActual === 0) return;
    setPaginaActual(nuevaPaginaActual);
  }

  //Definir pagina siguiente
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;
    if (nuevaPaginaActual > totalpaginas) return;
    setPaginaActual(nuevaPaginaActual);
  }

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
        {(paginaactual === 1) ? null : (
          <button
            type="button"
            className="bbtn btn-info mr-1"
            onClick={paginaAnterior}
          >&laquo; Anterior</button>
        ) }
        {(paginaactual === totalpaginas) ? null : (
          <button
            type="button"
            className="bbtn btn-info"
            onClick={paginaSiguiente}
          >Siguiente &raquo;</button>
        ) }
        
      </div>
    </div>
  );
}

export default App;
