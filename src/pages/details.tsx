/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
const IMDBAPI = "k_z79mfru0";
export default function details() {
  const router = useRouter();
  const currentUrl = router.asPath;
  const query = router.query;

  const [title, setTitle] = useState("");
  const [actors, setActors] = useState<any[]>([]);
  const [plot, setPlot] = useState("");
  const [rating, setRating] = useState("");
  const handleShow = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("actors", actors);
  };
  useEffect(() => {
    console.log("query is==>", query.q);
    fetch(`https://imdb-api.com/en/API/Title/${IMDBAPI}/${query.q}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTitle(data.title);
        setActors(data.actorList);
        setPlot(data.plot);
        setRating(data.imDbRating);
      });
  }, [query]);
  return (
    <div className="movie">
      <h1>Title: {title}</h1>
      <p>Plot: {plot}</p>
      <h3>Actor:</h3>
      {actors
        ? actors.map((actor) => {
            return (
              <div key={actor.id}>
                <h6>{actor.name}</h6>;
              </div>
            );
          })
        : "Loading"}

      <h3>Rating:{rating}</h3>
      <button onClick={handleShow}>ShowActors</button>
    </div>
  );
}
