import { useState } from 'react'
import { Field, Formik, Form } from 'formik'
import * as yup from 'yup'

import { UserService } from '../../../../app/services/user.service'
import { Roles } from '../../../../app/roles'
import { getUsers } from '../../../../redux/thunks/user.thunk'
import { useAppDispatch } from '../../../../redux/store'
import { IForm } from '../../../../interfaces/form.interface'

const addUserSchema = yup.object().shape({
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
    email: yup.string().required('Email is required'),
    roleId: yup.string().required('Role is required'),
})

const ROLES = [
    { roleId: '6436bdc8f0f67925fb8ee917', role: Roles.LIBRARIAN },
    { roleId: '6436bdc8f0f67925fb8ee918', role: Roles.STUDENT },
]
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

export const AddUserForm = () => {
    const userService = new UserService()
    const dispatch = useAppDispatch()
    const [error, setError] = useState<boolean>(false)
    return (
        <div className='bg-white p-5 rounded-md w-[90%]'>
            <Formik
                initialValues={{
                    first_name: '',
                    last_name: '',
                    email: '',
                    roleId: '',
                }}
                validationSchema={addUserSchema}
                onSubmit={async (values) => {
                    const user = await userService.createUser(values)
                    console.log(user)
                    if (user) {
                        dispatch(getUsers({ first_name: '' }))
                        error && setError(false)
                    } else {
                        setError(true)
                    }
                }}
            >
                {({ errors, touched, handleChange, values }) => (
                    <Form className=''>
                        {form.map((input) => (
                            <div
                                className='flex flex-col mt-10'
                                key={input.name}
                            >
                                <label
                                    htmlFor={input.name}
                                    className='text-main'
                                >
                                    {input.placeholder}
                                </label>
                                <Field
                                    name={input.name}
                                    type={input.type}
                                    onChange={handleChange}
                                    className={input.className}
                                    value={values[input.name]}
                                />
                                {errors[input.name] && touched[input.name] ? (
                                    <div className='text-error mb-2'>
                                        {errors[input.name]}
                                    </div>
                                ) : null}
                            </div>
                        ))}

                        <div className='flex flex-col mt-10'>
                            <label htmlFor='roleId' className='text-main'>
                                Role
                            </label>

                            <select
                                required
                                name='roleId'
                                id=''
                                className='p-2 focus:outline-none select select-primary w-full'
                                onChange={handleChange}
                                value={values.roleId}
                            >
                                {ROLES.map((role) => (
                                    <option
                                        value={role?.roleId}
                                        key={role?.role}
                                    >
                                        {role?.role}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            type='submit'
                            className='bg-main text-white rounded-md p-2 mt-10 w-full'
                        >
                            Add User
                        </button>
                    </Form>
                )}
            </Formik>
            {error && (
                <div className='alert alert-error shadow-lg fixed bottom-0 left-0 right-0   '>
                    <div>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='stroke-current flex-shrink-0 h-6 w-6'
                            fill='none'
                            viewBox='0 0 24 24'
                        >
                            <path
                                stroke-linecap='round'
                                stroke-linejoin='round'
                                stroke-width='2'
                                d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
                            />
                        </svg>
                        <span>
                            Error creating this user or this user already
                            existsx
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}
