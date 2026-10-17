import { useState } from "react";

import { useMutation } from "@apollo/client/react";

import { EDIT_AUTHOR } from "../queries";

const BirthYearForm = ({ authors }) => {
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onCompleted: (data) => console.log("completed", data),
    onError: (error) => console.log("error", error),
  });

  const submit = (event) => {
    event.preventDefault();
    console.log("update year...");
    editAuthor({ variables: { name, setBornTo: +birthYear } });

    setName("");
    setBirthYear("");
  };

  return (
    <div>
      <h2>Set birthyear</h2>

      <form onSubmit={submit}>
        <div>
          <label htmlFor="name">name</label>
          <select
            id="name"
            name="name"
            value={name}
            onChange={({ target }) => setName(target.value)}
          >
            <option value="" disabled>
              Select an author
            </option>

            {authors.map((a) => (
              <option key={a.id} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="birthYear">born</label>
          <input
            id="birthYear"
            type="number"
            value={birthYear}
            onChange={({ target }) => setBirthYear(target.value)}
          />
        </div>

        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default BirthYearForm;
