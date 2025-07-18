const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// ✅ This must point to a valid router
app.use("/api/auth", require("./routes/auth"));
app.use("/api/boards", require("./routes/board"));
app.use("/api/notes", require("./routes/note"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
