import React, { useState, useEffect } from 'react'
import FormularioCadastro from './FormularioCadastro'
import { database } from '../database/firebase'
import { ref, push, onValue } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js";

const Cadastro = () => {

    let [dadosPacientes, setDadosPacientes] = useState({})

    useEffect(() => {
        const pacientesRef = ref(database, 'pacientes')

        onValue(pacientesRef, (snapshot) => {
            if (snapshot.val() != null) {
                setDadosPacientes({
                    ...snapshot.val()
                });
            } else {
                setDadosPacientes({});
            }
        });
    }, []);

    const addEdit = obj => {
        const pacientesRef = ref(database, 'pacientes');

        push(pacientesRef, obj)
            .then(() => {
                console.log("Salvo com sucesso");
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div>
            <div className="p-5 mb-4 bg-light rounded-3">
                <div className="container-fluid py-5">
                    <h1 className="display-4">Cadastro de Pacientes</h1>
                </div>
            </div>

            <div className='row'>
                <div className='col-md-5'>
                    <FormularioCadastro addEdit={addEdit} />
                </div>

                <div className='col-md-7'>
                    <table className='table table-bordeless table-stripped'>
                        <thead className='thead-light'>
                            <tr>
                                <td>Nome completo</td>
                                <td>Telefone</td>
                                <td>Email</td>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                Object.keys(dadosPacientes).map(id => {
                                    return (
                                        <tr key={id}>
                                            <td> {dadosPacientes[id].nomeCompleto}</td>
                                            <td> {dadosPacientes[id].telefone}</td>
                                            <td> {dadosPacientes[id].email}</td>

                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Cadastro