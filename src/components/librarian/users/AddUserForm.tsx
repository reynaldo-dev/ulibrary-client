import React, { useState } from 'react'
import { Field, Formik, Form } from 'formik'
import * as yup from 'yup'
import { UserService } from '../../../app/services/user.service'
import { Roles } from '../../../app/roles'
import { useDispatch } from 'react-redux'
import { getUsers } from '../../../redux/thunks/user.thunk'
import { useAppDispatch } from '../../../redux/store'

const addUserSchema = yup.object().shape({
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
    email: yup.string().required('Email is required'),
    id_role: yup.number().required('Role is required'),
})

const ROLES = [
    { id_role: 1, role: Roles.LIBRARIAN },
    { id_role: 2, role: Roles.STUDENT },
]

export const AddUserForm = () => {
    const userService = new UserService()
    const dispatch = useAppDispatch()
    const [error, setError] = useState<boolean>(false)
    return (
        <div className='bg-secondary p-2 rounded-md'>
            <Formik
                initialValues={{
                    first_name: '',
                    last_name: '',
                    email: '',
                    id_role: 1,
                }}
                validationSchema={addUserSchema}
                onSubmit={async (values) => {
                    const user = await userService.createUser({
                        ...values,
                        id_role: +values.id_role,
                    })
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

                        <div className='flex flex-col mt-10  '>
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

                        <div className='flex flex-col mt-10'>
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

                        <div className='flex flex-col mt-10'>
                            <label htmlFor='id_role' className='text-main'>
                                Role
                            </label>

                            <select
                                required
                                name='id_role'
                                id=''
                                className='p-2 focus:outline-none rounded-md'
                                onChange={handleChange}
                                value={values.id_role}
                            >
                                {ROLES.map((role) => (
                                    <option
                                        value={role?.id_role}
                                        key={role?.id_role}
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
                <div className='text-error fixed bottom-0 left-0 right-0  bg-error '>
                    <span className='text-secondary text-sm p-2'>
                        Error adding this user, or this user already exists
                    </span>
                </div>
            )}
        </div>
    )
}
