// import React, { useEffect } from "react";
// import APIService from "./services/APIService";
// import MovieCard from "./components/MovieCard";
// import { Movie } from "./models/Movie";
// import MovieList from "./components/MovieList";
// import "./App.css";

// const App: React.FC = () => {
//   const movies = [
//     {
//       backdrop_path: "/fqv8v6AycXKsivp1T5yKtLbGXce.jpg",
//       genre_ids: [878, 12, 28],
//       id: 653346,
//       overview:
//         "Several generations in the future following Caesar's reign, apes are now the dominant species and live harmoniously while humans have been reduced to living in the shadows. As a new tyrannical ape leader builds his empire, one young ape undertakes a harrowing journey that will cause him to question all that he has known about the past and to make choices that will define a future for apes and humans alike.",
//       poster_path: "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
//       release_date: "2024-05-08",
//       title: "Kingdom of the Planet of the Apes",
//     },
//     {
//       backdrop_path: "/ga4OLm4qLxPqKLMzjJlqHxVjst3.jpg",
//       genre_ids: [28, 80, 53],
//       id: 573435,
//       overview:
//         "After their late former Captain is framed, Lowrey and Burnett try to clear his name, only to end up on the run themselves.",
//       poster_path: "/nP6RliHjxsz4irTKsxe8FRhKZYl.jpg",
//       release_date: "2024-06-05",
//       title: "Bad Boys: Ride or Die",
//     },
//     {
//       backdrop_path: "/xRd1eJIDe7JHO5u4gtEYwGn5wtf.jpg",
//       genre_ids: [878, 28, 12],
//       id: 823464,
//       overview:
//         "Following their explosive showdown, Godzilla and Kong must reunite against a colossal undiscovered threat hidden within our world, challenging their very existence – and our own.",
//       poster_path: "/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
//       release_date: "2024-03-27",
//       title: "Godzilla x Kong: The New Empire",
//     },
//     {
//       backdrop_path: "/z121dSTR7PY9KxKuvwiIFSYW8cf.jpg",
//       genre_ids: [10752, 28, 18],
//       id: 929590,
//       overview:
//         "In the near future, a group of war journalists attempt to survive while reporting the truth as the United States stands on the brink of civil war.",
//       poster_path: "/sh7Rg8Er3tFcN9BpKIPOMvALgZd.jpg",
//       release_date: "2024-04-10",
//       title: "Civil War",
//     },
//     {
//       backdrop_path: "/oavbmL3iddJUmC8nQjL6bLHwAP4.jpg",
//       genre_ids: [27, 53],
//       id: 719221,
//       overview:
//         "When a group of friends recklessly violate the sacred rule of Tarot readings, they unknowingly unleash an unspeakable evil trapped within the cursed cards. One by one, they come face to face with fate and end up in a race against death.",
//       poster_path: "/gAEUXC37vl1SnM7PXsHTF23I2vq.jpg",
//       release_date: "2024-05-01",
//       title: "Tarot",
//     },
//     {
//       backdrop_path: "/uVu2fBc114un7F1GD76RBouWyBP.jpg",
//       genre_ids: [16, 10751, 18, 12, 35],
//       id: 1022789,
//       overview:
//         "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who’ve long been running a successful operation by all accounts, aren’t sure how to feel when Anxiety shows up. And it looks like she’s not alone.",
//       poster_path: "/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
//       release_date: "2024-06-12",
//       title: "Inside Out 2",
//     },
//     {
//       backdrop_path: "/3TNSoa0UHGEzEz5ndXGjJVKo8RJ.jpg",
//       genre_ids: [878, 28],
//       id: 614933,
//       overview:
//         "A brilliant counterterrorism analyst with a deep distrust of AI discovers it might be her only hope when a mission to capture a renegade robot goes awry.",
//       poster_path: "/bcM2Tl5HlsvPBnL8DKP9Ie6vU4r.jpg",
//       release_date: "2024-05-23",
//       title: "Atlas",
//     },
//     {
//       backdrop_path: "/H5HjE7Xb9N09rbWn1zBfxgI8uz.jpg",
//       genre_ids: [28, 35],
//       id: 746036,
//       overview:
//         "Fresh off an almost career-ending accident, stuntman Colt Seavers has to track down a missing movie star, solve a conspiracy and try to win back the love of his life while still doing his day job.",
//       poster_path: "/tSz1qsmSJon0rqjHBxXZmrotuse.jpg",
//       release_date: "2024-04-24",
//       title: "The Fall Guy",
//     },
//     {
//       backdrop_path: "/vblTCXOWUQGSc837vgbhDRi4HSc.jpg",
//       genre_ids: [28, 80, 35, 53],
//       id: 955555,
//       overview:
//         "Detective Ma Seok-do changes his affiliation from the Geumcheon Police Station to the Metropolitan Investigation Team, in order to eradicate Japanese gangsters who enter Korea to commit heinous crimes.",
//       poster_path: "/lW6IHrtaATxDKYVYoQGU5sh0OVm.jpg",
//       release_date: "2023-05-31",
//       title: "The Roundup: No Way Out",
//     },
//     {
//       backdrop_path: "/tkHQ7tnYYUEnqlrKuhufIsSVToU.jpg",
//       genre_ids: [27],
//       id: 437342,
//       overview:
//         "When a young American woman is sent to Rome to begin a life of service to the church, she encounters a darkness that causes her to question her own faith and uncovers a terrifying conspiracy that hopes to bring about the birth of evil incarnate.",
//       poster_path: "/uGyiewQnDHPuiHN9V4k2t9QBPnh.jpg",
//       release_date: "2024-04-03",
//       title: "The First Omen",
//     },
//   ];

//   return (
//     <>
//       <div className="app-container">
//         <h1 className="title">Mi lista de películas favoritas</h1>
//       </div>
//       <div className="filter-movie"></div>
//       <MovieList movies={movies} />
//     </>
//   );
// };
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import "./App.css";
import { Movie } from "./models/Movie";
import MovieList from "./components/MovieList";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <h1 className="title">Mi lista de películas favoritas</h1>
        <div className="filter-movie">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
