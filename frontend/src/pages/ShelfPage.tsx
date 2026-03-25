
import { use, useEffect, useState } from "react";
import { apiGetLikedBooks, apiGetUsername, type BookDto } from "../api";
import { useAuth } from "../auth/AuthContext";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";


export function ShelfPage(){


     const {isLoggedIn,isTokenValid} = useAuth();
    const navigate = useNavigate();

    const[username,setUsername]= useState<string|null>(null);
    const[books,setBooks] = useState<BookDto[] | null >(null);
  
  
    const fetchUsername = async () => {

        const gotUsername = await apiGetUsername();

        if (gotUsername) {
            setUsername(gotUsername)
        }
    };

    const fetchLikedBooks = async () => {

        try{
            const likedBooks = await apiGetLikedBooks();
            console.log(likedBooks)
            setBooks(likedBooks)


        }catch(e){
            console.log("failed to get liked books")
        }


    };

    useEffect( ()=>{

        if(!isTokenValid()){
            navigate("/invalidSession")


        }else{
            fetchUsername();
            fetchLikedBooks();

        }


    },[]);


    return (

        <>
        <Navbar/>

        <div className="container">

         {isLoggedIn && username &&

            <h2>{username}</h2>
         }




        {books && books.map((book) => (
          <div className="bookDiv" key={book.openLibId}>
          { book.cover && 
          <img 
            className='bookImg' 
            src={`https://covers.openlibrary.org/b/id/${book.cover}-L.jpg` } 
            width="200" 
            loading='lazy'
            onError={e => {
              const target   =e.target as HTMLImageElement;
              target.src="/question_mark.png"

            }}  
          >
          </img>

          }
          { !book.cover &&

          <img className="bookImg" src='/question_mark.png' width="200"></img>

          }

          {isTokenValid() && 
            <img src="/hearthWhite.svg" height={70} />
          } 

          <div className='bookData'>
            <h2>
          <Link
            to={`/book/${book.openLibId}`}
              state={{ bookData: book }}
            > 
              <strong>{book.title}</strong>
          </Link>
          </h2>

          <hr>
          </hr>
          

          {book.openLibAuthorIds && book.authorNames && book.authorNames.length > 0 
           && book.openLibAuthorIds.slice(0,3).map((key,idx)=>(
            <h3 key={`author_${key}`}>
          <Link
            to={`/author/${key.split("/").pop()}`}
              state={{ bookData: book }}
            > 
              <i>{book.authorNames[idx]}</i>
          </Link>


            </h3>


          ))

          }


          {book.openLibAuthorIds  && book.openLibAuthorIds.length > 3 &&

            <h3>
          <Link
            to={`/book/${book.openLibId}`}
              state={{ bookData: book }}
            > 
              <i>{`& others`}</i>
          </Link>
            </h3>
          

          }








            {/* {book. &&
            <h3>{book.first_publish_year}</h3>

            } */}
          </div>


          </div>
        ))}






         


        <Footer/>
    </div>
        </>
    )


}