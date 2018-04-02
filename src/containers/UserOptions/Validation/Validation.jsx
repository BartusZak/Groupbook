export const validateInput = (min, max, inputText, specialKeys, inputType) => {
    const lengthOfInput = inputText.length;

    if(min !== ""){
        if(lengthOfInput < min)
            return "Pole " + inputType + " zawiera za mało znaków" + " (min " + min + ")";
        if(lengthOfInput > max)
            return "Pole " + inputType + " zawiera za dużo znaków " + "(max " + max + ")";
    }
    if(specialKeys !== ""){
        for(let items in specialKeys){
            if(inputText.includes(specialKeys[items]))
            {
                return "Pole " + inputType + " nie powinno zawierac znaku: " + specialKeys;
            }
        }
       
    }
    return "";
}