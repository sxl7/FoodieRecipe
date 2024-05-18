import React from "react";
import { Routes, Route } from "react-router-dom";
import MainCourse from "./components/MainCourse";
import Breakfast from "./components/Breakfast";
import Salad from "./components/Salad";
import Search from "./components/Search";
import Favorite from "./components/Favorite";
import Home from "./components/Home";
import Header from "./components/Header";
import ProtectedRoute from "./utils/ProectedRoute";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path="breakfast" element={<Breakfast />} />
          <Route path="maincourse" element={<MainCourse />} />
          <Route path="salad" element={<Salad />} />
          <Route path="search" element={<Search />} />
          <Route path="favorite" element={<Favorite />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
