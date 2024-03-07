
import { Common } from "../../common/Common"
import * as Constants from "../../common/Constants";

export const validateInput = (type: string, checkingText: any, message: string) => {
    let checkingResult = false;
    let alertMessage = '';
    let result = {};
    if (type.indexOf("require") > -1) {
        checkingResult = !Common.isEmptyObject(checkingText);
        if (checkingResult) {
            result = {
                errorMessage: ''
            }
        } else {
            if (message)
                alertMessage = message;
            else
                alertMessage = Constants.Messages.DEFAULT_MESSAGE_REQUIRE;
            result = {
                errorMessage: alertMessage
            };
        }
    }

    if (type.indexOf("text") > -1) {
        checkingResult = Common.validString(checkingText);
        if (checkingResult) {
            result = {
                errorMessage: ''
            }
        } else {
            if (message)
                alertMessage = message;
            else
                alertMessage = Constants.Messages.DEFAULT_MESSAGE_REQUIRE;
            result = {
                errorMessage: alertMessage
            };
        }
    }

    if (type.indexOf("number") > -1) {
        checkingResult = Common.isNumber(checkingText);
        if (checkingResult) {
            result = {
                errorMessage: ''
            };
        } else {
            if (message)
                alertMessage = message;
            else
                alertMessage = Constants.Messages.DEFAULT_MESSAGE_REQUIRE;
            result = {
                errorMessage: alertMessage
            };
        }
    }

    if (type.indexOf("phone-number") > -1) {
        checkingResult = Common.validPhoneNumber(checkingText);
        if (checkingResult) {
            result = {
                errorMessage: ''
            };
        } else {
            if (message)
                alertMessage = message;
            else
                alertMessage = Constants.Messages.DEFAULT_MESSAGE_PHONE_NUMBER;
            result = {
                errorMessage: alertMessage
            };
        }
    }

    if (type.indexOf("email") > -1) {
        checkingResult = Common.validEmail(checkingText);
        if (checkingResult) {
            result = {
                errorMessage: ''
            };
        } else {
            if (message)
                alertMessage = message;
            else
                alertMessage = Constants.Messages.DEFAULT_MESSAGE_EMAIL;
            result = {
                errorMessage: alertMessage
            };
        }
    }

    if (type.indexOf("currency") > -1) {
        checkingResult = Common.isNumber(checkingText);
        if (checkingResult) {
            result = {
                errorMessage: ''
            };
        } else {
            if (message)
                alertMessage = message;
            else
                alertMessage = Constants.Messages.DEFAULT_MESSAGE_CURRENCY;
            result = {
                errorMessage: alertMessage
            };
        }
    }

    if (type.indexOf("password") > -1) {
        checkingResult = Common.validPassword(checkingText);
        if (checkingResult) {
            result = {
                errorMessage: ''
            }
        } else {
            if (message)
                alertMessage = message;
            else
                alertMessage = Constants.Messages.DEFAULT_MESSAGE_PASSWORD;
            result = {
                errorMessage: alertMessage
            };
        }
    }



    return result;
};
