import DataTable from "./components/Table";

const data = {
  rows: [
    {
      id: "electronics",
      label: "Electronics",
      value: 0,
      children: [
        {
          id: "phones",
          label: "Phones",
          value: 800,
        },
        {
          id: "laptops",
          label: "Laptops",
          value: 700,
        },
      ],
    },
    {
      id: "furniture",
      label: "Furniture",
      value: 0,
      children: [
        {
          id: "tables",
          label: "Tables",
          value: 300,
        },
        {
          id: "chairs",
          label: "Chairs",
          value: 700,
        },
      ],
    },
  ],
};

data.rows.forEach((row) => {
  row.value = row.children.reduce((sum, child) => sum + child.value, 0);
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DataTable data={data.rows} />
      </header>
    </div>
  );
}

export default App;
