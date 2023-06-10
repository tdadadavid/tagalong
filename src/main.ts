import { initializeDbConnection } from './core';
import startApp from './app';


initializeDbConnection({force: false})
.then(startApp)
.catch(console.log);