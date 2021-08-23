import { Field, Form, Formik } from 'formik';
import * as React from 'react';
import {
  BooksDocument,
  BooksQuery,
  useCreateBookMutation,
} from '../generated/ApolloComponents';

interface Props {}

const inputStyle = {
  height: '30px',
  widht: '200px',
  borderRadius: '5px',
  margin: '10px',
};

export const CreateBookManual: React.FC<Props> = () => {
  const createBook = useCreateBookMutation();

  return (
    <Formik
      initialValues={{ title: '', author: '' }}
      onSubmit={({ title, author }) => {
        createBook({
          variables: { title, author },
          update: (cache, { data }) => {
            // you could wrap this in a try/catch
            // Этот подход не делает новый запрос, а просто ОБЪЕДИНЯЕТ данные с теми, которые уже есть в сторе
            const bookData: any = cache.readQuery<BooksQuery>({
              query: BooksDocument,
            });
            console.log('cache', cache);
            cache.writeQuery<BooksQuery>({
              query: BooksDocument,
              data: {
                books: [...bookData!.books, data!.createBook],
              },
            });
          },
        });
      }}
    >
      {() => (
        <Form>
          <Field name="title" placeholder="manual_title" style={inputStyle} />
          <Field name="author" placeholder="manual_author" style={inputStyle} />
          <button
            type="submit"
            style={{ ...inputStyle, padding: '2px', fontSize: '20px' }}
          >
            save (manual)
          </button>
        </Form>
      )}
    </Formik>
  );
};
