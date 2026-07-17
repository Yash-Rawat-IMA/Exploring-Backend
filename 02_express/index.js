// const express = require('express')
// Above one if using common JS
import express from 'express'
// this one used while using ES modules, package.json has "type": "module"

const app = express()

const port = 3000

app.use(express.json())
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next()
})

let sportsData = []
let nextId = 1

app.post('/sports', (req, res) => {
    const { name, players } = req.body
    const newSport = { id: nextId++, name, players }
    sportsData.push(newSport)
    console.log(`${newSport.name} is added`)
    res.status(201).send(newSport)
})

app.get('/sports', (req, res) => {
    console.log(sportsData)
    const html = `
        <h1>Current Sports List</h1>
        <ul>
            ${sportsData.map(
                sport => `<li>${sport.name} have ${sport.players} players in each team</li>`
            ).join('')}
        </ul>
    `
    res.status(200).send(html)
})

app.listen(port, () => {
    console.log(`Server is running at port: ${port}`)
})