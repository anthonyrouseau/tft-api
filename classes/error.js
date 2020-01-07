class RiotError {
    constructor(err){
        this.message = err.response.data.status.message;
        this.code = err.response.data.status.status_code;
    }
}

module.exports = RiotError;