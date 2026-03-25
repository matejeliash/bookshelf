
import { useEffect, useState } from "react"
import { searchAuthors, searchBooks, type OpenLibraryAuthor, type OpenLibrarySearchResultAuthors } from "../api"
import { TextField } from "../components/TextField"
import { SearchButton } from "../components/SearchButton"
import Pagination from "../components/Pagination"


export function AuthorsPage(){
  const [result,setResult] = useState<OpenLibrarySearchResultAuthors | null>(null)
  const [searchName,setSearchName] = useState<string>("")
  const [page,setPage] = useState<number>(1)


  useEffect(() => {
  const fetchData = async () => {
    const data = await searchAuthors(searchName, page);
    if (data) setResult(data);
  };

  fetchData();
}, [ page]);


   const handleSearch   =  async () => {

      setPage(1)
      const data = await searchAuthors(searchName,page);
      console.log(data?.docs)
      if(data){
        setResult(data);
      }

  }

  const onPageChange  = (newPage : number) =>{
    setPage(newPage)
    //handleSearch();
    window.scrollTo({
      top:0,
      behavior : "smooth"
    })
  }

  return (
    <>

    <h1>Books</h1>
    {/* <GenreExplorerGrid onSelectGenre={setSelectedGenre}></GenreExplorerGrid> */}

    {/* <SearchTypeDropDown value={searchType} onchange={setSearchType}/> */}
    <p>Title:</p>
    <TextField value={searchName} onchange={setSearchName} defaultvalue="" ></TextField>
    <br></br>

    <SearchButton onclick={handleSearch} ></SearchButton>


    {!result && <p>nothing searched yet</p>}



    {result && 
      <div className='authorsDiv'>
        {result.docs.map((author) => (
          <div className="bookDiv" key={author.key}>

          <img className="bookImg" src='question_mark.png' width="200"></img>

          <div className='authorData'>
          <h2>{author.name}</h2> 
          
          <h2>{author.birth_date}</h2> 
          </div>


          </div>
        ))}
      
      </div>

    }


   <Pagination
    result={result}
    page={page}
    onPageChange={onPageChange}  
    /> ;

    



    </>

  );





}