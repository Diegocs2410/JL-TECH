// Import banner
import { Link } from "react-router-dom"
import banner from "../img/banner.jpg"
import logInImg from "../img/login.png"
import registerImg from "../img/register.png"
import styleModule from "../style/styles.module.css"

const Home = () => {
  return (
    <>
      <img src={banner} alt="imagen banner" className={styleModule.imgBanner} />
      <div className="container">
        <h1 className="text-center my-2">Bienvenidos a JL-Tech</h1>
        <p className="p-3 lead">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum, ut
          voluptate iste unde enim adipisci cupiditate illum itaque repellat
          aut, odio magni nemo autem error non modi dolor ratione similique!
          Laborum odit perferendis consequuntur accusantium eius quis nulla.
          Adipisci, corporis itaque perspiciatis vero asperiores tenetur
          laudantium ea! Eaque laudantium quas autem deleniti reprehenderit
          soluta eligendi accusantium, molestias ex quaerat dolores. Quibusdam
          quo quia aliquid corporis neque perspiciatis molestias suscipit
          temporibus cumque aperiam praesentium, maxime dolorum illum esse cum
          veniam unde vel optio numquam ad ipsum asperiores molestiae laudantium
          voluptate! Sit.
        </p>
        <div className="row row-cols-md-2">
          <div className="d-flex flex-column align-items-center">
            <Link to="/login" className="btn btn-primary btn-sm w-25">
              Iniciar Sesión
            </Link>
            <img
              src={logInImg}
              alt="Login"
              className="img-fluid w-25 h-auto mt-3"
            />
            <p className="mt-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
              dolore ad fugiat pariatur incidunt officiis nulla. Et vel suscipit
              placeat quos amet minima, laboriosam sit tempora, ad repellendus
              error alias?
            </p>
          </div>
          <div className="d-flex flex-column align-items-center">
            <Link to="/register" className="btn btn-secondary btn-sm w-25">
              Registrate
            </Link>
            <img
              src={registerImg}
              alt="Login"
              className="img-fluid w-25 h-auto mt-3"
            />
            <p className="mt-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
              dolore ad fugiat pariatur incidunt officiis nulla. Et vel suscipit
              placeat quos amet minima, laboriosam sit tempora, ad repellendus
              error alias?
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
