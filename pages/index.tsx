// import styles from "@/styles/Home.module.css";
import { useState, useEffect, Fragment } from "react";
import { getSortedCountries } from "@/services/getRequest";

export default function Home() {
  const [countries, setCountries] = useState<any>([]);

  useEffect(() => {
    if (localStorage.getItem("topTenCountries") === null) {
      (async () => {
        const sortedCountries = await getSortedCountries();
        const topTenCountries = [];
        for (let i = 0; i < 10; ++i) {
          topTenCountries.push(sortedCountries[i]);
        }
        localStorage.setItem(
          "topTenCountries",
          JSON.stringify(topTenCountries)
        );
        setCountries(topTenCountries);
      })();
    } else {
      const localStorageCountries = JSON.parse(
        localStorage.getItem("topTenCountries") || "{}"
      );
      setCountries(localStorageCountries);
    }
  }, []);

  return (
    <Fragment>
      <header style={{ height: "100px", width: "100%" }}>
        <h1>Países com mais casos ativos de COVID</h1>
      </header>
      <hr />
      <main>
        <ul
          style={{
            display: "grid",
            gridTemplateRows: "auto auto",
            gridTemplateColumns: "auto auto",
            gap: "1.5rem",
            listStyle: "none",
          }}
        >
          {countries.map((country: any, index: number) => {
            return (
              <li
                key={index}
                style={{
                  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                  padding: "0.5rem",
                  textAlign: "center",
                }}
              >
                <p>
                  País: {country.Country} # {index + 1}
                </p>
                <p>
                  Número de casos ativos:{" "}
                  {country.TotalConfirmed - country.TotalRecovered}
                </p>
              </li>
            );
          })}
        </ul>
      </main>
    </Fragment>
  );
}
