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
       },
    type: 'default'
  },
  server: 'dicodingbayar.database.windows.net', // update me
  options: {
    database: 'sportest', // update me
    encrypt: true,
    rowCollectionOnRequestCompletion:true
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

function queryDatabase(onClear) {
  console.log('Reading rows from the Table...')

  // Read all rows from table
  // eslint-disable-next-line handle-callback-err
  const request = new Request('SELECT * FROM USERS',(err,rowCount,rows)=>{
    if(err) throw err
    onClear(rows)
  })
  connection.execSql(request)
}

function insertDatabase(name,chat,onClear) {
  console.log('Reading rows from the Table...')

  // Read all rows from table
  // eslint-disable-next-line handle-callback-err
  const request = new Request(`INSERT INTO USERS (name,family) values('${name}','${chat}')`,(err,rowCount,rows)=>{
    if(err) throw err
    onClear(rows)
  })
  connection.execSql(request)
}

module.exports.connection = connection
module.exports.runSelect = queryDatabase
module.exports.insert = insertDatabase
