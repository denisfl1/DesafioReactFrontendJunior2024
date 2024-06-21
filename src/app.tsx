import './app.css';
import InputSearch from "./components/input_search";
import Footer from "./components/footer";

export default function App() {
  return (
    <section>

      <div className="content">
      <h1>todos</h1>
      <InputSearch></InputSearch>
      <Footer></Footer>
      </div>
  
     
    </section>
  );
}
