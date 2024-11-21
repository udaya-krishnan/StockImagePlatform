import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/userThunk';
import { useNavigate } from 'react-router-dom';

function Register() {

  const dispatch=useDispatch()
  const navigate=useNavigate()
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .required('Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      phoneNumber: Yup.string()
        .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
        .required('Phone number is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),
    }),
    onSubmit: async(values) => {
      console.log('Form submitted:', values);
     const res= await dispatch(registerUser(values))
     console.log(res,"response");
     
     if(res.payload.message=="created"){
      navigate('/')
     }
    },
  });



  return (
    <div className="register-container flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={formik.handleSubmit} className="p-6 bg-white rounded-md shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>

        <label htmlFor="name" className="block mb-1">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          {...formik.getFieldProps('name')}
          className="w-full p-2 mb-1 border border-gray-300 rounded-md"
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-red-500 text-sm mb-1">{formik.errors.name}</div>
        ) : null}

        <label htmlFor="email" className="block mb-1">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          {...formik.getFieldProps('email')}
          className="w-full p-2 mb-1 border border-gray-300 rounded-md"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 text-sm mb-1">{formik.errors.email}</div>
        ) : null}

        <label htmlFor="phoneNumber" className="block mb-1">Phone Number</label>
        <input
          type="tel"
          name="phoneNumber"
          id="phoneNumber"
          {...formik.getFieldProps('phoneNumber')}
          className="w-full p-2 mb-1 border border-gray-300 rounded-md"
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
          <div className="text-red-500 text-sm mb-1">{formik.errors.phoneNumber}</div>
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
          <div className="text-red-500 text-sm mb-1">{formik.errors.password}</div>
        ) : null}

        <label htmlFor="confirmPassword" className="block mb-1">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          {...formik.getFieldProps('confirmPassword')}
          className="w-full p-2 mb-1 border border-gray-300 rounded-md"
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="text-red-500 text-sm mb-1">{formik.errors.confirmPassword}</div>
        ) : null}

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors mb-4"
        >
          Register
        </button>

        <div className="text-center">
          <span>Already have an account? </span>
          <a href="/" className="text-blue-500 hover:text-blue-700">
            Login
          </a>
        </div>
      </form>
    </div>
  );
}

export default Register;
