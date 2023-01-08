console.log("Server side code running.");

require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const fs = require('fs')

const app = express();

let app_log = ""

app.use(express.static("public"));

mongoose.connect(process.env.MONGOOSE_KEY)

eventsSchema = new mongoose.Schema({
  event: String,
  triggerTime: String
})

const Event = mongoose.model('Event', eventsSchema)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/log', (req, res) => {
  Event.find((err, events) => {
    if(err) {
      console.log(err);
    } else {
      events.forEach((a) => {
        app_log += (a.event + " --> " + a.triggerTime + "\n");
      })

      fs.writeFile('app.log', app_log, (err) => {
        if(err) throw err;
        console.log("Printed all logging in app.log file");
      })
    }
  })
})

app.post('/on', (req, res) => {

  const event = new Event({
    event: "On",
    triggerTime: new Date()
  })

  event.save((err) => {
    if(!err) {
      res.redirect('/')
      console.log('On Clicked, added to Database');
    }
  })
});

app.post('/trigger', (req, res) => {

  const event = new Event({
    event: "Trigger",
    triggerTime: new Date()
  })

  event.save((err) => {
    if(!err) {
      res.redirect('/')
      console.log('Trigger Clicked, added to Database');
    }
  })
});

app.post('/off', (req, res) => {

  const event = new Event({
    event: "Off",
    triggerTime: new Date()
  })

  event.save((err) => {
    if(!err) {
      res.redirect('/')
      console.log('Off Clicked, added to Database');
    }
  })
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
})