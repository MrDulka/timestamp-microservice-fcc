var express = require("express");
var moment = require("moment");

var app = express();

app.set('port', (process.env.PORT || 5000));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/:time", function(req, res){
  var formattedTime = formatTime(req.params.time);
  res.status(200).end(formattedTime);
});

app.get("/", function(req, res){
  res.status(200).render("pages/index");
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

function formatTime(time){
  var date = new Date(time);

  if (!isNaN(+date)){
    return JSON.stringify ({
      "unix": +date,
      "natural": moment(date).format("MMMM DD, YYYY")
    });
  }

  return JSON.stringify ({
    "unix" : null,
    "natural": null
  });

  /*  var unixTime = moment(time, "x").valueOf();

    if(unixTime === +time){
      return JSON.stringify ({
        "unix": unixTime,
        "natural": moment(unixTime, "x").format("MMMM DD, YYYY")
      });
    }*/
}
