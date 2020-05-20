//setting up express server
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

//Routers
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/users");
const appartmentRoutes = require("./routes/appartment");

app.use(express.json());
app.use(cookieParser());

//setting up routes
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/appartment", appartmentRoutes);

const PORT = 5000;

// starting server at PORT
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
