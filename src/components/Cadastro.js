import React, { useState, useEffect } from 'react'
import FormularioCadastro from './FormularioCadastro'
import { database } from '../database/firebase'
import { ref, push, update, onValue, remove } from "firebase/database";
import pencil from '../icons/pencil.svg'
import xcircle from '../icons/xcircle.svg'

const Cadastro = () => {

    // Estado que armazena todos os pacientes vindos do Firebase
    const [dadosPacientes, setDadosPacientes] = useState({})

    // Estado que guarda o ID do paciente que está sendo editado
    const [idAtual, setIdAtual] = useState('')

    // useEffect executa quando o componente é montado
    useEffect(() => {
        // Referência para o nó "pacientes" no Firebase
        const pacientesRef = ref(database, 'pacientes')

        // Listener em tempo real para mudanças no banco
        const unsubscribe = onValue(pacientesRef, (snapshot) => {
            if (snapshot.val() != null) {
                // Atualiza o estado com os dados do Firebase
                setDadosPacientes(snapshot.val())
            } else {
                // Caso não haja dados, define como objeto vazio
                setDadosPacientes({})
            }
        })

        // Cleanup: remove o listener quando o componente desmonta
        return () => unsubscribe()
    }, [])

    // Função para adicionar ou editar um paciente
    const addEdit = (obj, idAtual) => {
        const pacientesRef = ref(database, 'pacientes')

        // Garante que os campos não sejam undefined
        const dadosLimpos = {
            nomeCompleto: obj.nomeCompleto || '',
            telefone: obj.telefone || '',
            email: obj.email || '',
            endereco: obj.endereco || ''
        }

        if (idAtual === '') {
            // Se não tem ID, cria um novo registro
            push(pacientesRef, dadosLimpos)
                .then(() => {
                    setIdAtual('') // limpa o ID após salvar
                })
                .catch(console.log)
        } else {
            // Se tem ID, atualiza o paciente existente
            const pacienteRef = ref(database, `pacientes/${idAtual}`)

            update(pacienteRef, dadosLimpos)
                .then(() => {
                    setIdAtual('') // limpa o ID após atualizar
                })
                .catch(console.log)
        }
    }

    // Função para deletar um paciente
    const deletePaciente = (key) => {
        // Confirmação antes de deletar
        if (window.confirm('Deseja realmente deletar esse cadastro?')) {

            // Referência do paciente específico
            const pacienteRef = ref(database, `pacientes/${key}`);

            // Remove do Firebase
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
                    {/* Componente de formulário, recebe funções e dados via props */}
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
                            {/* Percorre todos os pacientes e renderiza na tabela */}
                            {Object.keys(dadosPacientes).map(id => (
                                <tr key={id}>
                                    <td>{dadosPacientes[id].nomeCompleto}</td>
                                    <td>{dadosPacientes[id].telefone}</td>
                                    <td>{dadosPacientes[id].email}</td>

                                    <td>
                                        {/* Botão de editar */}
                                        <button
                                            className='btn btn-primary'
                                            onClick={() => setIdAtual(id)}
                                        >
                                            <img src={pencil} alt="edit" />
                                        </button>

                                        {/* Botão de deletar */}
                                        <button 
                                            className='btn btn-danger' 
                                            onClick={() => deletePaciente(id)}
                                        >
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