const sql = require('../config/vaccenterDB.js');

// constructor
const Vaccenter = function(vaccenter) {
    this.id = vaccenter.id;
    this.name = vaccenter.name;
    this.tel = vaccenter.tel;
}

Vaccenter.getAll = result => {
    sql.query("SELECT * FROM vaccenters", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return
        }
        console.log("Vaccenter: ", res);
        result(null, res);
    });
}

module.exports = Vaccenter;