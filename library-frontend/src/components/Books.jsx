import { useState } from "react";

import { useQuery } from "@apollo/client/react";

import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const [genre, setGenre] = useState("");
  const result = useQuery(ALL_BOOKS, {
    skip: !props.show,
  });

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data?.allBooks ?? [];
  const genres = [...new Set(books.flatMap((b) => b.genres))];
  const filteredBooks =
    genre === "" ? books : books.filter((b) => b.genres.includes(genre));

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
          {filteredBooks.map((b) => (
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
