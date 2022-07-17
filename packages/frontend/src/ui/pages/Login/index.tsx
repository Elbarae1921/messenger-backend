import { ErrorMessage, FastField, Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

import { MeDocument, useLoginMutation } from '../../../api/generated';

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required()
});

export const Login = () => {
  const [login] = useLoginMutation();
  const [error, setError] = useState('');

  return (
    <>
      <h1>Login</h1>
      {error && <p>{error}</p>}
      <Formik
        initialValues={{ email: 'elbarae1921@gmail.com', password: 'password' }}
        validationSchema={validationSchema}
        onSubmit={async ({ email, password }) => {
          setError('');
          const response = await login({
            variables: { email, password },
            awaitRefetchQueries: true,
            refetchQueries: [{ query: MeDocument }]
          });
          if (response.errors) {
            setError('Something went wrong');
          } else if (!response.data?.login) {
            setError('Email or password incorrect');
          }
        }}
      >
        {({ isSubmitting, handleChange, handleBlur }) => (
          <Form>
            <div>
              <FastField
                type="text"
                name="email"
                aria-label="email"
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                placeholder="user@mail.com"
              />
              <ErrorMessage name="email" />
            </div>
            <div>
              <FastField
                type="password"
                name="password"
                aria-label="password"
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                placeholder="P@ssw0rd"
              />
              <ErrorMessage name="password" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Login
            </button>
            {isSubmitting && <p>Loading...</p>}
          </Form>
        )}
      </Formik>
    </>
  );
};
