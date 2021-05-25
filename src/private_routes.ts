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

import { Router } from 'express';
import { safe } from './utils';
import * as actions from './actions';
import { createPeople, createPlanets, updatePeople, updatePlanets } from './actions';

// declare a new router to include all the endpoints
const router = Router();

router.get('/users', safe(actions.getUsers));
router.post('/people', safe(createPeople));
router.put('/people/:id', safe(updatePeople));
router.post('/planets', safe(createPlanets));
router.put('/planets/:id', safe(updatePlanets));

export default router;
