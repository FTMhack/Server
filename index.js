// add express js and first route
import express from 'express';
import bodyParser from 'body-parser';
import { addressSecurity, approvalSecurity, dappSecurity, default as test, supportedChains, tokenSecurity } from './goplus/index.js';
const app = express();
const port = 3000;

import swaggerAutogen from 'swagger-autogen';
const outputFile = "./swagger.json";
const endpointsFiles = ["./index.js"];
const config = {}
swaggerAutogen()(outputFile, endpointsFiles, config).then(async () => {
    await import('./index.js');
});

//import logger 
import logger from 'morgan';
app.use(logger('combined'));


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));


//create documentation html page from swagger.json from node 16
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//add logger to log every requests
// app.use(function (req, res, next) {
//     console.log('Time:', Date.now());
//     console.log('Request URL:', req.originalUrl);
//     console.log('Request Type:', req.method);
//     console.log('Request Body:', req.body);
//     next();
// });



app.post('/addressSecurity',
    function (req, res, next) {
        if (req.body) {
            if (!req.body.chain) {
                return res.status(400).send({ error: 'chain is required' });
            }
            if (!req.body.address) {
                return res.status(400).send({ error: 'address is required' });
            }
        }
        next();
    },
    async (req, res) => {
        let data = await addressSecurity(req.body.chain, req.body.address);
        return res.send(data);
    });

app.post('/approvalSecurity',
    function (req, res, next) {
        if (req.body) {
            if (!req.body.chain) {
                return res.status(400).send({ error: 'chain is required' });
            }
            if (!req.body.address) {
                return res.status(400).send({ error: 'address is required' });
            }
        }
        next();
    },
    async (req, res) => {
        let data = await approvalSecurity(req.body.chain, req.body.address);
        return res.send(data);
    });

app.get('/supportedChains',
    function (req, res, next) {
        if (req.query) {
            if (!req.query.apiName) {
                return res.status(400).send({ error: 'apiName is required' });
            }
        }
        next();
    },
    async (req, res) => {

        let data = await supportedChains(req.query.apiName);
        return res.send(data);
    }
);

// route to get token security

app.post('/tokenSecurity', function (req, res, next) {
    if (req.body) {
        if (!req.body.chain) {
            return res.status(400).send({ error: 'chain is required' });
        }
        if (!req.body.address) {
            return res.status(400).send({ error: 'address is required' });
        }
        //if address is not an array return error
        if (!Array.isArray(req.body.address)) {
            return res.status(400).send({ error: 'address must be an array of tokens' });
        }
    }
    next();
},
    async (req, res) => {
        let data = await tokenSecurity(req.body.chain, req.body.address);
        return res.send(data);
    });

app.post('/dappSecurity', function (req, res, next) {
    if (req.body) {
        if (!req.body.dapp) {
            return res.status(400).send({ error: 'dapp is required' });
        }
    }
    next();
},
    async (req, res) => {
        let data = await dappSecurity(req.body.dapp)
        return res.send(data);
    });
