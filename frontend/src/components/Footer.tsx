import "./Footer.css"
export function Footer(){
    return (
        <>
            <br></br>
            <hr></hr>
            <br></br>
        <footer className="footer">
            <p>© {new Date().getFullYear()} matejeliash@<a href="https://github.com/matejeliash">github</a></p>
            <p>All rights reserved</p>


        </footer>
        </>
    )
}