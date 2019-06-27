var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var db = require("./database")
var cors = require("cors")
app.use(cors());
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/api',function(req,res){
  db.runSelect((result)=> {
    var hasil = [];
    result.forEach(element=>{
      var current = []
      element.forEach(column=>{
        var value = column.value
        var key = column.metadata.colName
        // console.log(column)
        var data = {}
        var kunci = String(key)
        current.push({kunci,value})
      })
      hasil.push(current)
    })
    res.send(hasil)
  })
})
io.on('connection', function(socket){
  socket.on('chat message', function(msg,name){
    db.insert(msg,name,(data)=>{
      io.emit('chat message', msg,name)
    })
    ;
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
