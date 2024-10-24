const gateway = require("fast-gateway");
const port = 9001;
import SuperTokens from 'supertokens-web-js';
import Session from 'supertokens-web-js/recipe/session';
import EmailPassword from 'supertokens-web-js/recipe/emailpassword' 

const server = gateway({
    routes: [
        {
            prefix: "/autenticacion",
            target: "",
            hooks: {}
        },
        {
            prefix: "/agendarCitas",
            target: "",
            hooks: {}
        }
    ]
})

SuperTokens.init({
    appInfo: {
        apiDomain: "",
        apiBasePath: "/auth",
        appName: "Proyecto_microservicios",
    },
    recipeList: [
        Session.init(),
        EmailPassword.init(),
    ],
});

server.start(port).then(server => {
    console.log("Gateway ejecutandose en el puerto: http://localhost:" + port);
})


