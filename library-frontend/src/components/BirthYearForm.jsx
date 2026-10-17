import { useState } from "react";

import { useMutation } from "@apollo/client/react";

import { EDIT_AUTHOR } from "../queries";

const BirthYearForm = () => {
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
          <input
            id="name"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>

        <div>
          <label htmlFor="birthYear">birthYear</label>
          <input
            id="birthYear"
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
