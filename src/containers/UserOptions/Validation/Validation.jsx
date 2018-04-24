import moment from 'moment';

export const validateInput = (min, max, inputText, specialKeys, inputType, isZeroAble, inputName, regularExpType) => {
    const lengthOfInput = inputText.length;
    if(lengthOfInput === 0 && min !== ""){
        return "Pole " + inputName + " nie powinno być puste";
    }
    switch(regularExpType){
        case "standard":
            const pattern = /^([a-zA-Z0-9ąłęóńśćżź _-]+)$/;
            if(!pattern.test(inputText)){
                return "Pole " + inputName + " zawiera niedozwolone znaki";
            }
            break;
        case "email":
            const emailPattern = /\S+@\S+\.\S+/;
            if(!emailPattern.test(inputText)){
                return "Adres email posiada niedozwolone znaki";
            }
            break;
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
                for(let items in specialKeys){
                    if(inputText.includes(specialKeys[items]))
                    {
                        return "Pole " + inputName + " nie powinno zawierac znaku: " + specialKeys;
                    }
                }
            
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
