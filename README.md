# jumbo-themoviedb

Jumbo Front-end Developer Code Project
[github](https://github.com/devonpis/jumbo-themoviedb)
[Demo](https://jumbo-themoviedb.web.app/)

### Acceptence criteria

- It must use the TMDB API (https://developers.themoviedb.org/3)
- It must display a list of popular media (TV or Movies),
- It must link each entity to its own details page and display relevant information
- It must maintain browser history when navigating between views
- It must match the provided mocks
- It should allow the user to search for a specific movie (not limited to popular movies)
- It should use JS as the primary language (preferably React although not required)
- It may be responsive to desktop and mobile clients (liberty’s may be taken for alternate viewport sizes)

### Remarks

- I've utilised the data store in this project, search results are cached in the store unless the user start a new search, refresh the browser or leaving the site.
- Same apply to the movie details page, movie info is cached in the store unless the user start a new search, refresh the browser or leaving the site.
- As I'm running out of time, unit testing is still WIP, and i havn't clean up unneccessary files in the boilerplate.

### Boilerplate

This project is based on this boilerplate:
[React-Redux-Saga Boilerplate](https://redux-saga.react-boilerplate.com/)

### This boilerplate provides

- react ^16.x
- react-router 4.x
- react-helmet 5.x
- styled-components 4.x
- redux 4.x
- redux-saga 0.16.x
- redux-persist 5.x

### Development

- webpack-dev-server 3.x
- react-hot-loader 4.x
- redux-devtools (with browser plugin)

`npm start`

### Building

- webpack 4.x
- babel 7.x

`npm run build`

### Code Quality

- eslint 5.x
- stylelint 9.x

`npm run lint` / `npm run lint:styles`

### Unit Testing (Testing is still WIP)

- jest 23.x
- enzyme 3.x

`npm test`

### End 2 End Testing

- cypress 3.0.x

`npm run test:e2e`

### UI component library

-

### UI dev environment

-
