import cookieParser from "cookie-parser";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./Utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
dotenv.config({});
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "PUT"],
  },
});

// middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOption = {
  origin: ["http://localhost:8000", "http://localhost:5173"],

  // Allow specific methods
  methods: ["GET", "POST", "PUT", "DELETE"],

  // Allow specific headers
  headers: ["Content-Type", "application/json"],
  Credentials: true,
};

app.use(cors(corsOption));

const PORT = process.env.PORT || 8000;

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

io.on("connection", (socket) => {
  socket.on("message", (data) => {
    console.log(data);
    socket.broadcast.emit("receive-message", data);
  });
  // socket.broadcast.emit("welcome", `welcome to the server ${socket.id}`);
});

server.listen(PORT, () => {
  connectDB();
  console.log(`server is run at port ${PORT} `);
});
