import React from 'react';
import { CreateBookManual } from './components/CreateBookManual';
import { CreateBookRefetch } from './components/CreateBookRefetch';
import { UpdateBook } from './components/UpdateBook';
import {
  BooksDocument,
  useBooksQuery,
  useDeleteAllMutation,
} from './generated/ApolloComponents';

const App = () => {
  const { data } = useBooksQuery();
  const deleteAll = useDeleteAllMutation();

  return (
    <div className="App">
      {(data!.books || []).map(b => (
        <ul key={b.id}>
          <li style={{ margin: '8px', fontSize: '16px' }}>
            {b.title} __ {b.author}
          </li>
        </ul>
      ))}
      <CreateBookRefetch />
      <UpdateBook />
      <CreateBookManual />
      <button
        onClick={() =>
          deleteAll({
            refetchQueries: [{ query: BooksDocument }],
          })
        }
      >
        Delete all
      </button>
    </div>
  );
};

export default App;
