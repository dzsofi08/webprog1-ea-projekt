import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost/task6/api.php";

export default function App() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    nev: "",
    varos: "",
    ferohely: ""
  });
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    const res = await axios.get(API);
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId !== null) {
      await axios.put(API, {
        id: editId,
        nev: form.nev.trim(),
        varos: form.varos.trim(),
        ferohely: parseInt(form.ferohely)
      });

      setEditId(null);
    } else {
      await axios.post(API, {
        nev: form.nev.trim(),
        varos: form.varos.trim(),
        ferohely: parseInt(form.ferohely)
      });
    }

    setForm({ nev: "", varos: "", ferohely: "" });
    fetchData();
  };

  const handleEdit = (item) => {
    setForm({
      nev: item.nev,
      varos: item.varos,
      ferohely: item.ferohely
    });
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(API, {
      data: { id }
    });
    fetchData();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>task 6</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Név</label>
          <input
            type="text"
            name="nev"
            value={form.nev}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Város</label>
          <input
            type="text"
            name="varos"
            value={form.varos}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Férőhely</label>
          <input
            type="number"
            name="ferohely"
            value={form.ferohely}
            onChange={handleChange}
          />
        </div>

        <button type="submit">
          {editId ? "Frissítés" : "Hozzáadás"}
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Név</th>
            <th>Város</th>
            <th>Férőhely</th>
            <th>Műveletek</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nev}</td>
              <td>{item.varos}</td>
              <td>{item.ferohely}</td>
              <td>
                <button onClick={() => handleEdit(item)}>
                  Szerkeszt
                </button>
                <button onClick={() => handleDelete(item.id)}>
                  Töröl
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
