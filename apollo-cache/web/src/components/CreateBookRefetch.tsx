import { Field, Form, Formik } from 'formik';
import * as React from 'react';
import {
  BooksDocument,
  useCreateBookMutation,
} from '../generated/ApolloComponents';

interface Props {}

const inputStyle = {
  height: '30px',
  widht: '200px',
  borderRadius: '5px',
  margin: '10px',
};

export const CreateBookRefetch: React.FC<Props> = () => {
  const createBook = useCreateBookMutation();

  return (
    <Formik
      initialValues={{ title: '', author: '' }}
      onSubmit={({ title, author }) => {
        createBook({
          variables: { title, author },
          refetchQueries: [{ query: BooksDocument }],
        });
      }}
    >
      {() => (
        <Form>
          <Field
            name="title"
            placeholder="refetcher_title"
            style={inputStyle}
          />
          <Field
            name="author"
            placeholder="refetcher_title"
            style={inputStyle}
          />
          <button
            type="submit"
            style={{ ...inputStyle, padding: '2px', fontSize: '20px' }}
          >
            save (refetch)
          </button>
        </Form>
      )}
    </Formik>
  );
};
