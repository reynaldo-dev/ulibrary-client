import { Field, FormikErrors } from 'formik'
import React from 'react'
import { IForm } from '../../interfaces/form.interface'

interface IProps extends IForm {
    placeholder: string
    name: string
    type: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    className: string
    value: string
}

export const TextInput = ({ ...props }: IProps) => {
    return <Field {...props} />
}
