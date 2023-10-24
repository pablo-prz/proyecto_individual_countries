/* eslint-disable react-hooks/exhaustive-deps */
import { Landing, Home, Detail, Form } from "./Views/Index";
import Nav from "./Components/NavBar/NavBar";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Activities from "./Views/Activities/Activities";
import { useDispatch } from "react-redux";
import { getActivities, getCountries } from "./Redux/Actions";
import { useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "proyecto-individual-countries-f4tc.vercel.app/";

function App() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, []);

  return (
    <div>
      {pathname === "/home" && <Nav />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/:id" element={<Detail />} />
        <Route path="/form" element={<Form />} />
        <Route path="/activities" element={<Activities />} />
      </Routes>
    </div>
  );
}

export default App;
