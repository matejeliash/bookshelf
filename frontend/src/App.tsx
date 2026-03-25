import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom';

import "./App.css"
import { BooksPage } from './pages/BooksPage';
import { AuthorsPage } from './pages/AuthorsPage';
import { BookPage } from './pages/BookPage';
import { AuthProvider } from './auth/AuthContext';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { ShelfPage } from './pages/ShelfPage';
import { InvalidSessionPage } from './pages/InvalidSessionPage';
import { RegisterPage } from './pages/RegisterPage';
import { VerifyPage } from './pages/VerifyPage';

function App() {


  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/invalidSession' element={<InvalidSessionPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/verify' element={<VerifyPage/>}/>
          <Route path='/books' element={<BooksPage/>}/>
          <Route path='/shelf' element={<ShelfPage/>}/>
          <Route path='/authors' element={<AuthorsPage/>}/>
          <Route path="/book/:id" element={<BookPage />} />
          {/* <Route path="/author/:id" element={<AuthorPage />} /> */}


        </Routes>
      
      
      </BrowserRouter>
    </AuthProvider>

  )
}



//   const [result,setResult] = useState<OpenLibrarySearchResult | null>(null)
//   const [searchTitle,setSearchTitle] = useState<string>("")
//   const [searchAuthor,setSearchAuthor] = useState<string>("")
//   const [selectedGenre,setSelectedGenre] = useState<string|null>(null)
//   const [page,setPage] = useState<number>(1)

// /*
//   useEffect(() =>{

//     const search=async()=>{
//       const data = await searchBooks(searchType,"tolkien");
//       if(data){
//         setResult(data);
//       }


//     }
//       search();

//     },[]
//   );
//   */

//   useEffect(() => {
//   const fetchData = async () => {
//     const data = await searchBooks(searchTitle, searchAuthor, page);
//     if (data) setResult(data);
//   };

//   fetchData();
// }, [ page]);


//    const handleSearch   =  async () => {

//       setPage(1)
//       const data = await searchBooks(searchTitle,searchAuthor,page);
//       console.log(data?.docs)
//       if(data){
//         setResult(data);
//       }

//   }

//   const onPageChange  = (newPage : number) =>{
//     setPage(newPage)
//     //handleSearch();
//     window.scrollTo({
//       top:0,
//       behavior : "smooth"
//     })
//   }

//   return (
//     <>

//     <h1>Books</h1>
//     <GenreExplorerGrid onSelectGenre={setSelectedGenre}></GenreExplorerGrid>

//     {/* <SearchTypeDropDown value={searchType} onchange={setSearchType}/> */}
//     <p>Title:</p>
//     <SearchField value={searchTitle} onchange={setSearchTitle} ></SearchField>
//     <br></br>
//     <p>Author:</p>
//     <SearchField value={searchAuthor} onchange={setSearchAuthor} ></SearchField>
//     <SearchButton onclick={handleSearch} ></SearchButton>

//     {!result && <p>nothing searched yet</p>}



//     {result && 
//       <div className='booksDiv'>
//         {result.docs.map((book) => (
//           <div className="bookDiv" key={book.key}>
//           { book.cover_i && 
//           <img 
//             className='bookImg' 
//             src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` } 
//             width="200" 
//             loading='lazy'
//             onError={(e) => {
//             const img = e.currentTarget; 
//             img.onerror = null;
//             img.src = "./public/question_mark.png";
//             }
//         }
//           >
//           </img>

//           }
//           { !book.cover_i &&

//           <img className="bookImg" src='question_mark.png' width="200"></img>



//           }

//           <div className='bookData'>
//           <h2>{book.title}</h2> 
//             {/* <h3>{book.author_name}</h3>  */}
//             <h3>{book.author_name?.length ? book.author_name.join(", ") : "Unknown"}</h3>
//             <h3>{book.first_publish_year}</h3>
//             <h2>{book.cover_i}</h2>
//           </div>


//           </div>
//         ))}
      
//       </div>

//     }
// {/* 
//     {result && result.numFound  > 1 && page > 1 &&
//       <button key={"first_page"} onClick={() => onPageChange(1)}>

//       {1}
//     </button>

// }

//     {result &&
//   [-5,-4,-3,-2,-1].map((i) => (
//      (page + i) > 1 && 
//       <button key={`page${page+i}`} onClick={ () => onPageChange(page+i)}>
//       {page+i}
//     </button>
//   ))

// }
//     {result && result.numFound  > 10 &&
//       <button key={"cur_page"} onClick={() => onPageChange(page)}>

//       {`<${page}>`}
//     </button>

// }

//     {result &&
//   [1,2,3,4,5].map((i) => (
//      (page + i) < Math.ceil(result.numFound/10) && 
//       <button key={`page_${page+i}`} onClick={ () => onPageChange(page+i)}>
//       {page+i}
//     </button>
//   ))

// }




//     {result && result.numFound  > 10 && page < Math.ceil(result.numFound / 10) &&
//       <button key={"last_page"} onClick={() => onPageChange(Math.ceil(result.numFound / 10))}>
//       {Math.ceil(result.numFound/10)}
//     </button>

// } */}


//    <Pagination
//     result={result}
//     page={page}
//     onPageChange={onPageChange}  
//     /> ;

    



//     </>

//   );





// }

export default App
