import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/userThunk';
import { useNavigate } from 'react-router-dom';

function Login() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: async(values) => {
      console.log('Form submitted:', values);
      // Handle login logic here
      const res=await dispatch(login({email:values.email,password:values.password}))

      console.log(res,"response");
      
      if(res.payload.data){
        navigate('/home')
      }
    },
  });

  return (
    <div className="login-container flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={formik.handleSubmit}
        className="p-6 bg-white rounded-md shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

        <label htmlFor="email" className="block mb-1">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          {...formik.getFieldProps('email')}
          className="w-full p-2 mb-1 border border-gray-300 rounded-md"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 text-sm mb-2">{formik.errors.email}</div>
        ) : null}

        <label htmlFor="password" className="block mb-1">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          {...formik.getFieldProps('password')}
          className="w-full p-2 mb-1 border border-gray-300 rounded-md"
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500 text-sm mb-2">{formik.errors.password}</div>
        ) : null}

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors mb-4"
        >
          Login
        </button>

        <div className="text-center">
          <a href="/forgot" className="text-blue-500 hover:text-blue-700">
            Forgot Password?
          </a>
        </div>

        <div className="text-center mt-4">
          <span>Don't have an account? </span>
          <a href="/register" className="text-blue-500 hover:text-blue-700">
            Sign Up
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;
