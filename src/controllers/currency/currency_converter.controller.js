import https from "https";

const apiKey = "f278e3c8325f6572b6df"


class CurrencyService {

    convertBetweenTwoCurrencies(fromCurrency, toCurrency, quantity, cb) {
        const query = encodeURIComponent(fromCurrency) + "_" + encodeURIComponent(toCurrency)
        https.get(
            `https://free.currconv.com/api/v7/convert?q=${query}&compact=ultra&apiKey=${apiKey}`,
            (res) => {
                this.handleCurrencyConverterApiResponse(res, (apiResponse)=> {
                    const val = apiResponse[query];
                    if (val) {
                        cb({
                            from_currency: fromCurrency,
                            to_currency: toCurrency,
                            quantity: quantity,
                            amount: val * quantity
                        });
                    } else {
                        cb({
                            ...apiResponse
                        });
                    }
                }, cb)
            }).on('error', function (e) {
            cb({
                error: e.toString()
            });
        });
    }

    calculateAvgCurrencyInDate(fromCurrency, toCurrency, fromDate, toDate, cb) {
        const query = fromCurrency + "_" + toCurrency
        https.get(
            `https://free.currconv.com/api/v7/convert?q=${query}&compact=ultra&date=${fromDate}&endDate=${toDate}&apiKey=${apiKey}`,
            (res) => {
                this.handleCurrencyConverterApiResponse(res, (apiResult)=> {
                    if (apiResult.hasOwnProperty(query)) {
                        const valuesArray = Object.values(apiResult[query])
                        cb({
                            from_currency: fromCurrency,
                            to_currency: toCurrency,
                            from_date: fromDate,
                            to_date: toDate,
                            average: valuesArray.reduce((prev, next) => prev + next, 0) / valuesArray.length
                        });
                    } else {
                        cb({
                            ...apiResult
                        });
                    }
                }, cb)
            }).on('error', function (e) {
            cb({
                message: e.toString()
            });
        });
    }

    handleCurrencyConverterApiResponse(res, successFunc, cb) {
        let body = ""
        res.on('data', function (chunk) {
            body += chunk;
        });
        res.on('end', function () {
            try {
                const jsonObj = JSON.parse(body);
                successFunc(jsonObj)
            } catch (e) {
                cb({
                    message: e.toString()
                });
            }
        });
    }
}

export const currencyService = new CurrencyService();
