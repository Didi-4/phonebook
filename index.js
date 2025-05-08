console.log('app started');
import personsRouter from "./api/persons.js"
import infoRouter from "./api/info.js"
import express from "express";
const app = express();
const port = 3000;

// app.get("/api/persons", (req, res) => {
//     console.log('get request received');
    
// })

app.use('/api/persons', personsRouter)
app.use('/info', infoRouter)

app.listen(port , () => {

    console.log(`Server is running on port: http://localhost:${port }`)
})