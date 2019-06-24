/* eslint-disable no-console */
const Connection = require('tedious').Connection
    // eslint-disable-next-line no-unused-vars
const Request = require('tedious').Request

// Create connection to database
const config = {
    authentication: {
        options: {
            userName: 'dicoding', // update me
            password: 'Fahmi1234567890', // update me
            connectTimeout: 0
        },
        type: 'default'
    },
    server: 'dicodingbayar.database.windows.net', // update me
    options: {
        database: 'sportest', // update me
        encrypt: false
    }
}
const connection = new Connection(config)

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err) {
    if (err) {
        console.log(err)
    } else {
        console.log('sukses')
            // queryDatabase();
    }
})

module.exports = connection