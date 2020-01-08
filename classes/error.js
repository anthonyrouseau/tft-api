class RiotError {
    constructor(err){
        this.message = err.response.data.status.message;
        this.code = err.response.data.status.status_code;
        this.wait = err.response.headers['retry-after'];
    }
}

module.exports = RiotError;