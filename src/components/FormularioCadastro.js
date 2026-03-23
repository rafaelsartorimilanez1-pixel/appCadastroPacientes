import React from 'react'

import personIcon from '../icons/person.svg'
import phoneIcon from '../icons/phone.svg'
import envelopeIcon from '../icons/envelope.svg'

const FormularioCadastro = (props) => {

    //Variaves de captura de dados



    const camposIniciaisDeValores = {
        nomeCompleto: '',
        telefone: '',
        email: '',
        endereco: ''
    }

    let [values, setValues] = React.useState(camposIniciaisDeValores);

    const handleChange = (e) => {
        let { name, value } = e.target

        setValues({
            ...values,
            [name]: value
        })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        props.addEdit(values)
    }

    return (
        <form autoComplete='off' onSubmit={handleFormSubmit}>
            <div className='form-group input-group'>
                <div className='input-group-text'>
                    <img src={personIcon} alt="person icon" />
                </div>

                <input className='form-control'
                    placeholder='nome completo'
                    name="nomeCompleto"
                    value={values.nomeCompleto}
                    onChange={handleChange} />
            </div>



            <div className='row'>

                <div className='col-md-6'>
                    <div className='input-group mb-3'>
                        <div className='input-group-text'>
                            <img src={phoneIcon} alt="phone icon" />
                        </div>

                        <input
                            className='form-control'
                            placeholder='telefone'
                            name="telefone"
                            value={values.telefone}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className='col-md-6'>
                    <div className='input-group mb-3'>
                        <div className='input-group-text'>
                            <img src={envelopeIcon} alt="evenlope icon" />
                        </div>

                        <input
                            className='form-control'
                            placeholder='email'
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                        />
                    </div>
                </div>

            </div>

            <div className='form-group'>
                <input type="submit" value="Save" className='btn btn-primary btn-block'></input>
            </div>

        </form >
    )
}

export default FormularioCadastro