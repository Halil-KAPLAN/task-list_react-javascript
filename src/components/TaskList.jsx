import { TaskItem } from "./TaskItem";
import "./TaskList.css";
import { useContext, useEffect } from "react";
import TasksContext from "../context/task";

export const TaskList = () => {
  const { fetchTasks, tasks } = useContext(TasksContext);
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="taskList">
      {tasks.map((task, i) => (
        <TaskItem key={i} task={task} />
      ))}
    </div>
  );
};
