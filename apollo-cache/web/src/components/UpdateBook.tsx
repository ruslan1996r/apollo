import { Field, Form, Formik } from 'formik';
import * as React from 'react';
import { useUpdateBookMutation } from '../generated/ApolloComponents';

interface Props {}

const inputStyle = {
  height: '30px',
  widht: '200px',
  borderRadius: '5px',
  margin: '10px',
};

export const UpdateBook: React.FC<Props> = () => {
  // Здесь нельзя получить loading, errors и остальное, потому что тут используется старая версия генератора
  const updateBook = useUpdateBookMutation();

  return (
    <Formik
      initialValues={{ id: '' }}
      onSubmit={({ id }) => {
        updateBook({
          variables: {
            id,
            title: 'Coding and Coding',
            author: 'ben: ' + new Date().getSeconds(),
          },
        });
      }}
    >
      {() => (
        <Form>
          <Field name="id" placeholder="ID" style={inputStyle} />
          <button
            type="submit"
            style={{ ...inputStyle, padding: '2px', fontSize: '20px' }}
          >
            Set user as author
          </button>
        </Form>
      )}
    </Formik>
  );
};
