import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createPost,
  getCategories,
  getLanguages,
  getGenders,
  startUploadingFile,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader/Loader";
import { IconButton } from "@mui/material";
import { UploadOutlined } from "@mui/icons-material";
import { useRef } from "react";
import "./CreateProduct.css";
import Header from "../header/Header"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function CreatePost() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const languages = useSelector((state) => state.languages);
  const genders = useSelector((state) => state.genders);
  const image_c = useSelector((state) => state.images);
  const [err, setErr] = useState({});
  const MySwal = withReactContent(Swal)
  const [order,SetOrder]=useState("")
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    title: "",
    author: "",
    editorial: "",
    saga: "",
    image: "",
    year: 0,
    price: 0,
    typebook: "",
    state: "",
    language: "",
    categorie: "",
    gender: [],
  });
  console.log(input);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getLanguages());
    dispatch(getGenders());
  }, [dispatch]);

  const fileInputRef = useRef();

  function handlerChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
    setErr(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handlerSelectCategorie(e) {
    e.preventDefault();
    setInput({
      ...input,
      categorie: e.target.value,
    });
  }
  function handlerSelectGenders(e) {
    e.preventDefault();
    setInput({
      ...input,
      gender: [...input.gender, e.target.value],
    });
  }

  function handlerSelectLanguage(e) {
    e.preventDefault();
    setInput({
      ...input,
      language: e.target.value,
    });
  }
  function handlerSelectTypeBook(e) {
    e.preventDefault();
    setInput({
      ...input,
      typebook: e.target.value,
    });
  }

  function handlerSelectState(e) {
    e.preventDefault();
    setInput({
      ...input,
      state: e.target.value,
    });
  }

  function handlerSubmit(e,message) {
    e.preventDefault();
    input.image = image_c;
    dispatch(createPost(input));
   
    setInput({
      title: "",
      author: "",
      categorie: "",
      editorial: "",
      saga: "",
      language: "",
      image: "",
      price: 0,
      year: 0,
      state: "",
      typebook: "",
      gender: [],
    });

    navigate("/");
    return MySwal.fire('¡The post has been created successfully!', message, 'success')
  }
  function validate(input) {
    let fecha = new Date();
    let añoActual = fecha.getFullYear();
    console.log(añoActual);
    let RegEXP = /[`ª!@#$%^*_+\=\[\]{};"\\|,<>\/~]/;
    let err = {};
    if (!input.title) {
      err.title = "· Title is required";
    } else if (RegEXP.test(input.title)) {
      err.title = "· Special characters are not accepted";
    } else if (!input.author) {
      err.author = "· Author is required";
    } else if (RegEXP.test(input.author)) {
      err.author = "· Special characters are not accepted";
    }
    else if (!input.editorial) {
      err.editorial = "· Editorial is required";
    }
    else if (image_c.length<1) {
      err.image = "· Image required";
    }  else if (RegEXP.test(input.editorial)) {
      err.editorial = "· Special characters are not accepted";
    }  else if (!input.year) {
      err.year = "· Year input is required";
    } else if (input.year < 0 || input.year > añoActual) {
      err.year = "· Year input Error";
    } else if (!input.price || input.price < 0) {
      err.price = "· Price input Error";
    }
    console.log(err);
    SetOrder("")
    err.input = "· Input required";
    return err;
  }
  function handleDelete(el) {
    setInput({
      ...input,
      gender: input.gender.filter((e) => e !== el),
    });
  }
  
  function backBtn(e) {
    e.preventDefault()
    navigate("/")
  }

  const changeState = () => {
    setTimeout(() => {
      setLoading(true);
    }, 3000);
  };
  if (!loading) {
    changeState();
    return <Loader />;
  }

  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;
    dispatch(startUploadingFile(target.files));
  };
console.log(Header);
  return (<div>
   
    <div className="body">
    <Header noSearch={true}/>
    <div class="container-fluid px-1 py-5 mx-auto">
      <div class="row d-flex justify-content-center">
        <div class="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
          <div class="card">
            
              <button onClick={e=>backBtn(e)} className="backBtn">Back</button>
            <h1  class="text-center mb-4" className="publication">Create Publication</h1>
            <form class="form-card" onSubmit={(e) => handlerSubmit(e)}>
              <div class="row justify-content-between text-left">
                <div class="form-group col-sm-6 flex-column d-flex">
                  <label class="form-control-label px-3" className="label">
                    Title<span class="text-danger"> *</span>{" "}
                  </label>{" "}
                  <input className="input"
                    placeholder="Title"
                    type="text"
                    value={input.title}
                    name="title"
                    onChange={handlerChange}
                  />
                  {err.title && <h5 className="errForm">{err.title}</h5>}
                </div>
                <div class="form-group col-sm-6 flex-column d-flex">
                  <label class="form-control-label px-3" className="label">
                    Author <span class="text-danger"> *</span>{" "}
                  </label>{" "}
                  <input 
                  className="input"
                    placeholder="Author"
                    type="text"
                    value={input.author}
                    name="author"
                    onChange={handlerChange}
                  />
                  {err.author && <h5 className="errForm">{err.author}</h5>}
                </div>
              </div>

              <div class="row justify-content-between text-left">
                <div class="form-group col-sm-6 flex-column d-flex">
                  <label class="form-control-label px-3" className="label">
                    Editorial <span class="text-danger"> </span>{" "}
                  </label>{" "}
                  <input className="input"
                    placeholder="Editorial"
                    type="text"
                    value={input.editorial}
                    name="editorial"
                    onChange={handlerChange}
                  />
                  {err.editorial && <h5 className="errForm">{err.editorial}</h5>}
                </div>
                <div class="form-group col-sm-6 flex-column d-flex">
                  <label class="form-control-label px-3" className="label">Saga </label>{" "}
                  <input 
                  className="input"
                    placeholder="saga"
                    type="text"
                    value={input.saga}
                    name="saga"
                    onChange={handlerChange}
                  />
                </div>
              </div>
              <div class="row justify-content-between text-left" >
                <div class="form-group col-sm-6 flex-column d-flex"   >
                  <label class="form-control-label px-3" className="label">
                    Image <span class="text-danger"> *</span>{" "}
                  </label>{" "}
                  <input 
                    style={{ display: "none"}}
                    type="file"
                    ref={fileInputRef}
                    onChange={onFileInputChange}

                  />
                  <IconButton   className={image_c.length>0? "buttonFormImg":"buttonFormImgErr" } onClick={() => fileInputRef.current.click()}>
                    <UploadOutlined />
                  </IconButton>
                </div>
                <div class="form-group col-sm-6 flex-column d-flex">
                  <label class="form-control-label px-3" className="labelImg">
                    Year <span class="text-danger"> *</span>
                  </label>{" "}
                  <input 
                  className="input"
                    placeholder="year"
                    type="number"
                    value={input.year}
                    name="year"
                    onChange={handlerChange}
                  />
                  {err.year && <h5 className="errForm">{err.year}</h5>}
                </div>
              </div>

              <div class="row justify-content-between text-left">
                <div class="form-group col-sm-6 flex-column d-flex">
                  <label class="form-control-label px-3" className="label">
                    Price <span class="text-danger"> *</span>{" "}
                  </label>{" "}
                  <input 
                  className="input"
                    placeholder="price"
                    type="number"
                    value={input.price}
                    name="price"
                    onChange={handlerChange}
                  />
                  {err.price && <h5 className="errForm">{err.price}</h5>}
                </div>
                <div class="form-group col-sm-6 flex-column d-flex">
                  <label class="form-control-label px-3" className="label">
                    Type Book <span class="text-danger"> *</span>{" "}
                  </label>

                  <select 
                  className="select"
                    name="typebook"
                    defaultValue="type"
                    onChange={(e) => handlerSelectTypeBook(e)}
                  >
                    <option disabled value="type">
                      Type Book
                    </option>

                    <option value="physical">Physical</option>
                    <option value="virtual"> Virtual</option>
                  </select>
                  {!input.typebook && <h5 className="errForm">{err.input}</h5>}
                </div>
              </div>
           
              <div class="row justify-content-between text-left">
              <div class="form-group col-sm-6 flex-column d-flex">
                  <label class="form-control-label px-3" className="label">
                    State <span class="text-danger"> *</span>{" "}
                  </label>
                  <select 
                  className="select"
                    defaultValue="state"
                    onChange={(e) => handlerSelectState(e)}
                  >
                    <option disabled value="state">
                      State
                    </option>
                    <option  value="New">New</option>
                    <option disabled={input.typebook==="virtual" ?true:false}  value="Used">Used</option>
                  </select>
                  {!input.state && <h5 className="errForm">{err.input}</h5>}
                </div>

                <div class="form-group col-sm-6 flex-column d-flex">
                  <label class="form-control-label px-3" className="label">
                    Languages <span class="text-danger"> *</span>{" "}
                  </label>

                  <select className="select"
                    defaultValue="languages"
                    onChange={(e) => handlerSelectLanguage(e)}
                  >
                    <option disabled value="languages">
                      Languages
                    </option>
                    {languages.map((e) => (
                      <option
                        disabled={
                          input.language.includes(e) === false ? false : true
                        }
                        value={e}
                      >
                        {e}
                      </option>
                    ))}
                  </select>
                  {!input.language && <h5 className="errForm">{err.input}</h5>}
                </div>
              </div>

              <div class="row justify-content-between text-left">
                <div class="form-group col-sm-6 flex-column d-flex">
                  <label class="form-control-label px-3" className="label">
                    Categories <span class="text-danger"> *</span>{" "}
                  </label>

                  <select className="select"
                    defaultValue="choose"
                    onChange={(e) => handlerSelectCategorie(e)}
                  >
                    <option disabled value="choose">
                      choose categories
                    </option>
                    {categories.map((e) => (
                      <option
                        disabled={
                          input.categorie.includes(e) === false ? false : true
                        }
                        value={e}
                      >
                        {e}
                      </option>
                    ))}
                  </select >
                  {!input.categorie && <h5 className="errForm">{err.input}</h5>}
                </div>
                <div class="form-group col-sm-6 flex-column d-flex">
                  <label class="form-control-label px-3" className="label">
                    Genders <span class="text-danger"> *</span>{" "}
                  </label>

                  <select className="select"
                    defaultValue="choose"
                    onChange={(e) => handlerSelectGenders(e)}
                  >
                    <option disabled value="choose">
                      Genders
                    </option>
                    {genders.map((e) => (
                      <option
                        disabled={
                          input.gender.includes(e) === false ? false : true
                        }
                        value={e}
                      >
                        {e}
                      </option>
                    ))}
                  </select >
                  {!input.gender.length && <h5 className="errForm"> {err.input}</h5>}
                </div>
              </div>

              <div class="row justify-content-between text-center">
              <label  className="label">Choosen Genders</label>
                <div className="genders">
                  <br></br>
                 
                  {input.gender.map((e) => (
                    <div onClick={() => handleDelete(e)} className="choosenGenders" >
                      {e}{" "}
                  
                    </div>
                  ))}
                </div>
              </div>

              <button
             
                class="btn-block btn-primary"
                className="buttonForm"
                type="submit"
                disabled={
                  !input.title ||
                  err.title ||
                  err.author ||
                  err.editorial ||
                  err.year ||
                  err.price ||
                  !input.typebook ||
                  !input.state ||
                  !input.language ||
                  !input.categorie
                    ? true
                    : false
                }
              >
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
    

  );
}
