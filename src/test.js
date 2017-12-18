var fs = require('fs')

var ttt = []

fs.readFile('123.txt', function(err, data){
    // console.log(data.toString())

    var a = data.toString().split('\r\n')
    var b = JSON.stringify(a)

    fs.writeFile('456.json', b, function(){})
})