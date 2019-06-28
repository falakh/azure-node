var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var azure = require('azure-storage');
var port = process.env.PORT || 3000;
var db = require("./database")
var cors = require("cors")
app.use(cors());
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

var multer = require('multer')
var MulterAzureStorage = require('multer-azure-storage')
var upload = multer({
  storage: new MulterAzureStorage({
    azureStorageConnectionString: 'DefaultEndpointsProtocol=https;AccountName=dicodingstorage;AccountKey=WJL8aSlCyhU5uLeG58QXvFXvtno7XXiBQLXKb5ngtOh8u060uTB/DrJl+Gg9l581QpNti7i0INAgHW27/RXp5g==;EndpointSuffix=core.windows.net',
    containerName: 'photos',
    containerSecurity: 'blob'
  })

})

app.get('/api', function (req, res) {
  db.runSelect((result) => {
    var hasil = [];
    result.forEach(element => {
      var current = []
      element.forEach(column => {
        var value = column.value
        var key = column.metadata.colName
        // console.log(column)
        var data = {}
        var kunci = String(key)
        current.push({ kunci, value })
      })
      hasil.push(current)
    })
    res.send(hasil)
  })
})
io.on('connection', function (socket) {
  socket.on('chat message', function (msg, name) {
    db.insert(msg, name, (data) => {
      io.emit('chat message', msg, name)
    })
      ;
  });
});

http.listen(port, function () {
  console.log('listening on *:' + port);
});



app.post("/upload", upload.single("file"), function (req, res) {
  res.send(req.file)

})

app.get("/upload",(req,res)=>{
  res.sendFile(__dirname+"/upload.html")
})

app.get("/list", function (req, res) {
  var blobService = azure.createBlobService('DefaultEndpointsProtocol=https;AccountName=dicodingstorage;AccountKey=WJL8aSlCyhU5uLeG58QXvFXvtno7XXiBQLXKb5ngtOh8u060uTB/DrJl+Gg9l581QpNti7i0INAgHW27/RXp5g==;EndpointSuffix=core.windows.net');
  var fs = require('fs');
  blobService.getBlobToStream('photos', 'taskblob', fs.createWriteStream('output.txt'), function (error, result, response) {
    if (!error) {
      res.send(result)
    }else{
      throw error
    }
  });
})
