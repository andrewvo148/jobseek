import "reflect-metadata";
import {createConnection, Tree} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import {Routes} from "./routes";
import * as expressJwt from "express-jwt";
import * as winston from "winston";
import * as  cors from 'cors';
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.splat(),
        winston.format.json(),
    ),
    transports: [
        //
        // - Write to all logs with level `info` and below to `logs/combined.log`
        // - Write all logs error (and below) to `logs/error.log`.
        //
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.splat(),
            winston.format.json(),
        ),
    }));
}
createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    app.use(express.static('public'))

    // Authentication
    app.use("/api/protected/**", expressJwt({
        secret: 'GcsVmCWMefaNKdFtKLxmnckpfDU=',
        credentialsRequired: true,
        getToken: (req: Request) => {
            if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                return req.headers.authorization.split(' ')[1];
            }
            return null;
        }
    }));
    
    // register express routes from defined application routes
    app.use((err: Error, req: Request, res: Response, next: Function) => {
        if (err.name === 'UnauthorizedError') {
            res.status(401).send('invalid token...');
        }
    });

    // development error handler
    // will print stracktrace
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.json({error: err, message: err.message});
        });
    }
    Routes.forEach(route => {
     
            (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
                return (new (route.controller as any))[route.action as any ](req, res, next);            
            });
    });


    // start express server
    app.listen(3000);
    logger.info("Express server has started on port 3000. Open http://localhost:3000/users to see results");

}).catch(error => logger.error(error));
