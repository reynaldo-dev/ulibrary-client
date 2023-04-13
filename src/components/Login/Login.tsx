import { useState } from 'react'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'

import { AuthService } from '../../app/services/auth.service'
import { login } from '../../redux/slices/auth.slice'
import { Paths } from '../../app/paths'
import { useAppDispatch } from '../../redux/store'
import { TextInput } from '../app/TextInput'
import loginAnimation from '../../../public/welcome-login.json'
import { LoadAnimation } from '../app/Animation'
import { IForm } from '../../interfaces/form.interface'

const loginSchema = yup.object().shape({
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
})

const form: IForm[] = [
    {
        placeholder: 'First name',
        name: 'first_name',
        type: 'text',
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
        className: 'input input-bordered input-primary w-full ',
        value: '',
    },
    {
        placeholder: 'Last name',
        name: 'last_name',
        type: 'text',
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
        className: 'input input-bordered input-primary w-full ',
        value: '',
    },
    {
        placeholder: 'Email',
        name: 'email',
        type: 'email',
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
        className: 'input input-bordered input-primary w-full ',
        value: '',
    },
]

export const LoginComponent = () => {
    const authService = new AuthService()
    const navigation = useNavigate()
    const [isInvalid, setIsInvalid] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    return (
        <div className='bg-white/40  p-4 rounded-lg w-[90%] md:w-1/3 lg:w-1/4  absolute z-20'>
            <div>
                <LoadAnimation animationData={loginAnimation} />
            </div>
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
                {({ errors, touched, handleChange, values }) => (
                    <Form>
                        {form.map((item, index) => (
                            <div
                                className='flex flex-col mt-10 mb-5'
                                key={index + item.name}
                            >
                                <TextInput
                                    placeholder={item.placeholder}
                                    name={item.name}
                                    type={item.type}
                                    onChange={handleChange}
                                    className='input w-full'
                                    value={values[`${item.name}`]}
                                />
                                {errors[`${item.name}`] &&
                                touched[`${item.name}`] ? (
                                    <div className='text-error mb-2  mx-2'>
                                        {errors[`${item.name}`]}
                                    </div>
                                ) : null}
                            </div>
                        ))}

                        {isInvalid && (
                            <div className='alert alert-error shadow-lg'>
                                <div>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        className='stroke-current flex-shrink-0 h-6 w-6'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth='2'
                                            d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
                                        />
                                    </svg>
                                    <span>Check your credentials please</span>
                                </div>
                            </div>
                        )}
                        <button
                            type='submit'
                            className='btn btn-active btn-primary mt-5 w-full'
                        >
                            Login
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
