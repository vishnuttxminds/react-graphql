import axios from "axios";
import React from "react";

const GRAPHQL_URL = "https://graphqlzero.almansi.me/api";

function CreatePhoto() {
  const createPhoto = async () => {
    const res = await axios.post(GRAPHQL_URL, {
      query: `
        mutation CreatePhoto {
          createPhoto(
            input: {
              title: "animal"
              url: "https://www.istockphoto.com/photo/panda-gm146076494-6364974"
              thumbnailUrl: "https://www.istockphoto.com/photo/panda-gm146076494-6364974"
            }
          ) {
            title
          }
        }
      `,
    });
    console.log(res.data);
  };

  return <button onClick={createPhoto}>Create Photo</button>;
}

export default CreatePhoto;
