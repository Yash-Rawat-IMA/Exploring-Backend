const http = require('http')

const hostname = '127.0.0.1'

const port = 3000

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/plain')
        // res.statusMessage(`Hello I am good`)
        res.end("Hello from node server")
    }else if(req.url === '/sports'){
        res.statusCode = 200
        res.setHeader('Hello', "To you sports")
        res.setHeader('Hobbie', "Playing Sports")
        // res.setHeader('Content-Type', 'text/plain')
        console.log(`Playing Sports on ${req.url}`)
        res.end(`I am playing sports on ${hostname}:${port}`)

    }else{
        res.statusCode = 404
        res.setHeader('Content-type', 'text/plain')
        res.end("404! Not Found")
        console.log(`Bad URL : (${req.url})`)
    }
})

server.listen(port, hostname, () => {
    console.log(`Server is listening at http://${hostname}:${port}`)
})