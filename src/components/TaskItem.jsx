import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { TaskCreate } from "./TaskCreate";
import "./TaskItem.css";
import TasksContext from "../context/task";

export const TaskItem = ({ task }) => {
  const { title, desc } = task;
  const [showEdit, setShowEdit] = useState(false);
  const { onCrud } = useContext(TasksContext);

  return (
    <div className="TaskItem">
      {showEdit ? (
        <TaskCreate updatedTask={task} setShowEdit={setShowEdit} />
      ) : (
        <>
          <h3>Task Title</h3>
          <p>{title}</p>
          <h3>Description</h3>
          <p>{desc}</p>
          <div>
            <button
              className="taskDeleteButton"
              onClick={() => {
                onCrud("delete", task);
              }}
            >
              Delete
            </button>
            <button
              className="taskUpdateButton"
              onClick={() => {
                setShowEdit(true);
              }}
            >
              Update
            </button>
          </div>
        </>
      )}
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
};
