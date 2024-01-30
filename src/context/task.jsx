import { createContext, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const TasksContext = createContext();

export const Provider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:3004/tasks");
    setTasks(response.data);
  };

  const onCrud = async (actionName, crudTaskItem) => {
    switch (actionName) {
      case "create":
        {
          const response = await axios.post(
            "http://localhost:3004/tasks",
            crudTaskItem
          );
          setTasks([...tasks, response.data]);
        }
        break;
      case "update":
        axios.put(
          `http://localhost:3004/tasks/${crudTaskItem.id}`,
          crudTaskItem
        );
        setTasks(
          tasks.map((taskItem) =>
            taskItem.id === crudTaskItem.id
              ? { ...taskItem, ...crudTaskItem }
              : taskItem
          )
        );
        break;
      case "delete":
        axios.delete(`http://localhost:3004/tasks/${crudTaskItem.id}`);
        setTasks(tasks.filter((task) => task.id !== crudTaskItem.id));
        break;
    }
  };

  const sharedObject = {
    tasks,
    fetchTasks,
    onCrud,
  };

  return (
    <TasksContext.Provider value={sharedObject}>
      {children}
    </TasksContext.Provider>
  );
};

export default TasksContext;

Provider.propTypes = {
  children: PropTypes.object,
};
