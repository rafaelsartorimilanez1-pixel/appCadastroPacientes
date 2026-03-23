import React, { useState, useEffect } from 'react'
import FormularioCadastro from './FormularioCadastro'
import { database } from '../database/firebase'
import { ref, push, update, onValue, remove } from "firebase/database";
import pencil from '../icons/pencil.svg'
import xcircle from '../icons/xcircle.svg'

const Cadastro = () => {

    const [dadosPacientes, setDadosPacientes] = useState({})
    const [idAtual, setIdAtual] = useState('')

useEffect(() => {
    const pacientesRef = ref(database, 'pacientes')

    const unsubscribe = onValue(pacientesRef, (snapshot) => {
        if (snapshot.val() != null) {
            setDadosPacientes(snapshot.val())
        } else {
            setDadosPacientes({})
        }
    })

    return () => unsubscribe()
}, [])

const addEdit = (obj, idAtual) => {
    const pacientesRef = ref(database, 'pacientes')

    const dadosLimpos = {
        nomeCompleto: obj.nomeCompleto || '',
        telefone: obj.telefone || '',
        email: obj.email || '',
        endereco: obj.endereco || ''
    }

    if (idAtual === '') {
        push(pacientesRef, dadosLimpos)
            .then(() => {
                setIdAtual('')
            })
            .catch(console.log)
    } else {
        const pacienteRef = ref(database, `pacientes/${idAtual}`)

        update(pacienteRef, dadosLimpos)
            .then(() => {
                setIdAtual('')
            })
            .catch(console.log)
    }
}

const deletePaciente = (key) => {
    if (window.confirm('Deseja realmente deletar esse cadastro?')) {

        const pacienteRef = ref(database, `pacientes/${key}`);

        remove(pacienteRef)
            .then(() => {
                console.log("Deletado com sucesso");
            })
            .catch((err) => {
                console.log(err);
            });
    }
};

return (
    <div>
        <div className="p-5 mb-4 bg-light rounded-3">
            <div className="container-fluid py-5">
                <h1 className="display-4">Cadastro de Pacientes</h1>
            </div>
        </div>

        <div className='row'>
            <div className='col-md-5'>
                <FormularioCadastro
                    addEdit={addEdit}
                    idAtual={idAtual}
                    dadosPacientes={dadosPacientes}
                />
            </div>

            <div className='col-md-7'>
                <table className='table table-bordeless table-striped'>
                    <thead>
                        <tr>
                            <td>Nome</td>
                            <td>Telefone</td>
                            <td>Email</td>
                            <td>Ações</td>
                        </tr>
                    </thead>

                    <tbody>
                        {Object.keys(dadosPacientes).map(id => (
                            <tr key={id}>
                                <td>{dadosPacientes[id].nomeCompleto}</td>
                                <td>{dadosPacientes[id].telefone}</td>
                                <td>{dadosPacientes[id].email}</td>

                                <td>
                                    <button
                                        className='btn btn-primary'
                                        onClick={() => setIdAtual(id)}
                                    >
                                        <img src={pencil} alt="edit" />
                                    </button>

                                    <button className='btn btn-danger' onClick={() => deletePaciente(id)}>
                                        <img src={xcircle} alt="delete" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
)
}

export default Cadastro