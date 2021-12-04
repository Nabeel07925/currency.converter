import { checkSchema } from "express-validator";


export const convertCurrenciesValidation = async (req) => {
    return await checkSchema({
        from_currency: {
            in: ["query"],
            notEmpty: {
                errorMessage: "from_currency is required"
            }
        },
        to_currency: {
            in: ["query"],
            notEmpty: {
                errorMessage: "to_currency is required"
            }
        },
        quantity: {
            in: ["query"],
            notEmpty: {
                errorMessage: "quantity is required"
            }
        }
    }).run(req);
};

export const avgCurrencyValidation = async (req) => {
    return await checkSchema({
        from_currency: {
            in: ["query"],
            notEmpty: {
                errorMessage: "from_currency is required"
            }
        },
        to_currency: {
            in: ["query"],
            notEmpty: {
                errorMessage: "to_currency is required"
            }
        },
        from_date: {
            in: ["query"],
            notEmpty: {
                errorMessage: "from_date is required"
            },
            isDate: true
        },
        to_date: {
            in: ["query"],
            notEmpty: {
                errorMessage: "to_date is required"
            },
            isDate: true
        }
    }).run(req);
};
