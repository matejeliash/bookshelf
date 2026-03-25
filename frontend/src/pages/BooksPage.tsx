import { useEffect, useState } from "react"
import { OpenLibraryBookToBookDto, searchBooks, type OpenLibrarySearchResult } from "../api"
import { TextField } from "../components/TextField"
import { SearchButton } from "../components/SearchButton"
import Pagination from "../components/Pagination"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { useAuth } from "../auth/AuthContext"


export function BooksPage(){
  const [result,setResult] = useState<OpenLibrarySearchResult | null>(null)
  const [searchTitle,setSearchTitle] = useState<string>("")
  const [searchAuthor,setSearchAuthor] = useState<string>("")
  const [page,setPage] = useState<number>(1)
  const [params]  = useSearchParams();

  const [loading,setLoading] = useState<boolean>(false);
  const [first,setFirst] = useState<boolean>(true);

     const {isLoggedIn,isTokenValid} = useAuth();


   const navigate = useNavigate();


  useEffect(() => { 

    const atStart  =async () =>{

    const paramAuthor = params.get("searchAuthor") || "";
    setSearchAuthor(paramAuthor)
    const paramTitle = params.get("searchTitle") || "";
    setSearchTitle(paramTitle)
    const paramPage = Number(params.get("page")) || 1;
    setPage(paramPage)

    if((paramAuthor !=="" || paramTitle !== "" ) ){
      setFirst(false)
      console.log("first page load")
      console.log(`searchBooks(${paramTitle},${paramAuthor},${paramPage})`)
      const data = await searchBooks(paramTitle, paramAuthor,paramPage );
      if (data) {
        setResult(data);

      }
    }

    }


    atStart();


  


}, []);





   const handleSearch   =  async () => {

    setLoading(true);
    setFirst(false);
    // localStorage.setItem("result","");


      setPage(1)
      const data = await searchBooks(searchTitle,searchAuthor,page);
      if (data){

       setResult(data);
      //localStorage.setItem("result",JSON.stringify(data))
      }
      console.log("handleSearch")
      console.log(data)

      const params = new URLSearchParams();
      if(searchTitle) params.set("searchTitle",searchTitle)
      if(searchAuthor) params.set("searchAuthor",searchAuthor)
      if(page) params.set("page","1")
      
      navigate(`/books/?${params.toString()}`)

      setLoading(false)

  }

  const onPageChange  = async (newPage : number) =>{


    setPage(newPage)

      const params = new URLSearchParams();
      if(searchTitle) params.set("searchTitle",searchTitle)
      if(searchAuthor) params.set("searchAuthor",searchAuthor)
      if(page) params.set("page",newPage.toString())
      

      const data = await searchBooks(searchTitle, searchAuthor, newPage);
      console.log("onPageCHange")
      console.log(data)
      if (data) {
      setResult(data);

    }
      
      //navigate(`/?${params.toString()}`)

      navigate(`/books/?${params.toString()}`)

    //handleSearch();
    window.scrollTo({
      top:0,
      behavior : "smooth"
    })
  }




  return (
    <>

    <Navbar/>

    <div className="container">

    <h1>Find any book</h1>
    {/* <GenreExplorerGrid onSelectGenre={setSelectedGenre}></GenreExplorerGrid> */}

    {/* <SearchTypeDropDown value={searchType} onchange={setSearchType}/> */}

      <div className="searchForm">

        <p className="searchFieldTitle">{"Book title"}</p>
        <TextField value={searchTitle} onchange={setSearchTitle}  defaultvalue={searchTitle} ></TextField>
        <p className="searchFieldTitle">{"Author name"}</p>
        <TextField value={searchAuthor} onchange={setSearchAuthor} defaultvalue={searchAuthor}></TextField>
        <div className="searchButtonContainer">
        <SearchButton onclick={handleSearch} ></SearchButton>
        </div>
      </div>

    {!result  &&   
    <>
      <h1>Nothing searched yet, all relevant books will be displayed here.</h1>
<h3>
  To search, please type the name of a book or part of a book's name. If you don't know the book name, search by the author's name. You can combine partial information, e.g. "harry" (book title), "rowling" (author's name).
</h3>


    </>
    }

    {loading && <p>........</p>}



    {result && 
      <div >
        {result.docs.map((book) => (
          <div className="bookDiv" key={book.key}>
          { book.cover_i && 
          <img 
            className='bookImg' 
            src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` } 
            width="200" 
            loading='lazy'
            onError={e => {
              const target   =e.target as HTMLImageElement;
              target.src="/question_mark.png"

            }}  
          >
          </img>

          }
          { !book.cover_i &&

          <img className="bookImg" src='/question_mark.png' width="200"></img>

          }

          {isTokenValid() && 
            <img src="/hearthWhite.svg" height={70} />
          } 

          <div className='bookData'>
            <h2>
          <Link
            to={`/book/${book.key.split("/").pop()}`}
              state={{ bookData: OpenLibraryBookToBookDto(book) }}
            > 
              <strong>{book.title}</strong>
          </Link>
          </h2>

          <hr>
          </hr>
          

          {book.author_key  && book.author_key.slice(0,3).map((key,idx)=>(
            <h3 key={`author_${key}`}>
          <Link
            to={`/author/${key.split("/").pop()}`}
              state={{ bookData: OpenLibraryBookToBookDto(book) }}
            > 
              <i>{book.author_name[idx]}</i>
          </Link>


            </h3>


          ))

          }


          {book.author_key  && book.author_key.length > 3 &&

            <h3>
          <Link
            to={`/book/${book.key.split("/").pop()}`}
              state={{ bookData: OpenLibraryBookToBookDto(book) }}
            > 
              <i>{`& others`}</i>
          </Link>
            </h3>
          

          }








            {book.first_publish_year &&
            <h3>{book.first_publish_year}</h3>

            }
          </div>


          </div>
        ))}


      <Pagination
        result={result}
        page={page}
        onPageChange={onPageChange}  
        /> 
      
      </div>

    }

    <Footer/>
    </div>

    </>

  );





}