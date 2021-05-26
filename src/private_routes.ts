/**
 * Pivate Routes are those API urls that require the user to be
 * logged in before they can be called from the front end.
 * 
 * Basically all HTTP requests to these endpoints must have an
 * Authorization header with the value "Bearer <token>"
 * being "<token>" a JWT token generated for the user using 
 * the POST /token endpoint
 * 
 * Please include in this file all your private URL endpoints.
 * 
 */

import { Router, Request, Response, NextFunction } from 'express';
import { safe } from './utils';
import * as actions from './actions';
import jwt from 'jsonwebtoken';

// declare a new router to include all the endpoints
const router = Router();

//middleware/token
const verifyToken= (req: Request,res:Response, next:NextFunction) =>{
    //headers con el token
    const token = req.header('Authorization');
    if(!token) return res.status(400).json('ACCESS DENIED');

    const decoded = jwt.verify(token as string, process.env.JWT_KEY as string)
    req.user = decoded;
    console.log(decoded);
    
    next()
}

router.get('/users', verifyToken, safe(actions.getUsers));
router.post('/people', verifyToken,  safe(actions.createPeople));
router.put('/people/:id', verifyToken, safe(actions.updatePeople));
router.delete('/users/:id', safe(actions.deleteUsers));
router.post('/planets', verifyToken, safe(actions.createPlanets));
router.put('/planets/:id', verifyToken, safe(actions.updatePlanets));
router.post('/addFav/:userid/:planetid', verifyToken, safe(actions.addFavPlanet));

export default router;
