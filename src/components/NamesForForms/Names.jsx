export const RegisterNames = [
    {id: 1, name: "Login", placeholder: "Login", min: 5, max: 15, type: "Text", text:""},
    {id: 2, name: "Hasło", placeholder: "Hasło", min: 5, max: 15, type: "Password", text:""},
    {id: 3, name: "Powtórz hasło", placeholder: "Powtórz Swoje hasło...", min: 5, max: 15, type: "Password", text:""},
    {id: 4, name: "Imię", placeholder: "Wpisz Swoje imię...", min: 5, max: 15, type: "Text", text:""},
    {id: 5, name: "Nazwisko", placeholder: "Wpisz Swoje Nazwisko...", min: 5, max: 15, type: "Text", text:""}, 
    {id: 6, name: "Adres e-mail", placeholder: "Wpisz Swój e-mail...", min: 5, max: 15, type: "Text", text:""}
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
