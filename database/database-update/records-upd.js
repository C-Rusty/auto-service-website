import recordController from "../../controllers/recordController.js";
import Records from "../../models/record-model.js";
import Record from "../../models/record-model.js";

class updateRecords {

    async createDay (nextDate, fortyMin) {
        for (let record = 0; record <= 14; record++) {
            const oneRecord = {
                name: 'empty',
                phone: 'empty',
                date: nextDate.slice(0, 10),
                time: new Date(fortyMin).toISOString().slice(11, 16),
                details: 'empty',
                isOccupied: false,
            }

            Records.create(oneRecord);
            fortyMin += 2400000;
        }
    }

    async deleteOldRecords () {
        let firstDateInRecords = await recordController.getFirstRecordDate();

        const request = {
            params: {
                date: firstDateInRecords,
                requestLocation: 'server'
            }
        };

        await recordController.getDateRecords(request).then(records => {
                for (let record of records) {
                    const timeInMs = (Number(record.time.split(':')[0]) * 60 * 60 * 1000) + (Number(record.time.split(':')[1] * 60 * 1000));
                    
                    if (Date.parse(new Date()) + 10800000 > (Date.parse(record.date) + timeInMs)) {
                        Record.findByIdAndDelete(record._id.toString(), (error) => {
                            if (error) console.log(error);
                        });
                    } else {
                        break;
                    }
                }
            });
    }

    async DayRecordsUPD () {

        let firstDateInRecords = await recordController.getFirstRecordDate();
        let lastDateInRecords = await recordController.getLastRecordDate();

        let daysPassed = ((Date.parse(new Date().toISOString().slice(0, 10)) - Date.parse(firstDateInRecords)) / (1000 * 60 * 60 * 24) % 30);
        console.log(`${daysPassed} days passed`);

        if (daysPassed <= 0) return console.log(`Records are up to date.`);

        while (daysPassed > 0) {
            Records.deleteMany({date: firstDateInRecords}, (error) => {
                if (error) return console.log(error);
            });

            firstDateInRecords = await recordController.getFirstRecordDate();

            const lastDate = new Date(lastDateInRecords);
            const nextDate = new Date(lastDate.getFullYear(), lastDate.getMonth(), (lastDate.getDate() + 1), 12, 0, 0, 0).toISOString();

            await this.createDay(nextDate, Date.parse(nextDate));
            lastDateInRecords = nextDate;

            daysPassed--;
        }

        this.deleteOldRecords()
    }
}

export default new updateRecords();