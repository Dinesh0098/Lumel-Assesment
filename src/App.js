import DataTable from "./components/Table";
import { ROWS } from "./const";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DataTable data={ROWS} />
      </header>
    </div>
  );
}

export default App;
