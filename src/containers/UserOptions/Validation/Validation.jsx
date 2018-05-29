import moment from 'moment';

export const validateInput = (min, max, inputText, specialKeys, inputType, isZeroAble, inputName, regularExpType) => {
    const lengthOfInput = inputText.length;
    if(lengthOfInput === 0 && min !== ""){
        return "Pole " + inputName + " nie powinno być puste";
    }
    switch(regularExpType){
        case "standard":
            const pattern = /^([a-zA-Z0-9ąłęóńśćżź ._-]+)$/;
            if(!pattern.test(inputText)){
                return "Pole " + inputName + " zawiera niedozwolone znaki!";
            }
            break;
        case "email":
            const emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
            if(!emailPattern.test(inputText)){
                return "Niewłaściwy Adres Email!";
            }
            break;
        case "imieNazwisko":
            const imieNazwiskoPattern = /^([A-Za-ząłęóńśćżź-]+)$/;
            if(!imieNazwiskoPattern.test(inputText)){
                return "Pole " + inputName + " zawiera niedozwolone znaki!";
            }
            break;
        default:
    }
   
    switch(inputType){
        case "groups":
            if(isZeroAble === 0)
                return "Musisz dodac chociaz jedna grupe, przed opublikowaniem postu";
            break;
        case "date":
            const dateNow = moment().format();
            
            if(!moment(inputText).isAfter(dateNow)){
                return "Data wydarzenia nie może odnosić się do przeszłości";
            }

           
            break;
        default:
            if(min !== ""){
                if(lengthOfInput < min)
                    return "Pole " + inputName + " zawiera za mało znaków" + " (min " + min + ")";
                if(lengthOfInput > max)
                    return "Pole " + inputName + " zawiera za dużo znaków " + "(max " + max + ")";
            }
            if(specialKeys !== ""){
                if(specialKeys === inputText)
                    return "Pole " + inputName + " powinno mieć inną nazwę";
            
            }
            break;
    }
    return "";
}

export const validatePictures = (fileType, maxSize, fileSize) => {
    if(fileSize > maxSize){
        return "Rozmiar zdjęcia nie może przekraczać " + maxSize + " bitów";
    }
    const correctFormats = ["image/jpg", "image/jpeg", "image/png"];
    let result = "Zdjęcie powinno być formatu jpg, jpeg lub png";
    for(let key in correctFormats){
        if(correctFormats[key] === fileType){
            result = "";
        }
    }    
    return result;    
    
}


export const createUsersArray = commentToValidate => {
    const helpArray = [];

    if(commentToValidate.includes("@")){
        let helpString = "";
        for(let i = 0; i < commentToValidate.length; i++){
            if(commentToValidate.charAt(i) === "@"){
                for(let j = i; j < commentToValidate.length; j++){
                    if(commentToValidate.charAt(j) !== "@" && commentToValidate.charAt(j) !== "[" && 
                        commentToValidate.charAt(j) !== "]")
                        helpString += commentToValidate.charAt(j);

                    if(commentToValidate.charAt(j) === "]"){
                        helpArray.push(helpString);
                        helpString = "";
                        break;
                    }
                }
            }
        }
    }
    return helpArray;
}

export const validateTags = (commentToValidate, loadedUsers) => {
        const responseObject = JSON.parse(localStorage.getItem("responseObject"));
        const stringArray = [];
        const subString = "@[" + responseObject.username + "]";
        if(commentToValidate.includes(subString))
            return "Nie możesz oznaczyć siebie";
        
        
        const helpArray = createUsersArray(commentToValidate);

        const pattern = /^([a-zA-Z0-9_]+)$/;
        for(let key in helpArray){
            if(!pattern.test(helpArray[key])){
                return "Oznaczenia zawierają nieprawidłowy znak";
            }
        }
        const usersInGroup = [...loadedUsers];
        const correctUsers = [];
        for(let i = 0; i < helpArray.length; i++){
            for(let j = 0; j < usersInGroup.length; j++){
                if(helpArray[i] === usersInGroup[j].user.username){
                    correctUsers.push({val: true, user: helpArray[i]});
                    break;
                }
            }
            if(correctUsers[i] === undefined)
                correctUsers.push({val: false, user: helpArray[i]});
        }
        for(let key in correctUsers)
            if(!correctUsers[key].val)
                return "W tej grupie nie ma użytkownika " + correctUsers[key].user;
        
        if(correctUsers.length > 1){
            const isDuplicated = checkingForDuplicates(correctUsers);
            if(isDuplicated !== "")
                return isDuplicated;
        }
        
            
        return "";
}

export const checkingForDuplicates = array => {
    let counter = 0;
    let duplicatedUser = "";
    for(let i = 0; i < array.length; i++){
        for(let j = 0; j < array.length; j++){
            if(array[i].user === array[j].user)
                counter++;

            if(counter > 1){
                duplicatedUser = array[i].user;
                break;
            }
        }
        if(counter > 1)
            break;

        counter = 0;
    }
    if(counter > 1)
        return "Użytkownik " + duplicatedUser + " może być oznaczony tylko raz";

    return "";
}