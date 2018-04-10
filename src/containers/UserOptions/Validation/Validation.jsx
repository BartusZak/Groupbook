export const validateInput = (min, max, inputText, specialKeys, inputType, isZeroAble, inputName, regularExpType) => {
    const lengthOfInput = inputText.length;
    if(lengthOfInput === 0 && min !== ""){
        return "Pole " + inputName + " nie powinno być puste";
    }
    switch(regularExpType){
        case "standard":
            const pattern = /^([a-zA-Z0-9 _-]+)$/;
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
            if(inputType === "date"){
                if(inputText === "")
                    return "Data wydarzenia musi zostac ustawiona";

                if(inputText.length > 10)
                    return "Data posiada nie prawidłowy format";
                
                const today = new Date();

                if(Number(inputText.slice(0,4)) < Number(today.getFullYear()))
                    return "Rok wydarzenia nie może odnosic sie do przeszlosci";
                
                if(Number(inputText.slice(0,4)) === Number(today.getFullYear())){
                    
                    if((inputText.slice(5,6) === "0" ? Number(inputText.slice(6,7)) : 
                    Number(inputText.slice(5,7))) < Number(today.getMonth()+1))
                        return "Miesiac wydarzenia nie moze odnosic sie do przeszlosci";
            
                    if((inputText.slice(8,9) === "0" ? Number(inputText.slice(9,10)) : 
                    Number(inputText.slice(8,10))) < today.getDate())
                        return "Dzien wydarzenia nie moze odnosic sie do przeszlosci";
                }

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
        return "Rozmiar zdjęcia nie może przekraczać " + maxSize;
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