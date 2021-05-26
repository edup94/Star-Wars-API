import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { User } from './entities/User'
import { Exception } from './utils'
import { Character } from './entities/Character'
import { Planet } from './entities/Planet'
import jwt from 'jsonwebtoken'

export const createUser = async (req: Request, res:Response): Promise<Response> =>{

	if(!req.body.first_name) throw new Exception("Please provide a first_name")
	if(!req.body.last_name) throw new Exception("Please provide a last_name")
	if(!req.body.email) throw new Exception("Please provide an email")
	if(!req.body.password) throw new Exception("Please provide a password")

	const userRepo = getRepository(User)
	// fetch for any user with this email
	const user = await userRepo.findOne({ where: {email: req.body.email }})
	if(user) throw new Exception("Users already exists with this email")

	const newUser = getRepository(User).create(req.body);  //Creo un usuario
	const results = await getRepository(User).save(newUser); //Grabo el nuevo usuario 
	return res.json(results);
}

export const getUsers = async (req: Request, res: Response): Promise<Response> =>{
		const user = await getRepository(User).find();
		return res.json(user);
}

export const updateUser = async (req: Request, res:Response): Promise<Response> =>{
    const user = await getRepository(User).findOne(req.params.id);
	if(user) {
        getRepository(User).merge(user, req.body);
        const results = await getRepository(User).save(user);
        return res.json(results);
    }
	return res.status(404).json({msg: "No user found."});
}

export const deleteUsers = async (req: Request, res: Response): Promise<Response> =>{
    const users = await getRepository(User).findOne(req.params.id);
    if(!users) {
        return res.json({ msg :"This user doesn't exist."});
    }else {
    const users = await getRepository(User).delete(req.params.id);
		return res.json(users);
    }	
}

export const createPeople = async (req: Request, res:Response): Promise<Response> =>{

	if(!req.body.name) throw new Exception("Please provide a name")
	if(!req.body.height) throw new Exception("Please provide a height")
	if(!req.body.mass) throw new Exception("Please provide a mass")
    if(!req.body.hairColor) throw new Exception("Please provide a hair color")
    if(!req.body.skinColor) throw new Exception("Please provide a skin color")
    if(!req.body.eyeColor) throw new Exception("Please provide an eye color")
    if(!req.body.birthYear) throw new Exception("Please provide a birth year")
    if(!req.body.gender) throw new Exception("Please provide a gender")
    
	const newChar = getRepository(Character).create(req.body);  
	const results = await getRepository(Character).save(newChar);
	return res.json(results);
}

export const getPeople = async (req: Request, res: Response): Promise<Response> =>{
		const people = await getRepository(Character).find();
		return res.json(people);
}

export const getPeopleById = async (req: Request, res: Response): Promise<Response> =>{
        const people = await getRepository(Character).findOne(req.params.id);
        if(!people) throw new Exception("Character with this Id doesn't exist.");
		return res.json(people);
}

export const updatePeople = async (req: Request, res:Response): Promise<Response> =>{
    const charRepo = getRepository(Character) 
	const char = await charRepo.findOne(req.params.id);
	if(!char) throw new Exception("Character with this id doesn't exist.");
	
	charRepo.merge(char, req.body); 
	const results = await charRepo.save(char);
	return res.json(results);
}

export const createPlanets = async (req: Request, res:Response): Promise<Response> =>{

	if(!req.body.name) throw new Exception("Please provide a name")
	if(!req.body.diameter) throw new Exception("Please provide a diameter")
	if(!req.body.rotationPeriod) throw new Exception("Please provide a rotation period")
    if(!req.body.orbitalPeriod) throw new Exception("Please provide an orbital period")
    if(!req.body.gravity) throw new Exception("Please provide gravity")
    if(!req.body.population) throw new Exception("Please provide population")
    if(!req.body.climate) throw new Exception("Please provide climate")
    if(!req.body.terrain) throw new Exception("Please provide terrain")
    if(!req.body.surfaceWater) throw new Exception("Please provide surface water")
    
	const newPlanet = getRepository(Planet).create(req.body);  
	const results = await getRepository(Planet).save(newPlanet);
	return res.json(results);
}

export const getPlanets = async (req: Request, res: Response): Promise<Response> =>{
		const planet = await getRepository(Planet).find();
		return res.json(planet);
}

export const getPlanetById = async (req: Request, res: Response): Promise<Response> =>{
        const planet = await getRepository(Planet).findOne(req.params.id);
        if(!planet) throw new Exception("Planet with this Id doesn't exist.");
		return res.json(planet);
}

export const updatePlanets = async (req: Request, res:Response): Promise<Response> =>{
    const planetRepo = getRepository(Planet) 
	const planet = await planetRepo.findOne(req.params.id);
	if(!planet) throw new Exception("Planet with this id doesn't exist.");
	
	planetRepo.merge(planet, req.body); 
	const results = await planetRepo.save(planet);
	return res.json(results);
}

export const login = async (req: Request, res: Response): Promise<Response> =>{
		
	if(!req.body.email) throw new Exception("Please specify an email on your request body", 400)
	if(!req.body.password) throw new Exception("Please specify a password on your request body", 400)

	const userRepo = await getRepository(User)

	// We need to validate that a user with this email and password exists in the DB
	const user = await userRepo.findOne({ where: { email: req.body.email, password: req.body.password }})
	if(!user) throw new Exception("Invalid email or password", 401)

	// this is the most important line in this function, it create a JWT token
	const token = jwt.sign({ user }, process.env.JWT_KEY as string, { expiresIn: 60 * 60 });
	
	// return the user and the recently created token to the client
	return res.json({ user, token });
}

export const addFavPlanet = async (req: Request, res: Response): Promise<Response> => {
    const planetRepo = getRepository(Planet)
    const userRepo = getRepository(User)
    const user = await userRepo.findOne(req.params.userid, {relations:["planets"]})
    const planet = await planetRepo.findOne(req.params.planetid)
    if (user && planet) {
        user.planets = [...user.planets,planet]
        const results = await userRepo.save(user)
        return res.json(results)
    }
    return res.json("Error")
}
