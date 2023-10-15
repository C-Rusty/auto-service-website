import recordService from "../services/record-service.js";

class recordController {

    async create(request, response) {
        try {
            return response.json(await recordService.createRecord(request.body));
        } catch (e) {
            response.status(500).json(e.message);
        }
    }

    async getAll(request, response) {
        try {
            return response.json(await recordService.getAll());
        } catch (e) {
            response.status(500).json(e.message);
        }
    }

    async getDateRecords(request, response) {
        try {
            if (request.params.requestLocation === `server`) {
                return await recordService.getDateRecords(request.params);
            } else {
                return response.json(await recordService.getDateRecords(request.params));
            }

        } catch (e) {
            console.log(e);
        }
    }

    async getDateRecordsForServer(request, response) {
        try {
            return await recordService.getDateRecords(request.params);
        } catch (e) {
            console.log(e);
        }
    }

    async getAllAvailableDates(request, response) {
        try {
            return response.json(await recordService.getAllAvailableDates());
        } catch (e) {
            response.status(500).json(e.message);
        }
    }

    async getAvailableTimeList (request, response) {
        try {
            return response.json(await recordService.getAvailableTimeList(request.params));
        } catch (e) {
            response.status(500).json(e.message);
        }
    }

    async getOne(request, response) {
        try {
            const {id} = request.params;
            if (!id) {
                response.status(400).json({message: "Not found"})
            }
            return response.json(await recordService.getOne(id));
        } catch (e) {
            response.status(500).json(e.message);
        }
    }

    async update(request, response) {
        try {
            return response.json(await recordService.update(request.body));
        } catch (e) {
            response.status(500).json(e.message);
        }
    }

    async delete(request, response) {
        try {
            return response.json(await recordService.delete(request.params._id));
        } catch (e) {
            response.status(500).json(e.message);
        }
    }

    async getFirstRecordDate(request, response) {
        try {
            return await recordService.getFirstRecordDate();
        } catch (e) {
            response.status(500).json(e.message);
        }
    }

    async getLastRecordDate(request, response) {
        try {
            return await recordService.getLastRecordDate();
        } catch (e) {
            response.status(500).json(e.message);
        }
    }

}

export default new recordController();