import "./App.css";
import { TaskCreate } from "./components/TaskCreate";
import { TaskList } from "./components/TaskList";

function App() {
  return (
    <div className="App">
      <TaskCreate />
      <TaskList />
    </div>
  );
}

export default App;
