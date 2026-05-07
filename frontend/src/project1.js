import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");

  const loadData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/products");
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const addProduct = async () => {
    if (!name || !quantity || !price) {
      alert("Please fill all fields");
      return;
    }

    await axios.post("http://localhost:5000/products", {
      name,
      quantity,
      price,
    });

    setName("");
    setQuantity("");
    setPrice("");

    setMessage("✅ Product added!");
    setTimeout(() => setMessage(""), 2000);

    loadData();
  };

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:5000/products/${id}`);
    setMessage("🗑️ Product deleted!");
    setTimeout(() => setMessage(""), 2000);
    loadData();
  };

  return (
    <div style={styles.container}>
      <motion.div
        style={styles.card}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Animated Heading */}
        <motion.h2
          style={styles.heading}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          📦 Inventory Dashboard
        </motion.h2>

        {/* Message */}
        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={styles.message}
          >
            {message}
          </motion.p>
        )}

        {/* Form */}
        <div style={styles.form}>
          <input
            style={styles.input}
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={(e) => (e.target.style.border = "1px solid #667eea")}
            onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
          />
          <input
            style={styles.input}
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            onFocus={(e) => (e.target.style.border = "1px solid #667eea")}
            onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
          />
          <input
            style={styles.input}
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            onFocus={(e) => (e.target.style.border = "1px solid #667eea")}
            onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
          />

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={styles.addBtn}
            onClick={addProduct}
          >
            Add
          </motion.button>
        </div>

        {/* Table */}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Qty</th>
              <th style={styles.th}>Price (₹)</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <motion.tr
                key={p.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <td style={styles.td}>{p.name}</td>
                <td style={styles.td}>{p.quantity}</td>
                <td style={styles.td}>{p.price}</td>
                <td style={styles.td}>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={styles.deleteBtn}
                    onClick={() => deleteProduct(p.id)}
                  >
                    Delete
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}

const styles = {
  container: {
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    minHeight: "100vh",
    padding: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "#ffffff",
    padding: "25px",
    borderRadius: "15px",
    width: "750px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "15px",
  },
  message: {
    textAlign: "center",
    color: "green",
    marginBottom: "10px",
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    flex: 1,
    outline: "none",
    transition: "0.3s",
  },
  addBtn: {
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  deleteBtn: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    textAlign: "center",
  },
};

export default App;