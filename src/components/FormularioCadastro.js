import React, { useState, useEffect } from 'react'

import personIcon from '../icons/person.svg'
import phoneIcon from '../icons/phone.svg'
import envelopeIcon from '../icons/envelope.svg'

const camposIniciaisDeValores = {
    nomeCompleto: '',
    telefone: '',
    email: '',
    endereco: ''
}

const FormularioCadastro = (props) => {

    // Estado que controla os valores dos inputs
    const [values, setValues] = useState(camposIniciaisDeValores)

    // useEffect para atualizar o formulário quando um paciente é selecionado para edição
    useEffect(() => {
        if (props.idAtual === '') {
            // Se não há ID selecionado, limpa o formulário
            setValues(camposIniciaisDeValores)
        } else if (props.dadosPacientes[props.idAtual]) {
            // Se há um paciente selecionado, preenche o formulário com os dados dele
            setValues({
                ...props.dadosPacientes[props.idAtual]
            })
        }
    }, [props.idAtual, props.dadosPacientes])

    // Função para atualizar o estado conforme o usuário digita
    const handleChange = (e) => {
        const { name, value } = e.target

        setValues({
            ...values,
            [name]: value // atualiza dinamicamente o campo correto
        })
    }

    // Função chamada ao enviar o formulário
    const handleFormSubmit = (e) => {
        e.preventDefault() // evita reload da página
        props.addEdit(values, props.idAtual) // envia os dados para o componente pai
    }

    return (
        <form autoComplete='off' onSubmit={handleFormSubmit}>
            <div className='form-group input-group'>
                <div className='input-group-text'>
                    <img src={personIcon} alt="" />
                </div>

                <input
                    className='form-control'
                    placeholder='Nome completo'
                    name="nomeCompleto"
                    value={values.nomeCompleto}
                    onChange={handleChange} // controla o input
                />
            </div>

            <div className='row'>
                <div className='col-md-6'>
                    <div className='input-group mb-3'>
                        <div className='input-group-text'>
                            <img src={phoneIcon} alt="" />
                        </div>

                        <input
                            className='form-control'
                            placeholder='Telefone'
                            name="telefone"
                            value={values.telefone}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className='col-md-6'>
                    <div className='input-group mb-3'>
                        <div className='input-group-text'>
                            <img src={envelopeIcon} alt="" />
                        </div>

                        <input
                            className='form-control'
                            placeholder='Email'
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>

            <div className='form-group'>
                <input
                    type="submit"
                    // Altera o texto do botão dependendo se está criando ou editando
                    value={props.idAtual === '' ? 'Salvar' : 'Editar'}
                    className='btn btn-primary btn-block'
                />
            </div>
        </form>
    )
}

export default FormularioCadastro