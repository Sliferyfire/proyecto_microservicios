const gateway = require("fast-gateway");
const port = 9001;

const server = gateway({
    routes: [
        {
            prefix: "/auth",
            target: "https://microservicioauth.onrender.com/authentication/signUp",
            hooks: {
                onRequest: (req, res) => {
                    console.log("Solicitud para autenticacion: " + req.url);
                }
            }
        },
        {
            prefix: "/agendar",
            target: "http://localhost:8002",
            hooks: {
                onRequest: (req, res) => {
                    console.log("Solicitud para agendar cita: " + req.url);
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


