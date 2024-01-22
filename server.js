requiere('./database/connection');
const app = require ('./app');
const dotenv = require('dotenv');
dotenv.config();
const Port = process.env.PORT ?? 9000;

const server = app.listen(Port, (error) => {
    console.log(`Server is running on port http://localhost:${port}`);
});

server.on('error', (error) => {
    throw new Error('Something bad happened...');
})