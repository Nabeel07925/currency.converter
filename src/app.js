import express from "express";
import cors from "cors";

const app = express()

import currencyRouter from "./api_interfaces/currency/currency_router.js";

app.use(cors())

app.use("/currency", currencyRouter)
app.use("/", (req, res, next)=> {
    res.json({
        message: "Server is running"
    })
})

app.listen(3000, () => {
    console.log(`Server is running at ${'localhost'}:3000`)
})