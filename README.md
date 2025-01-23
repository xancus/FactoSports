## Tech stack
- Reverse proxy: Nginx
- Server: Gunicorn
- Rest API: Flask
- BBDD: PostgreSQL
- Test: PyTest
- Frontend: NextJS
- Auth: NextAuth

## 🚀 Getting Started

**Steps**:

1. Clone this repository:
   
```bash
git clone https://github.com/xancus/FactoSport.git
```

2. Build docker:

```bash
docker-compose build
```

3. The backend service will run on port 5000, and the frontend service on port 3000. Make sure both are available for the project to work properly.

4. Run the docker using the docker-compose.yml file:

```bash
docker-compose -f docker-compose.yml up -d
```

The very first time you run the application, it will populate the database with some data so you can check how everything works.

5. Since we are using Nginx to simulate having a real domain, you can access it directly at https://localhost/ ,**without specifying any port**, to enjoy de "user" experience (you will see a warning page because of the self-signed certificate, just accept it). If your system has the port 443
Nginx handles the redirections, so t is important not to run the application from https://localhost:3000 as it might work initially, but the backend calls will fail. If you want to run it using ports you must update the frontend environment variables.


If your system has port 443 in use, it may cause an error when running the application. This wouldn't happen in production, but you can change the port Nginx listens to from 443 to any other available port and then start your application, specifying this same port and visiting https://localhost:XXXX/

6. If you want to manage the database you can access the "/admin" route. You will se a sign-in page, which clarifies that it must be a protected route. You can sign in with the following credentials:
- user: admin
- password: admin

## Future improvments and pending features

- I would like to add a section on the admin page where the administrator can manage the restrictions independently. Currently, if you delete a feature value that has a restriction with another feature value, the restriction is also removed, and the administrator is unable to reassign the restriction if he wants to recreate the feature value.

- The components used to modify the database from the admin page have been created independently to prevent any future modifications to one of them specifically. However, considering that in a real project we could discuss the requirements with the client to understand them better, this could be done differently to reuse components. Similarly, I would like to improve the appearance of the popups used as a forms on this page. If we had a global state, for example using Zustand, we could offer the entire product creation flow with its features and values in the same popup, avoiding prop drilling and resulting in a much cleaner code. For instance, we could use a step-by-step popup like in many installation processes.

- I have added some tests in the backend to test the endpoints, functionalities, and integration with the database, but I would have liked to add end-to-end tests to ensure the entire flow of the application.

- Regarding the design, I would have liked to implement a more attractive design, both for the main page and for the products. I haven't had time to populate the database with a lot of data, so I wasn't able to implement pagination or infinite scroll, which would have been an interesting feature to add.

- Currently, the shopping cart is managed using local storage, which is fine, but it would also be useful to create a new table in the database that stores customer data, allowing for more efficient management of potential changes in stock or product prices in the cart.

- Create a scenario where we allow users to register and enhance their experience based on their activity and the content they like. We could then use a tool like Celery to handle background tasks.

- About the models, now I would link the product table with the possible values for each feature. This way, we could customize each product with the same feature and different options.

## Docker

We use Docker to run all the services, ensuring the correct installation of dependencies and the proper functioning of the application. I have created two files to run the project: one for production, "docker-compose.yml", and another for development, "docker-compose.dev.yml". The first file should be executed for production use, while the second one was added to provide a different configuration for development. I didn't include a database in the development configuration since I initially started using a local database, and I kept it this way to reflect that setup. Additionally, you can see how it uses other configuration files, such as ".env.dev" or "env.development.local", which allow each user to configure the same variables as the ".env" files, but with their private data.

You can run your project without docker also, but in that case you have to update the environment variables to ensure that the calls between the frontend and backend work properly. Additionally, you must create your own PostgreSQL database and specify the "development" FLASK_ENV variable, or using "testing" and it will automatically create an instance folder with the database inside

## NextJS

Next.js has been one of my most used frameworks recently, so I decided to use it for this project as I was already very familiar with its functionality. However, I wasn't able to fully leverage its potential as much as I would have liked, given the limited time available to complete all the tasks that were requested. At first I thought abous using TypeScript to develop the application, but again, due to time constraints, I decided to skip it in order to avoid dealing with types and use JavaScript directly to move faster. However, I did use the Zod library to check the types of data sent to the backend before making any request that involves modifying the database. 

## Authentication

Authentication was not required, but I've used NextAuth to manage access to the "/admin" route. This login is not stored in the database and is saved as a session cookie that expires after a specified time. To achieve this, I added a middleware that checks whether the user has an active session when attempting to access the "/admin" route.

