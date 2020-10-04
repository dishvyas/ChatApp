const express = require("express");
const cors = require("cors");
const body = require("body-parser");
const connectDB = require('./config/database');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const socketModule = require('./socket/socket')(io);
const api = require("./routes/api.js");

app.use(cors());
app.use(body.json()); 
   
const dotenv = require("dotenv");
dotenv.config({ path: './config/config.env' });
   
app.use("/api", api);
   
connectDB();
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Server running in ${
        process.env.NODE_ENV
        } mode on port ${PORT}`);
})

   

   
