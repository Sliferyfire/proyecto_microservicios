const gateway = require("fast-gateway");
const port = 9001;

const server = gateway({
    routes: [
        {
            prefix: "/auth",
            target: "http://localhost:8001",
            hooks: {
                onRequest: (req, res) => {
                    console.log("Solicitud para autenticacion: " + req.url);
                }
            }
        }
    ],
    middlewares: [
        (req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            if (req.method === 'OPTIONS') {
                res.writeHead(200);
                return res.end();
            }
            next();
        }
    ]
})

server.start(port).then(server => {
    console.log("Gateway ejecutandose en el puerto: " + port);
})


