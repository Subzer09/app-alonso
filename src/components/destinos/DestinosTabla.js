import imgHeader1 from "../../assets/img/header1.jpg";
import {API} from '../../utils/index'
import './DestinosTabla.css'
import {useEffect, useState} from "react";
import {Box, Button, Modal} from "@mui/material";

const estilosModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

function DestinosTabla() {
    const [destinos, setDestinos] = useState([]);
    const [idDestino, setIdDestino] = useState('');
    const [paisDestino, setPaisDestino] = useState('');
    const [descripcionDestino, setDescripcionDestino] = useState('');
    const [modalRegistro, setModalRegistro] = useState(false);
    const [modalActualizar, setModalActualizar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);

    useEffect(() => {
        getDestinos()
    }, [])

    const getDestinos = () => {
        let url = "http://api-alonso.test/api/destinos"
        fetch(url)
            .then(resp => {
                return resp.json()
            })
            .then(data => {
                setDestinos(data)
            })
    }

    const registrarDestinos = (event) => {
        event.preventDefault();
        cerrarModalRegistro()
        let ruta = `${API}/api/destinos`
        const formData = new FormData()
        formData.append('pais', paisDestino)
        formData.append('descripcion', descripcionDestino)
        fetch(ruta, {
            method: 'POST',
            body: formData
        }).then(response => {
            return response.json();
        }).then(data => {
            limpiarCampos()
            getDestinos()
            alert("Se ha registrado el destino " + paisDestino + " de manera correcta.")
        })

    }

    const actualizarDestinos = (event) => {
        event.preventDefault();
        cerrarModalActualizar()
        let ruta = `${API}/api/destinos-actualizar`
        const formData = new FormData()
        formData.append('id', idDestino)
        formData.append('pais', paisDestino)
        formData.append('descripcion', descripcionDestino)
        fetch(ruta, {
            method: 'POST',
            body: formData
        }).then(response => {
            return response.json();
        }).then(data => {
            limpiarCampos()
            getDestinos()
            alert("Se ha editado el destino " + paisDestino + " de manera correcta.")
        })

    }

    const eliminarDestinos = (event) => {
        event.preventDefault();
        cerrarModalEliminar()
        let ruta = `${API}/api/destinos-eliminar`
        const formData = new FormData()
        formData.append('id', idDestino)
        fetch(ruta, {
            method: 'POST',
            body: formData
        }).then(response => {
            return response.json();
        }).then(data => {
            limpiarCampos()
            getDestinos()
            alert("Se ha eliminado el destino " + paisDestino + " de manera correcta.")
        })

    }

    const limpiarCampos = () => {
        setIdDestino('')
        setPaisDestino('')
        setDescripcionDestino('')
    }

    const abrirModelRegistro = () => {
        setModalRegistro(true)
    }

    const cerrarModalRegistro = () => {
        setModalRegistro(false)
    }

    const abrirModalActualizar = (item) => {
        setIdDestino(item.id)
        setPaisDestino(item.pais)
        setDescripcionDestino(item.descripcion)
        setModalActualizar(true)
    }

    const cerrarModalActualizar = () => {
        setModalActualizar(false)
    }

    const abrirModalEliminar = (item) => {
        setIdDestino(item.id)
        setPaisDestino(item.pais)
        setModalEliminar(true)
    }

    const cerrarModalEliminar = () => {
        setModalEliminar(false)
    }

    const formularioTemplate = () => {
        return (
            <>
                <div className="add_comment">
                    <div className="_title">Complete los siguientes campos:</div>
                    <input type="hidden" value={idDestino}/>
                    <div className="field">
                        <label htmlFor="pais" className="label">Pais</label>
                        <div className="input_wrap">
                            <input
                                type="text"
                                id="pais"
                                className="input"
                                value={paisDestino}
                                onChange={(e) => setPaisDestino(e.target.value)}/>
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="descripcion" className="label">Descripci??n</label>
                        <div className="input_wrap">
                            <textarea
                                id="descripcion"
                                className="textarea"
                                value={descripcionDestino}
                                onChange={(e) => setDescripcionDestino(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="comment-fotm-bottom">
                        <button className="btn submit">Enviar</button>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="breadcrumbs">
                <div className="wrap">
                    <div className="wrap_float">
                        <a href="#">Inicio</a>
                        <span className="separator">/</span>
                        <a href="#" className="current">Destinos Tabla</a>
                    </div>
                </div>
            </div>
            <div className="image_bg" style={{
                background: `url(${imgHeader1})`
            }}></div>
            <div className="page_content destinations-page">
                <div className="wrap">
                    <div className="wrap_float">
                        <div className="section-subtitle">EXPLORA LOS TOURS POR DESTINO</div>
                        <div className="section-title">DESTINOS</div>
                        <div className="section-title">
                            <button className="btn-agregar-destino" onClick={abrirModelRegistro}>A??adir destino</button>
                        </div>
                        <div className="main">
                            <div className="popular_destination__slider">
                                <table className="table table-striped slide_item" style={{
                                    color: 'white',
                                    width: '100%',
                                }}>
                                    <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Pais</th>
                                        <th scope="col">Descripci??n</th>
                                        <th scope="col">Bandera</th>
                                        <th scope="col">Acciones</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        destinos.map(destino =>
                                            <tr key={destino.id}>
                                                <th scope="row">{destino.id}</th>
                                                <td>{destino.pais}</td>
                                                <td>{destino.descripcion}</td>
                                                <td>
                                                    <img src={destino.img_bandera} alt=""/>
                                                </td>
                                                <td>
                                                    <button className="btn-editar-destino" onClick={(e) => abrirModalActualizar(destino)}>Editar</button>
                                                    <button className="btn-eliminar-destino" onClick={(e) => abrirModalEliminar(destino)}>Eliminar</button>
                                                </td>
                                            </tr>
                                        )
                                    }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                hideBackdrop
                open={modalRegistro}
                onClose={cerrarModalRegistro}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{...estilosModal, width: '50%'}}>
                    <h2 id="child-modal-title">REGISTRAR DESTINO</h2>
                    <div id="child-modal-description">
                        <div className="reviews_comments">
                            <form onSubmit={(event) => registrarDestinos(event)}>
                                {formularioTemplate()}
                                <Button onClick={cerrarModalRegistro}>Cancelar</Button>
                            </form>
                        </div>
                    </div>

                </Box>
            </Modal>

            <Modal
                hideBackdrop
                open={modalActualizar}
                onClose={cerrarModalRegistro}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{...estilosModal, width: '50%'}}>
                    <h2 id="child-modal-title">EDITAR DESTINO</h2>
                    <div id="child-modal-description">
                        <div className="reviews_comments">
                            <form onSubmit={(event) => actualizarDestinos(event)}>
                                {formularioTemplate()}
                                <Button onClick={cerrarModalActualizar}>Cancelar</Button>
                            </form>
                        </div>
                    </div>

                </Box>
            </Modal>

            <Modal
                hideBackdrop
                open={modalEliminar}
                onClose={cerrarModalEliminar}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{...estilosModal, width: '50%'}}>
                    <h2 id="child-modal-title" style={{
                        textAlign: 'center',
                        color: 'red',
                        fontWeight: 'bold',
                        fontSize: '20px'
                    }}>ESTAS A PUNTO DE ELIMINAR EL DESTINO {paisDestino.toUpperCase()}</h2>
                    <div id="child-modal-description">
                        <div className="reviews_comments">
                            <form onSubmit={(event) => eliminarDestinos(event)}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginTop: '.3em'
                                }}>
                                    <button className="btn submit">ELIMINAR</button>
                                </div>
                                <Button onClick={cerrarModalEliminar}>Cancelar</Button>
                            </form>
                        </div>
                    </div>

                </Box>
            </Modal>
        </>
    )
}

export default DestinosTabla