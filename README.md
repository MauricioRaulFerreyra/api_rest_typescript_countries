## Project Api Rest 
#### This project is an API, a programming interface developed with REST architecture, based on the HTTP protocol.
#### This link - [countries](https://restcountries.com/v3.1/all) , resource is used, of which endpoints were created to be used and then consumed in the frontend part.
## 🛠 Skills
NodeJS, Express, Typescript, PostgreSQL, Sequelize..
## API Reference
#### Get all Items
```http
GET /countries 
```
```http
GET /activities
```
#### Get Items
```http
GET /countries/${id}
```
#### Post Item
```http
POST /activities
```
## Run Locally
#### Before launching the project, you must have PostgreSQL installed, and have created a database, for use.
#### Generate an .env file and load the variables.
Clone the project

```bash
  git clone https://github.com/MauricioRaulFerreyra/api_rest_typescript_countries.git my-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```
