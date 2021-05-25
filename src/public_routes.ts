
/**
 * Public Routes are those API url's that anyone can request
 * whout having to be logged in, for example:
 * 
 * POST /user is the endpoint to create a new user or "sign up".
 * POST /token can be the endpoint to "log in" (generate a token)
 */
import { Router } from 'express';
import { safe } from './utils';
import * as actions from './actions'

const router = Router();

// signup route, creates a new user in the DB
router.post('/users', safe(actions.createUser));
router.post('/login',safe(actions.login));
router.get('/people', safe(actions.getPeople));
router.get('/people/:id', safe(actions.getPeopleById));
router.get('/planets', safe(actions.getPlanets));
router.get('/planets/:id', safe(actions.getPlanetById));

export default router;
