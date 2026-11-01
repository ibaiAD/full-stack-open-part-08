import { useState } from "react";

import { useQuery } from "@apollo/client/react";

import { ALL_BOOKS, ALL_GENRES } from "../queries";

const Books = (props) => {
  const [genre, setGenre] = useState("");

  const genresResult = useQuery(ALL_GENRES, {
    skip: !props.show,
  });
  const booksResult = useQuery(ALL_BOOKS, {
    skip: !props.show,
    variables: { genre: genre || null },
  });

  if (!props.show) {
    return null;
  }

  if (booksResult.loading) {
    return <div>loading...</div>;
  }

  const books = booksResult.data?.allBooks ?? [];
  const genres = genresResult.data?.allGenres ?? [];

  return (
    <div>
      <h2>books</h2>

      {!!genre && (
        <p>
          in genre <strong>{genre}</strong>
        </p>
      )}

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

      <div>
        {genres.map((genre) => (
          <button key={genre} onClick={() => setGenre(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => setGenre("")}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
