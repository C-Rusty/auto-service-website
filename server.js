import express from 'express';
import mongoose  from "mongoose";
import router from "./routing/router.js";
import http from 'http';
import dotenv from 'dotenv';
import cors from "cors";
import cookieParser from 'cookie-parser';
import {Server} from "socket.io";
import Record from "./models/record-model.js";
import errorMiddleware from "./middleware/error-middleware.js";
import recordsUpd from "./database/database-update/records-upd.js";

dotenv.config();

const DB_URL = 'mongodb+srv://rost9911:Neymarisc0nt!@cluster0.ehy1pmj.mongodb.net/?retryWrites=true&w=majority';

const PORT = 4000;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        credentials: true,
        origin: "http://localhost:3000",
    }
});

app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        credentials: true,
        origin: "http://localhost:3000",
    }
));

app.use('/', router);
app.use(errorMiddleware);

const startApp = async () => {
    try {
        mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });
        server.listen(PORT, () => console.log("server started on port " + PORT));
        
        recordsUpd.deleteOldRecords();
        recordsUpd.DayRecordsUPD();
        
        setInterval(() => recordsUpd.DayRecordsUPD(), 10 * 60 * 60 * 1000);
        setInterval(() => recordsUpd.deleteOldRecords(), 1 * 60 * 1000);
    } catch (e) {
        console.log(e);

    }
}

io.on('connection', (socket) => {

    socket.on('new-record', (newRecord) => {
        Record.create(newRecord, (error) => {
            if (error) return console.log(error);
        });
        io.emit('new-record', newRecord);
    });

    socket.on('booked-record', (bookedRecord) => {
        Record.findOneAndUpdate({date: bookedRecord.date, time: bookedRecord.time}, bookedRecord, (error) => {
            if (error) return console.log(error);
        });
        io.emit('occupied-record', bookedRecord);
    });

    socket.on('delete-record-by-date', (date) => {
        Record.findOneAndDelete({date: date}, (error) => {
            if (error) return console.log(error);
        });
    });
    
    socket.on('delete-record', (recordToDelete) => {
        Record.findOneAndDelete({date: recordToDelete.date, time: recordToDelete.time}, (error) => {
            if (error) return console.log(error);
        });
    });

    socket.on('delete-record-by-id', (recordId) => {
        Record.findByIdAndDelete({_id: recordId}, (error) => {
            if (error) return console.log(error);
        });
    });

});

startApp();