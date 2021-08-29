import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import { userService } from 'services'

import MainLayout from 'components/layouts/main'

const Login = () => {
  const router = useRouter()

  // form validation rules
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  })
  const formOptions = { resolver: yupResolver(validationSchema) }

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions)
  const { errors } = formState

  function onSubmit({
    username,
    password,
  }: {
    username: string
    password: string
  }) {
    return userService
      .login(username, password)
      .then(() => {
        // get return url from query parameters or default to '/'
        const returnUrl: string = (router.query.returnUrl as string) || '/'
        router.push(returnUrl)
      })
      .catch(error => console.log(error))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          {...register('username')}
          className={`form-control ${errors.username ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.username?.message}</div>
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          {...register('password')}
          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.password?.message}</div>
      </div>
      <button disabled={formState.isSubmitting} className="btn btn-primary">
        {formState.isSubmitting && (
          <span className="spinner-border spinner-border-sm mr-1"></span>
        )}
        Login
      </button>
    </form>
  )
}

Login.layout = MainLayout

export default Login
