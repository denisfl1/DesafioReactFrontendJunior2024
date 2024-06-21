import React from "react";
import './app.css';
import InputSearch from "./components/input_search";
import Footer from "./components/footer";

export default function App() {
  return (
    <section>


      <h1>todos</h1>
      <InputSearch></InputSearch>
      <Footer></Footer>
    </section>
  );
}
