import { Router } from "express";
import {currencyService} from "../../controllers/currency/currency_converter.controller.js";
import {avgCurrencyValidation, convertCurrenciesValidation} from "./req_validation.js";

export const currencyRouter = Router();
export default currencyRouter

currencyRouter.get("/convert", async (req, res)=> {
    const validationRes = await convertCurrenciesValidation(req)
    if(validationRes.filter(item=> item.errors.length).length) {
        res.status(400).json({
            message: "Request params not complete"
        })
        return
    }
    const from = req.query.from_currency
    const to = req.query.to_currency
    const quantity = req.query.quantity
    currencyService.convertBetweenTwoCurrencies(from, to, quantity, (result)=> {
        res.send(result)
    })
})

currencyRouter.get("/average", async (req, res)=> {
    const validationRes = await avgCurrencyValidation(req)
    if(validationRes.filter(item=> item.errors.length).length) {
        res.status(400).json({
            message: "Request params not complete"
        })
        return
    }
    const from = req.query.from_currency
    const to = req.query.to_currency
    const from_date = req.query.from_date
    const to_date = req.query.to_date
    currencyService.calculateAvgCurrencyInDate(from, to, from_date, to_date, (result)=> {
        res.send(result)
    })
})