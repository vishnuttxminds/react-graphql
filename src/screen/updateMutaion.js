import React, { useState } from "react";
import axios from "axios";

const GRAPHQL_URL = "https://graphqlzero.almansi.me/api";

const UpdateMutation = () => {
  const [todo, setTodo] = useState({
    id: "",
    title: "",
    completed: false,
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateTodo = async () => {
    setLoading(true);

    const mutation = `
      mutation UpdateTodo($id: ID!, $input: UpdateTodoInput!) {
        updateTodo(id: $id, input: $input) {
          id
          title
          completed
        }
      }
    `;

    const variables = {
      id: todo.id,
      input: {
        title: todo.title,
        completed: todo.completed,
      },
    };

    try {
      const response = await axios.post(GRAPHQL_URL, {
        query: mutation,
        variables,
      });

      setResult(response.data.data.updateTodo);
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Update Todo</h3>

      <input
        placeholder="Todo ID"
        value={todo.id}
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />

      <br />

      <input
        placeholder="Title"
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />

      <br />

      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
        />
        Completed
      </label>
      <br />

      <button onClick={updateTodo} disabled={loading}>
        {loading ? "Updating..." : "Update"}
      </button>

      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
};

export default UpdateMutation;
