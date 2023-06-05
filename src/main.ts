import { initializeDbConnection } from './core';
import { startApp } from './app.module';


initializeDbConnection({force: false})
.then(startApp)
.catch(console.log);