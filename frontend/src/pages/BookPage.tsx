
import { useEffect, useState } from "react"
import { apiAddBook, fetchBook, searchBooks, type BookDto, type OpenLibraryBook, type OpenLibraryBookCloser, type OpenLibrarySearchResult } from "../api"
import { TextField } from "../components/TextField"
import { SearchButton } from "../components/SearchButton"
import Pagination from "../components/Pagination"
import { useAsyncError, useLocation, useParams } from "react-router-dom"
import { Navbar } from "../components/Navbar"

type LocationState = {
  bookData?: BookDto;
};

export function BookPage(){

  const location = useLocation() as {state:LocationState};
  const { bookData: searchBookData} = location.state || {};
  const { id } = useParams<{id: string}>();


  const [data,setData] = useState<OpenLibraryBookCloser| null>(null);

  useEffect(() => {
  const fetchData = async () => {
    const data = await fetchBook(id);
    if (data) {
      setData(data)
      console.log(data)
    };
  };

  fetchData();
}, [ id]);



const onLike  = async () => {

  if (id && data && searchBookData){  

    let description  = "";

    if (typeof data.description === "string"){
      description= data.description
    }

    if (typeof data.description === "object" && "value" in data.description){
      description = data.description.value;
    }

    let cover : string | null = null;

    if (data.covers && data.covers.length ){
      const num =  data.covers.find(cover => cover >0) 
      if(num!==undefined){
        cover = num.toString()
      }else{
        cover = null;
      }

    console.log(cover)

    }

  const bookDto: BookDto ={
    openLibId: id,
    title : data.title,
    openLibAuthorIds :searchBookData.openLibAuthorIds,
    authorNames : searchBookData.authorNames,
    description : description,
    like : true,
    rating : 100,
    review : "good one",
    cover : cover

  }
  console.log(bookDto)

  const str =  await apiAddBook(bookDto)
  console.log(str)

  }


  }





  return (
    <>

    <Navbar/>

    <div className="container">





    { data && <h1>{ data.title}</h1> }
    { searchBookData &&  searchBookData && searchBookData.authorNames.length > 0 && 
        <h2>{`By: ${searchBookData.authorNames.join(",")}`}</h2>
    }

    {/* { searchBookData?.first_publish_year &&
    <h3>{searchBookData.first_publish_year}</h3>
    } */}


{/* 
          { searchBookData?.cover_i && 
          <img 
            className='bookImg' 
            src={`https://covers.openlibrary.org/b/id/${searchBookData.cover_i}-L.jpg` } 
            width="200" 
            loading='lazy'
          >
          </img>

          } */}
          {/* { !searchBookData?.cover_i &&

          <img className="bookImg" src='/question_mark.png' width="200"></img>

          } */}

          { data && data.covers && data.covers.length > 0 && data.covers[0] > 0 ?
          (
          <img 
            className='bookImg' 
            src={`https://covers.openlibrary.org/b/id/${data.covers.find(i => i > 0)}-L.jpg` } 
            width="200" 
            loading='lazy'
          >
          </img>

          ) : 
          (
          <img className="bookImg" src='/question_mark.png' width="200"></img>

          )


          }



          <img src="/hearthWhite.svg" height={70} onClick={onLike} />
          {/* <img src="/hearthRed.svg" height={70} /> */}



    { typeof data?.description === "string" &&

    <p>{data.description}</p>

    }

    { typeof data?.description === "object" && "value" in data?.description && data.description.value !== "" && data.description.type === "/type/text" &&

    <p>{data.description.value}</p>

    }


          {data?.subjects && data.subjects.length > 0 &&

          <div>
              <h3>Subjects in book:</h3>
            <div className="subjects">
            {data.subjects.map(sub => <span className="subjectSpan">{sub}</span>)}

            </div>

          </div>

          
          
          
          }

    </div>






    </>

  );





}