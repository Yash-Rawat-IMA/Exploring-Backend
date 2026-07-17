import {serve} from 'bun'

serve({
    fetch(request){
        const url = new URL(request.url)
        if(url.pathname === '/'){
            console.log(`Current URL: ${url.pathname}`)
            return new Response(`HEllO from Sporty Server currently running in bun`, {status:200})
        }else if(url.pathname === '/sports'){
            console.log(`Current Sporty URL: ${url}`)
            return new Response(`HELLO from sporty server Bun but now I am playing sports`, {status:200})
        }else{
            console.log(`Bad URL: ${url.pathname}`)
            return new Response(`404! This url: ${url.pathname} is not found`, {status: 404})
        }
    },
    port:3000,
    hostname:'127.0.0.1'
})