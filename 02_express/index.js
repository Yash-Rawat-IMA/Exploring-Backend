// const express = require('express')
// Above one if using common JS
import express from 'express'
// this one used while using ES modules, package.json has "type": "module"

const app = express()

const port = 3000

app.use((req, res, next) => {
    console.log(`Response received on ${req.url}`)
    next();
})

app.get('/', (req, res) => {
    res.send(`Server is running on port: ${port}`)
})

app.get('/profile', (req, res) => {
    res.send(`Server is running on port: ${port}, and now this is your profile`)
})

app.get('/profile/:username', (req, res) => {

    const formattedName = req.params.username
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    res.send(`Server is running on port: ${port}, and now this is your profile: ${formattedName}`)
})
app.get('/contact', (req, res) => {
    res.send(`Server is running on port: ${port}, and now this is your contact`)
})

app.listen(port, () => {
    console.log(`Server is running at port: ${port}`)
})