## Rest API

I chose to use Flask because it is the framework I currently feel most comfortable with. Flask is lightweight, minimalist and more flexible than FastAPI making it a great option for quickly building applications. Altough I considered usnig FastAPI, which is asynchronous and generally offers better performance for certain type of applications, I decided to go with Flask due to the limited time available for the project. Given my familiarity with Flask, it allowed me to move faster and implement the application more efficiently.

## Server

At this point, given that we are working with Flask I decided to use Gunicorn to serve our application.

**Why Gunicron**?

Gunicorn is highly scalable, it allows us to handle multiple requests concurrently by running our application with multiple worker processes. This enables our application to handle high traffic loads, making it suitable for production.

**How does it works**?

Gunicorn supports easy configuration of workers and threads to enhance the performance of the application. For example, we can specify the number of workers processes and threads as follows:

``gunicorn --workers 4 --threads 4 app:app``

## Reverse Proxy

Nginx is a reverse proxy that allows us to manage and optimize the incoming HTTP/HTTPS traffic. Additionally, if horizontal scaling is required, it enables seamless load balancing between multiple instances.

We have also decided to add self-signed SSL certificates. In a production environment, we would typically use certificates issued by a trusted Certificate Authority (CA) to ensure security and authenticity. However, for this use case, self-signed certificates are useful for simulating HTTPS traffic within the application. Nginx is responsible for managing and handling these certificates.

I have decided to use Nginx because I wanted the project to run as it would in a real project, making use of a domain, managing its certificate, and so on.

## BBDD

First of all, I created a drawing to get a rough idea of the project's needs. Once I had a clear understanding of the requirements, I decided to use a relational database system. In this case, the client requires us to take into account the stock of each item they offer to prevent orders for items they don't have in stock. For this reason, data consistency is very important, and we achieve this using a relational model.

In the project I have used different configurations depending on the stage we are working in, to avoid modifying the actual database during tests or development. For testing development, I used SQLite. This allowed me to easily experiment with the database file, especially at the beginning when the relationships were not fully defined yet. On the other hand, for production, and development I used PostgreSQL. It's designed to handle large volumes of data and can scale with the business. Additionally, it supports multiple concurrent connections (100 by default), unlike SQLite, which is based on a local file and is not designed to handle concurrent connections efficiently.

When designing the database, I considered two options. The first one is the current model, and then I thought about using a dimensional data model with a snowflake schema. Ultimately, I decided on the first option, as the second one would be suitable if we had a service within the company dedicated to analyzing the data coming from the clients. Initially, I thought it would be convenient to create the dimensions, but then I realized that it wasn't as well-suited to my needs as the final model.

To simplify the database management, I decided to use Flask-SQLAlchemy, an extension for Flask that utilizes the SQLAlchemy ORM. This is a framework I have worked with before, so I feel comfortable using it. Pydantic is also used, which ensures that all the data we want to insert into the database will have the expected format and helps us prevent errors.

## Testing
Regarding testing, unit and integration tests have been carried out for the various functionalities, divided into three sets: models, routes and functions. Tests have been conducted  for all basic database functionalities, such as adding, retrieving, and deleting an item from any table. Same for the routes. About functionalities, the most critical functions have been tested. 

I decided to use Pytest for its simplicity.

## Endpoints
**Category**

- [x] GET /all

- [x] GET /<id: int>

- [x] POST /create

- [x] DELETE /delete/<id: int>
  
- [x] PUT /update/<id: int>

**Product**

- [x] GET /all

- [x] GET /<id: int>

- [x] POST /create

- [x] DELETE /delete/<id: int>

- [x] GET /by-category/<category_id: int>

- [x] GET /features/<id: int>

- [x] PUT /update/<id: int>

- [x] GET /by-category/<category_id: int>

- [x] GET /features/<id: int>

**Feature**

- [x] GET /all

- [x] GET /<id: int>

- [x] POST /create

- [x] DELETE /delete/<id: int>

- [x] PUT /update/<id: int>

- [x] POST /create/all


**Feature Value**

- [x] GET /all

- [x] GET /<id: int>

- [x] POST /create

- [x] DELETE /delete/<id: int>

- [x] GET /all/<feature_id: int>

- [x] GET /all/restricted?restriction=<str>

- [x] PUT /update/<id: int>

- [x] GET /all/<feature_id: int>

- [x] GET /all/restricted/<feature_id: int>

**Feature restriction**

- [x] GET /all

- [x] GET /<id: int>

- [x] POST /create

- [x] DELETE /delete/<id: int>
