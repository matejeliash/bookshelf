

// export type ExchangeRates = {
//     amount: number;
//     base: string;
//     date:string;
//     rates:{
//         [currency: string]:number;
//     }


// }

const URL_BASE=`${window.location.protocol}//${window.location.hostname}:8080`

export type BookDescription  = string | {type: string, value :string}

export type OpenLibraryBook = {
  key: string
  title: string
  author_name: string[]
  author_key: string[]
  first_publish_year: number
  cover_i: number
  edition_count: number
}

export type OpenLibraryAuthor = {
  key: string
  name: string
  birth_date? : string
  death_date? : string
}

export type OpenLibrarySearchResult = {
  numFound: number
  start: number
  numFoundExact: boolean
  docs: OpenLibraryBook[]
}

export type OpenLibrarySearchResultAuthors = {
  numFound: number
  start: number
  numFoundExact: boolean
  docs: OpenLibraryAuthor[]
}


export type OpenLibraryBookCloser = {
  title:string 
  description: BookDescription
  subject_people:string[]
  subject_places: string[]
  subjects : string[]
  covers : number[]
}



export async function searchBooks(title:string, author :string, page:number):Promise<OpenLibrarySearchResult | null>{

    if (title === "" && author === ""){
        return null
    }

    let params :string[] = [];
    
    

    if (title!==""){
        params.push(`title=${encodeURIComponent(title)}`)
    }
    if (author!==""){
        params.push(`author=${encodeURIComponent(author)}`)
    }

    const part:string =  params.join("&");

    //const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`
    const url = `https://openlibrary.org/search.json?${part}&limit=10&page=${page}`

    console.log(url)


    try{
        const res = await fetch(url);
        if (!res.ok){
            throw new Error(`http fetch error: ${res.status}`);
        }

        const data :OpenLibrarySearchResult = await res.json();
        //console.log(data);
        return data;
    }catch(error){
        console.log(error);
        return null;
    }


}

export async function searchAuthors(name:string, page:number):Promise<OpenLibrarySearchResultAuthors | null>{

    if (name === ""){
        return null
    }

    // let params :string[] = [];
    
    

    // if (title!==""){
    //     params.push(`title=${encodeURIComponent(title)}`)
    // }
    // if (author!==""){
    //     params.push(`author=${encodeURIComponent(author)}`)
    // }

    // const part:string =  params.join("&");

    //const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`
    const url = `https://openlibrary.org/search/authors.json?q=${encodeURIComponent(name)}&limit=10&page=${page}`

    //"https://openlibrary.org/search/authors.json?q=tolkien" 

    console.log(url)


    try{
        const res = await fetch(url);
        if (!res.ok){
            throw new Error(`http fetch error: ${res.status}`);
        }

        const data :OpenLibrarySearchResultAuthors = await res.json();
        console.log(data);
        return data;
    }catch(error){
        console.log(error);
        return null;
    }


}



export async function fetchBook(works: string|undefined, ):Promise<OpenLibraryBookCloser | null>{
    if (!works) return null;



    const url = `https://openlibrary.org/works/${works}.json`


    console.log(url)


    try{
        const res = await fetch(url);
        if (!res.ok){
            throw new Error(`http fetch error: ${res.status}`);
        }

        const data :OpenLibraryBookCloser = await res.json();
        console.log(data);
        return data;
    }catch(error){
        console.log(error);
        return null;
    }


}

export type LoginData = {
    username : string;
    password : string;
}

export type TokenData  = {
    token:string;
    expiresIn :number;
}


export async function apiLogin(loginData: LoginData ):Promise<TokenData|null>{


const url  = `${URL_BASE}/auth/login`
    // const url = `http://localhost:8080/auth/login`


    console.log(url)


    try{
        const res = await fetch(url,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(loginData)
        }

        );
        if (!res.ok){
            console.log(res.status)
            throw new Error(`http fetch error: ${res.status}`);
        }

        const data :TokenData = await res.json();
        console.log(data);
        return data;
    }catch(error){
        console.log(error);
        return null;
    }


}


export type RegisterData = {
    username : string;
    password : string;
    email: string;
}


export type RegisterResponse = {
    email: string;
    username : string;
}




export async function apiRegister(
    registerData: RegisterData
): Promise<RegisterResponse> {

    const url = `${URL_BASE}/auth/register`;

    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(registerData)
    });

    const json = await res.json(); // always JSON

    if (!res.ok) {
        throw new Error(json.message || "Request failed");
    }

    return json as RegisterResponse;
}

export type VerifyData = {
    email:string;
    verificationCode : string;
}


export async function apiVerify(
    verifyData: VerifyData
): Promise<String> {

    const url = `${URL_BASE}/auth/verify`;

    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(verifyData)
    });

    const json = await res.json(); 

    if (!res.ok) {
        throw new Error(json.message || "Request failed");
    }

    return json as string;
}



export async function apiGetUsername( ):Promise<string|null>{



    const url = `${URL_BASE}/users/me`


    console.log(url)

    const token = localStorage.getItem("token")


    try{
        const res = await fetch(url,{
            method : "GET",
            headers : {
                Authorization : `Bearer ${token}`
            },
        }

        );
        if (!res.ok){
            console.log(res.status)
            throw new Error(`http fetch error: ${res.status}`);
        }

        const username :string = await res.text();
        console.log(username);
        return username;
    }catch(error){
        console.log(error);
        return null;
    }


}



export type BookDto = {
    openLibId: string;
    title : string;
    description: string | null;
    openLibAuthorIds : string[];
    authorNames : string [];
    like : boolean | null ;
    rating : number | null;
    review : string | null ;
    cover : string  | null;
    


}


export function OpenLibraryBookToBookDto(olb: OpenLibraryBook): BookDto{

    const bookDto:BookDto = {
        openLibId : olb.key ,
        title : olb.title,
        description : null,
        openLibAuthorIds : olb.author_key,
        authorNames : olb.author_name,
        like : null,
        rating : null,
        review : null,
        cover : "asdsad" 

    }

    return bookDto
}



export async function apiAddBook(
    bookDto : BookDto
): Promise<String> {

    const url = `${URL_BASE}/books/like`;
    const token = localStorage.getItem("token")

    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
             Authorization : `Bearer ${token}`
        },
        body: JSON.stringify(bookDto)
    });

    const json = await res.text(); 

    if (!res.ok) {
        throw new Error( "Request failed");
    }

    return json as string;
}

export async function apiGetLikedBooks(
): Promise<BookDto[]> {

    const url = `${URL_BASE}/books/liked`;
    const token = localStorage.getItem("token")

    const res = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
             Authorization : `Bearer ${token}`
        },
    });

    const json = await res.json(); 

    if (!res.ok) {
        throw new Error( "Request failed");
    }

    return json ;
}
