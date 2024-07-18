import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/Dashboard.css";

function Dashboard() {
  const [entries, setEntries] = useState([]);
  const [total, setTotal] = useState(0);
  const [form, setForm] = useState({
    date: "",
    food: "",
    cost: "",
    mealType: "breakfast",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5050/api/food-entries`
      );
      // console.log("response:::::::", response);
      setEntries(response.data.entries);
      setTotal(response.data.total);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const response = await axios.put(
          `http://localhost:5050/api/food-entries/${editingId}`,
          form
        );
        // setEntries(entries.map(entry => entry._id === editingId ? response.data : entry));
        fetchEntries();
        toast.success("Entry updated successfully!");
      } else {
        const response = await axios.post(
          `http://localhost:5050/api/food-entries`,
          form
        );
        setEntries([...entries, response.data]);
        setTotal(total + parseFloat(form.cost));
        toast.success("Entry added successfully!");
      }
      setForm({ date: "", food: "", cost: "", mealType: "breakfast" });
      setEditingId(null);
    } catch (error) {
      toast.error("Error adding entry!");
    }
  };

  const handleEdit = (entry) => {
    setForm({
      date: entry.date,
      food: entry.food,
      cost: entry.cost,
      mealType: entry.mealType,
    });
    setEditingId(entry._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5050/api/food-entries/${id}`);
      //   setEntries(entries.filter(entry => entry._id !== id));
      fetchEntries();
      toast.success("Entry deleted successfully!");
    } catch (error) {
      toast.error("Error deleting entry!");
    }
  };

  return (
    <div className="dashboard">
      <h1>Monthly Food Expenses</h1>
      <p>Total: ${total}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="food"
          value={form.food}
          onChange={handleChange}
          placeholder="Food Item"
          required
        />
        <input
          type="number"
          name="cost"
          value={form.cost}
          onChange={handleChange}
          placeholder="Cost"
          required
        />
        <select
          name="mealType"
          value={form.mealType}
          onChange={handleChange}
          required
        >
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="snack">Snack</option>
        </select>
        <button type="submit">
          {editingId ? "Update Entry" : "Add Entry"}
        </button>
      </form>
      <ul>
        {entries.map((entry) => (
          <li key={entry._id}>
            {new Date(entry.date).toLocaleDateString()}: ${entry.cost} -{" "}
            {entry.food} ({entry.mealType})
            <button onClick={() => handleEdit(entry)}>Edit</button>
            <button onClick={() => handleDelete(entry._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
