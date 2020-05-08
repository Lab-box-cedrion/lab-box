import React, { useState, useEffect, Fragment } from 'react';
import { Link } from "react-router-dom";
import Cabecera from '../Cabecera/Cabecera';
import Pie from '../Footer/Pie';
import './Historicos.scss';
import axios from 'axios';
import { InputText } from "primereact/inputtext";




const Historicos = () => {
    // set up the hook. "data" is a variable used to store data, setData the function we call to insert stuff into "data"
    const [data, setData] = useState([]);

    //set up the hook. "form" is a variable used to store form value, setValue the function we call to insert stuff into "form"
    const [form, setValue] = useState({
        puerto: "",
        segundos: null,
        nombre: "",
    });
    //Función para enviar datos
    const enviarDatos = async (event) => {

        event.preventDefault();

        await fetch("http://localhost:5005/crear-experimento", {

            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                puerto: form.puerto,
                segundos: form.segundos,
                nombre: form.nombre
            })
        })
        console.log("¡Información enviada con éxito!")
    }

    // fetch the data from the API, using axios, and call the function setData to store the JSON inside "data" variable
    useEffect(() => {
        async function fetchData() {
            const result = await axios.get(
                'http://localhost:5005/graphic-data',
            );

            setData(result.data);
            //console.log("Connected to the database", result.data);
        }
        fetchData();
    }, []);


    return (
        <Fragment>
            <Cabecera />
            <article className='content'>
                <h1 className='title'>
                    Históricos
                        </h1>
                <p className='about-historicos'>Archivo de  los experimentos. Se puede buscar por día y hora o nombre elegido. Ordenados de más reciente a más antiguo.  Seleccionando uno de  los campos se accederá a  una vista resumen de los resultados y seleccionando cada uno de ellos a  su vez  se  visualiza la gráfica de los resultados.</p>
            </article>
            <article>
                <form onSubmit={(event) => { enviarDatos(event) }} className="ardu-form">
                    <span className="p-float-label">
                        <InputText id="in" value={form.puerto} onChange={(e) => setValue({ ...form, puerto: e.target.value })} />
                        <label htmlFor="in">Puerto</label>
                    </span>
                    <span className="p-float-label">
                        <InputText id="in" value={form.segundos} onChange={(e) => setValue({ ...form, segundos: e.target.value })} />
                        <label htmlFor="in">Tiempo(s)</label>
                    </span>
                    {/* <span className="p-float-label">
                        <InputText id="in" value={form.nombre} onChange={(e) => setValue({ ...form, nombre: e.target.value })} />
                        <label htmlFor="in">Nombre experimento</label>
                    </span> */}
                    <button
                        className=""
                        type="submit"
                    >
                        <span>Iniciar experimento</span>{" "}
                    </button>
                </form>
            </article>

            <main className='data-container'>
                {!data ?
                    <div>Loading...</div>
                    :
                    data.map((el, index) => {
                        return (
                            <Link to={{
                                pathname: `/historicos_grafica/${el.experiment}`, state: {
                                    data: data[index]
                                }
                            }}>
                                <article className='pair' key={el.id}>
                                    <section className='date-time'>{el.experiment}
                                    </section>
                                    <section className='name'>Nombre
                                            </section>
                                </article>
                            </Link>
                        )
                    })
                }
            </main>
            <Pie />
        </Fragment>

    );

}

export default Historicos;