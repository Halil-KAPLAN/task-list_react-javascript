import { useContext, useState } from "react";
import "./TaskCreate.css";
import PropTypes from "prop-types";
import TasksContext from "../context/task";

export const TaskCreate = ({ updatedTask, setShowEdit }) => {
  const INITIAL_TASK = { title: "", desc: "" };

  const isUpdate = updatedTask !== undefined;
  const [taskForm, setTaskForm] = useState(
    isUpdate ? updatedTask : INITIAL_TASK
  );

  const { onCrud } = useContext(TasksContext);

  const handleInput = (e) =>
    setTaskForm({ ...taskForm, [e.target.name]: e.target.value });

  const handleCreate = (e) => {
    e.preventDefault();
    if (taskForm.title === "") return;
    onCrud("create", taskForm);
    setTaskForm(INITIAL_TASK);
  };

  const handleChange = (e) => {
    e.preventDefault();
    onCrud("update", taskForm);
    setShowEdit(false);
  };

  return (
    <div className={isUpdate ? "taskUpdateComponent" : "taskCreateComponent"}>
      <h3>{isUpdate ? "Please Update Task" : "Please Add Task"}</h3>
      <form className="taskForm">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          onChange={handleInput}
          value={taskForm.title}
        />
        <label htmlFor="desc">Task Description</label>
        <textarea
          name="desc"
          rows={5}
          onChange={handleInput}
          value={taskForm.desc}
        />
        {isUpdate ? (
          <button className="changeButton" onClick={handleChange}>
            Change
          </button>
        ) : (
          <button className="createButton" onClick={handleCreate}>
            Create
          </button>
        )}
      </form>
    </div>
  );
};

TaskCreate.propTypes = {
  updatedTask: PropTypes.object,
  setShowEdit: PropTypes.func,
};
