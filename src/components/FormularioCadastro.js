import React, { useState, useEffect } from 'react'

import personIcon from '../icons/person.svg'
import phoneIcon from '../icons/phone.svg'
import envelopeIcon from '../icons/envelope.svg'

const FormularioCadastro = (props) => {

    const camposIniciaisDeValores = {
        nomeCompleto: '',
        telefone: '',
        email: '',
        endereco: ''
    }

    const [values, setValues] = useState(camposIniciaisDeValores)

    useEffect(() => {
        if (props.idAtual === '') {
            setValues(camposIniciaisDeValores)
        } else if (props.dadosPacientes[props.idAtual]) {
            setValues({
                ...props.dadosPacientes[props.idAtual]
            })
        }
    }, [props.idAtual, props.dadosPacientes])

    const handleChange = (e) => {
        const { name, value } = e.target

        setValues({
            ...values,
            [name]: value
        })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        props.addEdit(values, props.idAtual)
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
                    onChange={handleChange}
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
                    value={props.idAtual === '' ? 'Salvar' : 'Editar'}
                    className='btn btn-primary btn-block'
                />
            </div>
        </form>
    )
}

export default FormularioCadastro