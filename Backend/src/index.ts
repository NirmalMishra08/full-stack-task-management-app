
import express from 'express';
import connectDB from "./utils/DB"
import userRoute from "./Routes/User.route"
import menuRoute from "./Routes/Menu.route"

const port = 3000;

const app = express();
app.use(express.json())

app.use("/api/v1/user",userRoute);
app.use("/api/v1/menu",menuRoute)

app.get('/', (req, res) => {
    res.send('Hello World!')
})
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)

    })
})

