import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import { AuthService } from '../../app/services/auth.service'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/slices/auth.slice'
import { Navigate, useNavigate } from 'react-router-dom'
import { Paths } from '../../app/paths'

const loginSchema = yup.object().shape({
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
})

export const LoginComponent = () => {
    const authService = new AuthService()
    const navigation = useNavigate()
    const [isInvalid, setIsInvalid] = useState<boolean>(false)
    const dispatch = useDispatch()
    return (
        <div className='bg-secondary p-4 rounded-lg w-[90%] md:w-1/3'>
            <Formik
                initialValues={{
                    first_name: '',
                    last_name: '',
                    email: '',
                }}
                validationSchema={loginSchema}
                onSubmit={async (values) => {
                    const data = await authService.login(values)
                    if (data) {
                        dispatch(login(data?.user))
                        navigation(Paths.HOME)
                    }
                    setIsInvalid(true)
                }}
            >
                {({ errors, touched, handleChange }) => (
                    <Form>
                        <div className='flex flex-col mt-10'>
                            <label htmlFor='first_name' className='text-main'>
                                First Name
                            </label>
                            <Field
                                name='first_name'
                                type='text'
                                onChange={handleChange}
                                className='border border-inactive focus:outline-none focus:border-main rounded-md p-2'
                            />
                            {errors.first_name && touched.first_name ? (
                                <div className='text-error mb-2'>
                                    {errors.first_name}
                                </div>
                            ) : null}
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='last_name' className='text-main'>
                                Last Name
                            </label>
                            <Field
                                name='last_name'
                                type='text'
                                onChange={handleChange}
                                className='border border-inactive focus:outline-none focus:border-main rounded-md p-2'
                            />
                            {errors.last_name && touched.last_name ? (
                                <div className='text-error mb-2'>
                                    {errors.last_name}
                                </div>
                            ) : null}
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='email' className='text-main'>
                                Email
                            </label>
                            <Field
                                name='email'
                                type='email'
                                onChange={handleChange}
                                className='border border-inactive focus:outline-none focus:border-main rounded-md p-2'
                            />
                            {errors.email && touched.email ? (
                                <div className='text-error mb-2'>
                                    {errors.email}
                                </div>
                            ) : null}
                        </div>
                        {isInvalid && (
                            <div className='text-error'>
                                Invalid credentials
                            </div>
                        )}
                        <button
                            type='submit'
                            className='bg-main text-secondary rounded-md p-2 mt-4 w-full shadow-md'
                        >
                            Login
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
