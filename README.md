 # Backend Template

You can use this repository as a template for your backend. It comes with a `users` table
as well as routes to register and login.

This backend allows users to manage movies they have selected to reserve and movies they have watched. After making an account, a user will be able to create, read, update, and delete their reservations and watch history.

## Usage

1. Change the name of the package in `package.json`.
2. Change the database name from `foobar` in the `db:schema` script.
3. Update the environment variables in `example.env` and rename the file to `.env`.

Database


API

/users router
    - POST /users/register
        - sends 400 if request body is missing username or password
        - creates a new user with the provided credentials and sends a token
        - the password is hashed in the database

    - POST /users/login
        - sends 400 if request body is missing username or password
        - sends a token if the provided credentials are valid

    - GET /users/me
        - sends the logged in user's data

/movies router
    - GET /movies
        - sends all the movies in the database
    - GET /movies/reservations 
        - sends all the logged in user's reserved movies
    - GET /movies/history
        - sends all the logged in user's reserved movies
    - GET /movies/:movieId/reservations
        - sends one movie from the user's reservations
    - GET /movies/:id
        - sends requested movie

/reservations router
    - GET /reservations/:id
        - sends one reservation of the logged in user
    - POST /reservations
        - creates a new reservation based on the logged in user and movie id
        - the is_reserved property is set to true
        - the is_watched property is set to false
    - PUT /reservations
        - sends 400 if request body is missing movieId or watched
        - updates is_watched property in reservations
        - takes as arguments user id, movie id, and watched variable
    - DELETE /reservations/:id
        - deletes a movie from reservations by making is_reserved = false

