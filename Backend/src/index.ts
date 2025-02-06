
import express from 'express';
import connectDB from "./utils/DB"
import userRoute from "./Routes/User.route"
import menuRoute from "./Routes/Menu.route"
import orderRoute from "./Routes/Order.route"

const port = 3000;

const app = express();
app.use(express.json())

app.use("/api/v1/user",userRoute);
app.use("/api/v1",menuRoute)
app.use("/api/v1",orderRoute)

app.get('/', (req, res) => {
    res.send('Hello World!')
})
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)

    })
})

