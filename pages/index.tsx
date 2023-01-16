// import styles from "@/styles/Home.module.css";
import { useState, useEffect, Fragment } from "react";
import { getSortedCountries } from "@/services/getRequest";

export default function Home() {
  const [countries, setCountries] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const sortedCountries = await getSortedCountries();
      const topTenCountries = [];
      for (let i = 0; i < 10; ++i) {
        topTenCountries.push(sortedCountries[i]);
      }
      localStorage.setItem("topTenCountries", JSON.stringify(topTenCountries));
      setCountries(topTenCountries);
    })();
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
            gridTemplateRows: "auto auto auto auto auto",
            gridTemplateColumns: "auto auto auto auto auto",
          }}
        >
          {countries.map((country: any, index) => {
            return (
              <li key={index}>
                <p># {index + 1}</p>
                <p>País: {country.Country}</p>
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
