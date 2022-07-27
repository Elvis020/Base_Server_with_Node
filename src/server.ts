import express, { Router, Request, Response, response } from "express";
import bodyParser from "body-parser";

import { Car, cars as cars_list } from "./cars";
import { request } from "http";

(async () => {
  let cars: Car[] = cars_list;

  //Create an express application
  const app = express();
  //default port to listen
  const port = 8082;

  //use middleware so post bodies
  //are accessible as req.body.{{variable}}
  app.use(bodyParser.json());

  // Root URI call
  app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Welcome to the Cloud!");
  });

  // Get a greeting to a specific person
  // to demonstrate routing parameters
  // > try it {{host}}/persons/:the_name
  app.get("/persons/:name", (req: Request, res: Response) => {
    let { name } = req.params;

    if (!name) {
      return res.status(400).send(`name is required`);
    }

    return res.status(200).send(`Welcome to the Cloud, ${name}!`);
  });

  // Get a greeting to a specific person to demonstrate req.query
  // > try it {{host}}/persons?name=the_name
  app.get("/persons/", (req: Request, res: Response) => {
    let { name } = req.query;

    if (!name) {
      return res.status(400).send(`name is required`);
    }

    return res.status(200).send(`Welcome to the Cloud, ${name}!`);
  });

  // Post a greeting to a specific person
  // to demonstrate req.body
  // > try it by posting {"name": "the_name" } as
  // an application/json body to {{host}}/persons
  app.post("/persons", async (req: Request, res: Response) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send(`name is required`);
    }

    return res.status(200).send(`Welcome to the Cloud, ${name}!`);
  });

  // @TODO Add an endpoint to GET a list of cars
  app.get("/cars", (req: Request, res: Response) => {
    let { make } = req.query;
    let cars_list = cars;

    // cars_list = cars.filter(car => car.make == make)
    if (make) {
      cars_list = cars_list.filter((car) => car.make == make);
    }

    return res.status(200).send(cars_list);
  });
  // it should be filterable by make with a query parameter

  // @TODO Add an endpoint to get a specific car
  app.get("/cars/:id", (req: Request, res: Response) => {
    let { id } = req.params;

    if (!id) {
      return res.status(400).send(`id is required`);
    }

    // try to find the car by id
    const car = cars.filter((car) => car.id == parseInt(id));

    // respond if no cars is found
    if (car && car.length > 0) {
      return res.status(200).send(car);
    }

    // respond if a car is found
    return res.status(404).send(`Car with id:${id} not found`);
  });
  // it should require id
  // it should fail gracefully if no matching car is found

  /// @TODO Add an endpoint to post a new car to our list
  // it should require id, type, model, and cost
  app.post("/cars/", async (req: Request, res: Response) => {
    const { id, type, model, cost, make } = req.body;
    if (!id || !type || !model || !cost) {
      return res.status(400).send(`name,type,model,make and cost is required`);
    }
    // Create a new car
    const new_car: Car = {
      make: make,
      type: type,
      model: model,
      cost: cost,
      id: id,
    };
    // Add new car to list
    cars.push(new_car);

    // respond
    return res.status(201).send(new_car);
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
