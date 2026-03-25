import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";


export function HomePage(){

    return (

        <>
        <Navbar/>

        <div className="container">

            <h3 className="appMotto">Simple shelf app for books</h3> 

            <h1 className="appName">Bookshelf</h1>

        <div className="quoteDiv">

        <p className="quote">“Show me a family of readers, and I will show you the people who move the world.”</p>

    <p className="rightEnd quoteAuthor">Napoléon Bonaparte</p>
    </div>




        <p className="appInfo">
  Bookshelf is a simple website/application designed to help users explore and discover books.
  The frontend is created in React and TypeScript, which provides a reactive, fluid UI. 
  The backend is written in Java and Spring Boot; authentication data is encrypted so your data is safe, and you do not need to worry.
  App allows you to create your own book catalog, rate books and show you appreciation for book in words.
</p>

<p>
Most data is coming from the Open Library API, which provides a great and vast catalog of books and authors.
This API is free, so show your love and appreciation and possibly even donations to:
</p>

<ul>
  <li>
    <a href="https://openlibrary.org" >{`Open library`}</a> 
  </li>

  <li>
     <a href="https://archive.org" >Internet Archive</a>
  </li>
</ul>



        <Footer/>
    </div>
        </>
    )


}