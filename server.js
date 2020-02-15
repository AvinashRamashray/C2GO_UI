var express = require('express');
var formidable = require('formidable');
const path = require('path');
const fs = require('fs');

var app = express();

app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/', function (req, res){
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/', function (req, res){
    var form = new formidable.IncomingForm();

    form.parse(req);

    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/data/' + file.name;
         var source = fs.createReadStream(file.path);
         var dest = fs.createWriteStream(__dirname);
    source.pipe(dest);
    source.on('end',function(){});
    source.on('error',function(err){
       if(err){
          return console.error(err);
       }
       else {
         console.log("success!");
       }
     });
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
    });

    return res.json(200, {
	result: 'Upload Success'
    });
});
app.listen(3000, () => console.log('Server app listening on port 3000!'))
