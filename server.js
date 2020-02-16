var express = require('express');
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');

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
    });
    
    /*form.on('fileBegin', function (name, file){
        file.path = __dirname + '/data/' + file.name;
        console.log('File Path:',file.path);
        var oldPath = file.path;
        var newPath = '/home/ubuntu/go/src/github.com/elliotchance'+'/c2go/'+file.name;
        var source = fs.createReadStream(oldPath);
        var dest = fs.createWriteStream(newPath);
        source.pipe(dest);
        source.on('end',function(){console.log('Sucessfully copied');});
        source.on('error',function(err){
        if(err){
          return console.error(err);
        }
        else {
         console.log("success!");
        }
      });
    });*/
    

 /*form.on('fileBegin', function (name, file){
    file.path = __dirname + '/data/' + file.name;
    console.log('File Path:',file.path);
    var copyFile = (file,dir2)=>{
      //include the fs,path modules
    var fs = require('fs');
    var path = require('path');
    //get file name and add it to dir2
    var f = path.basename(file);
    var source = fs.createReadStream(file);
    var dest = fs.createWriteStream(path.resolve(dir2,f));
    source.pipe(dest);
    source.on('end',function(){console.log('Sucessfully copied');});
    source.on('error',function(err){
        if(err){
          return console.error(err);
        }
        else {
         console.log("success!");
        }
      });
    };
    copyFile('file.path','/home/ubuntu/go/src/github.com/elliotchance/c2go');
   });
   */
    

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
    });

    return res.json(200, {
	result: 'Upload Success'
    });
});
app.listen(3000, () => console.log('Server app listening on port 3000!'))
