


const isEmptyObject = (obj: any) => {
    if (typeof obj == 'undefined') {
        return true;
    }

    return obj == null || obj === '' || obj.length === 0;
}
const validString = (str: any) => {
    const regex = /^[0-9a-zA-Z_/ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỂưạảấầẩẫậắằẳẵặẹẻẽềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹýč,.\-\s']+$/;
    return regex.test(str);
}
const isNumber = (number: any) => {
    return !isNaN(number);
}
const validEmail = (email: any) => {
    const exp = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return exp.test(email);
}
const validPhoneNumber = (phoneNumber: any) => {
    const exp = /^[0-9][1-9]\d{8,9}$/;
    return exp.test(phoneNumber);
}
const validPassword = (pwd: any) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9_@./#&+-]{6,}$/; // Minimum six characters, at least one letter and one number
    return regex.test(pwd);
}


export const Common = {
    isEmptyObject,
    validString,
    isNumber,
    validEmail,
    validPassword,
    validPhoneNumber
}