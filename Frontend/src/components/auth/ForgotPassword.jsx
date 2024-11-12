import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { fogortPassword } from '../../redux/userThunk';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {

  const dispatch = useDispatch();
  const navigate=useNavigate()

  const initialValues = {
    email: '',
    newPassword: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    newPassword: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('New password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });


  const onSubmit = async (values, { setFieldError }) => {
    try {
      console.log('Form data:', values);
      const response = await dispatch(fogortPassword({ email: values.email, password: values.newPassword }));
      // Handle success logic if needed
      navigate('/')

    } catch (error) {
      console.error(error, 'error');

      // Check if the error is related to the user not existing
      if (error.response && error.response.data && error.response.data.message === "User not found") {
        // Set the custom error message on the email field

        setFieldError('email', 'User does not exist');
      }

      // You can add other error handling logic here
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Forgot Password</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
                />
                <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-500" />
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-600">
                  New Password
                </label>
                <Field
                  type="password"
                  name="newPassword"
                  className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
                />
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">
                  Confirm Password
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ForgotPassword;
