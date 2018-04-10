export const RegisterNames = [
    {id: 1, name: "Username", placeholder: "Login", type: "Text", text:"", autoComplete: "off", validation: { required: true, min: 5, max: 15 }, valid: false, touched: false,},
    {id: 2, name: "Email", placeholder: "Wpisz Swój e-mail...", type: "Text", text:"", autoComplete: "off", validation: { required: true, min: 5, max: 35, email: true, emailError: "Niepoprawny adres email." }, valid: false, touched: false,},
    {id: 3, name: "Password", placeholder: "Hasło", type: "Password", text:"", autoComplete: "off", validation: { required: true, min: 5, max: 15, password: true }, valid: false, touched: false,},
    {id: 4, name: "ConfirmedPassword", placeholder: "Powtórz Swoje hasło...", type: "Password", text:"", autoComplete: "off", validation: { required: true, min: 5, max: 15, passwordConfirmation: true, confirmedPasswordError: "Powtórzone hasło jest inne niż hasło." }, valid: false, touched: false,}
];

export const RegisterErrors = [
    {id: 1, msg: "", isError: false},
    {id: 2, msg: "", isError: false},
    {id: 3, msg: "", isError: false},
    {id: 4, msg: "", isError: false},
    {id: 5, msg: "", isError: false},
    {id: 6, msg: "", isError: false}

];
export const LoginNames = [
    {id: 1,name: "Login", placeholder: "Login", text: "", min: 4, max: 15, type:"Text"},
    {id: 2,name: "Hasło", placeholder: "Hasło", text: "", min: 4, max: 15, type:"Password"}
];
export const LoginErrors = [
    {id: 1, msg: "", isError: false},
    {id: 2, msg: "", isError: false}
];

export const AddingPostsErrors = [
    {msg: "Pole tytuł postu powinno zawierac co najmniej 5 znakow"},
    {msg: "Pole zawartosc postu powinno zawierac co najmniej 5 znakow"}
]
