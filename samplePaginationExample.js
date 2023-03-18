import { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";

export default function App() {
  const TODO_ITEMS_PER_PAGE = 20;
  const [allTodos, setAllTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchAllTodos();
  }, []);

  const fetchAllTodos = async () => {
    const todos = await axios.get("https://jsonplaceholder.typicode.com/todos");
    setAllTodos(todos.data);

    const filteredTodos = todos.data.slice(0, 20);
    setFilteredTodos(filteredTodos);
    console.log(filteredTodos);
    setTotalPages(todos.data.length / TODO_ITEMS_PER_PAGE);
  };

  const handlePageButtonClick = (pageNumber) => {
    // 1-20, 21-40, 41-60, 61-80
    const startOffset = TODO_ITEMS_PER_PAGE * pageNumber - TODO_ITEMS_PER_PAGE;
    const endOffset = TODO_ITEMS_PER_PAGE * pageNumber;
    const filteredTodos = allTodos.slice(startOffset, endOffset);
    setFilteredTodos(filteredTodos);
  };

  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>My Todos</h1>
      <ul style={{ lineHeight: "1.5" }}>
        {filteredTodos.map((todo, index) => {
          return (
            <li key={index}>
              {todo.id}) {todo.title}
            </li>
          );
        })}
      </ul>

      <div style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
        {[...Array(totalPages)].map((x, i) => (
          <button onClick={() => handlePageButtonClick(i + 1)}>{i + 1}</button>
        ))}
      </div>
    </div>
  );
}
