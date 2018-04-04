export const validateInput = (min, max, inputText, specialKeys, inputType, isZeroAble, inputName) => {
    const lengthOfInput = inputText.length;

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