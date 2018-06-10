export const handleErrors = error => {
    const MessageArray = [];
    MessageArray.push("Ups, coś poszło źle");

    if(error.response.data !== undefined && error.response.data.errors !== undefined)
        return error.response.data.errors;

    if(error.response.status !== undefined && error.response.status === 500)
        return new Array().push("Wystąpił błąd serwera. Spróbuj ponownie później");

        

    return MessageArray;
}