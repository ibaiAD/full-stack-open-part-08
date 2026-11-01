import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS, USER } from "../queries";

const Recommendations = (props) => {
  const userResult = useQuery(USER, {
    skip: !props.show,
  });

  const favoriteGenre = userResult.data?.me?.favoriteGenre;

  const booksResult = useQuery(ALL_BOOKS, {
    skip: !props.show || !favoriteGenre,
    variables: { genre: favoriteGenre },
  });

  if (!props.show) {
    return null;
  }

  if (userResult.loading || booksResult.loading) {
    return <div>loading...</div>;
  }

  const books = booksResult.data?.allBooks ?? [];

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <strong>{favoriteGenre}</strong>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
