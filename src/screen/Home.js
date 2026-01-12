import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    // fetchEvent();
  }, []);

    // useEffect(() => {
    //   const fetchCountries = async () => {
    //     try {
    //       const response = await axios.post(
    //         "https://countries.trevorblades.com/",
    //         {
    //           query: `
    //             query {
    //               countries {
    //                 code
    //                 name
    //                 emoji
    //               }
    //             }
    //           `,
    //         }
    //       );
    //       setCountries(response.data.data.countries);
    //     } catch (err) {
    //       setError("Failed to fetch countries");
    //     } finally {
    //       setLoading(false);
    //     }
    //   };

    //   fetchCountries();
    // }, []);

       useEffect(() => {
      const fetchCountries = async () => {
        try {
          const response = await axios.post(
            "https://countries.trevorblades.com/",
            {
              query: `
                query {
                  countries {
                    code
                    name
                    emoji
                  }
                }
              `,
            }
          );
          setCountries(response.data.data.countries);
        } catch (err) {
          setError("Failed to fetch countries");
        } finally {
          setLoading(false);
        }
      };

      fetchCountries();
    }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>🌍 Countries</h2>
      <ul>
        {countries.map((country) => (
          <li key={country.code}>
            {country.emoji} {country.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
