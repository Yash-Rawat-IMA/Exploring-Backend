// const express = require('express')
// Above one if using common JS
import express from 'express'
// this one used while using ES modules, package.json has "type": "module"

const app = express()

const port = 3000

// These two middleware functions tell Express how to parse incoming request bodies.
// Parses requests with a JSON body.
app.use(express.json())

// Parses URL-encoded form data (typically from HTML forms).
app.use(express.urlencoded({extended:true}))
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next()
})

let sportsData = []
let nextId = 1

// Route to post and store the sports in the array
app.post('/sports', (req, res) => {
    const { name, players } = req.body
    const newSport = { id: nextId++, name, players }
    sportsData.push(newSport)
    console.log(`${newSport.name} is added`)
    res.status(201).json(newSport)
})

// Showing the list of sports available
app.get('/sports', (req, res) => {
    console.log(sportsData)
    const html = `
        <h1>Current Sports List</h1>
        <ul style="list-style:none; padding:0px; margin:0px; background-color:gray; color:white;">
            ${sportsData.map(
                sport => `<li>${sport.name} have ${sport.players} players in each team</li>`
            ).join('')}
        </ul>
    `
    res.status(200).send(html)
})

// Getting the sports with specific id using dynamic routing
app.get('/sports/:id', (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).send('Invalid sport id');
    }
    const sport = sportsData.find(sport => sport.id === (id))
    // because everything comes in url params is in string format that's why parsing it to int is important for type checking and matching the id as it is stored
    console.log(sport)
    if(sport){
        res.status(200).send(`This is your sport: ${sport.name} with ${sport.players} players`)
        // res.send(result)
    }else{
        res.status(404).send(`Can not find the sports with this id: ${req.params.id}`)
    }
})

// Updating the sport using "put" route
app.put('/sports/:id', (req, res) => {
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
        return res.status(400).send('Invalid sport id');
    }
    const s = sportsData.find(sport => sport.id === id)
    if(!s){
        return res.status(404).send('No such sport found')
    }

    const {name, players} = req.body
    s.name = name
    s.players = players

    res.status(200).json(s)
})

// Removing the sport
app.delete('/sports/:id', (req, res)=>{
    const id = Number(req.params.id)
    const index = sportsData.findIndex(sport => sport.id === id)
    if(index === -1){
        return res.status(404).send(`No such sport found`)
    }
    // sportsData = sportsData.filter(s => s.id !== id)

    sportsData.splice(index, 1)
    res.status(200).json(sportsData)
})

app.listen(port, () => {
    console.log(`Server is running at port: ${port}`)
})