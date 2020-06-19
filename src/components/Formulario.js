import React from 'react';

const Formulario = () => {
    return ( 
        <form>
            <div className="row">
                <div className="form-grouip col-md-8">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Busca una imagen, ejemplo: comida o café"
                    />
                </div>
                <div className="form-grouip col-md-4">
                    <input
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Buscar"
                    />
                </div>
            </div>
        </form>
     );
}
 
export default Formulario;