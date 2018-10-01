const tester = /^[0-9]{5}$|^[A-Z][0-9][A-Z] ?[0-9][A-Z][0-9]$/;

export const postalCodeValidator = (zipcode) => {
    if(!zipcode) {
        return false;
    }
    const valid = tester.test(zipcode);

    if(!valid){ 
        return false;
    }
    return true;
}