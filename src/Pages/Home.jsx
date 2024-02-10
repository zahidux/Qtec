import React, { useState } from "react";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTask, setEditTask] = useState(null);

  const handleChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim() === "") return;
    if (editTask !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editTask].name = newTask;
      setTasks(updatedTasks);
      setEditTask(null);
    } else {
      const newTasks = [
        ...tasks,
        { name: newTask, completed: false, priority: "low" },
      ];
      setTasks(newTasks);
    }
    setNewTask("");
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleEdit = (index) => {
    setEditTask(index);
    setNewTask(tasks[index].name);
  };

  const handleToggleCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handlePriorityChange = (index, priority) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].priority = priority;
    setTasks(updatedTasks);
  };

  return (
    <section>
      <div className="bg-slate-800 grid w-full justify-center py-48 text-white h-[900px]">
        <h1 className="text-4xl text-center font-bold mb-6">Todo List</h1>
        <form onSubmit={handleSubmit}>
          <div className=" my-7">
            <input
              type="text"
              placeholder="Add a new text"
              value={newTask}
              className="w-full inline py-3 shadow-lg pl-2 outline-0 rounded-xl border-b-4 border-b-orange-400"
              onChange={handleChange}
            />
            <button
              className="bg-orange-400 py-2 px-4 text-xl text-white font-semibold rounded-xl mt-8 w-full"
              type="submit"
            >
              {editTask !== null ? "Update" : "Add"}
            </button>
          </div>
        </form>
        <div>
          <p className="text-xl font-semibold">Total Tasks: {tasks.length}</p>
          <p className="text-xl font-semibold my-5">
            Completed Tasks: {tasks.filter((task) => task.completed).length}
          </p>
        </div>
        <ul>
          {tasks.map((task, index) => (
            <li key={index} className={task.completed ? "completed" : ""}>
              <span
                onClick={() => handleToggleCompletion(index)}
                style={{ cursor: "pointer", marginRight: "1rem" }}
              >
                {task.completed ? "✔️" : "◻️"}
              </span>
              <div className="inline">
                <div>
                  {" "}
                  <span className="text-2xl" style={{ marginRight: "1rem" }}>
                    {task.name}
                  </span>
                  <span style={{ marginRight: "1rem" }}>{task.priority}</span>
                </div>
                <div className="flex gap-5 mt-2">
                  <span
                    onClick={() => handlePriorityChange(index, "low")}
                    className="bg-green-500 py-2 px-3 rounded-lg text-white font-semibold"
                  >
                    Low
                  </span>
                  <span
                    onClick={() => handlePriorityChange(index, "medium")}
                    className="bg-yellow-400 py-2 px-3 rounded-lg text-white font-semibold"
                  >
                    Medium
                  </span>
                  <span
                    onClick={() => handlePriorityChange(index, "high")}
                    className="bg-red-500 py-2 px-3 rounded-lg text-white font-semibold"
                  >
                    High
                  </span>
                </div>
              </div>
              <div className="flex gap-5">
                <button
                  className="bg-orange-400 py-2 px-4 text-xl text-white font-semibold rounded-xl mt-8 "
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
                <button
                  className="bg-orange-400 py-2 px-4 text-xl text-white font-semibold rounded-xl mt-8 "
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Home;
