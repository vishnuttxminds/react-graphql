import React, { useState } from "react";
import axios from "axios";

const GRAPHQL_URL = "https://graphqlzero.almansi.me/api";

const DeletePhoto = () => {
  const [photo, setPhoto] = useState({ id: "" });
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const deletePhoto = async () => {
    setLoading(true);
    const mutation = `
      mutation DeletePhoto($id: ID!) {
        deletePhoto(id: $id)
      }
    `;

    const variables = {
      id: photo.id,
    };

    const response = await axios.post(GRAPHQL_URL, {
      query: mutation,
      variables,
    });
    setLoading(false);
    setSuccess(response.data.data.deletePhoto);
  };

  return (
    <div>
      <input
        placeholder="Photo ID"
        value={photo.id}
        onChange={(e) => setPhoto({ id: e.target.value })}
      />

      <button onClick={deletePhoto} disabled={loading}>
        {loading ? "Loading......" : "Delete Photo"}
      </button>

      {success !== null && (
        <p>{success ? "Photo deleted ✅" : "Delete failed ❌"}</p>
      )}
    </div>
  );
};

export default DeletePhoto;
