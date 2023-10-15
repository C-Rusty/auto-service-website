import Record from "../models/record-model.js";

class recordService {
    async createRecord(record) {
        return Record.create({...record});
    }

    async getAll() {
        return Record.find().sort({date: 1, time: 1});
    }

    async getDateRecords(params) {
        if (!params) throw new Error(`Params isn't specified... ${params}`);
        return Record.find({date: params.date}).sort({time: 1});
    }

    async getAllAvailableDates() {
        return Record.find().distinct('date', {isOccupied: false});
    }

    async getAvailableTimeList(data) {
        return Record.find().distinct('time', {date: data.date, isOccupied: false});
    }

    async getOne(_id) {
        if (!_id) {
            throw new Error ('ID isn`t specified');
        }
        return Record.findById(_id);
    }

    async update(record) {
        if (!record._id) {
            throw new Error('ID is not specified');
        }
        return Record.findByIdAndUpdate(record._id, record, {new: true})
    }

    async delete(_id) {
        if (!_id) {
            throw new Error('ID is not specified');
        }
        return Record.findByIdAndDelete(_id);
    }

    async getFirstRecordDate() {
        const firstRecord = await Record.find().sort({_id: 0}).limit(1);
        return firstRecord[0].date;
    }

    async getLastRecordDate() {
        const lastRecord = await Record.find().sort({_id: -1}).limit(1);
        return lastRecord[0].date;
    }
}

export default new recordService();