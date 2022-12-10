import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import {
  createPost,
  getCategories,
  getLanguages,
  getGenders,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader/Loader";

export default function CreatePost() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const languages = useSelector((state) => state.languages);
  const genders = useSelector((state) => state.genders);
  const [err, setErr] = useState({});
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

  function handlerSubmit(e) {
    e.preventDefault();

    dispatch(createPost(input));
    alert("Post Created!");
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
    navigate('/');
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
    } else if (!input.editorial) {
      err.editorial = "· Editorial is required";
    } else if (RegEXP.test(input.editorial)) {
      err.editorial = "· Special characters are not accepted";
    }  else if (!input.image) {
      err.image = "· Image is required";
    } else if (!input.year) {
      err.year = "· Year input is required";
    } else if (input.year < 0||input.year>añoActual) {
      err.year = "· Year input Error";
    } else if (!input.price || input.price < 0) {
      err.price = "· Price input Error";
    }
    err.input = "· Input required";
    return err;
  }
  function handleDelete(el) {
    setInput({
      ...input,
      gender: input.gender.filter((e) => e !== el),
    });
  }

  const changeState = () => {
    setTimeout(() => {
      setLoading(true);
    }, 5000);
  };
  if (!loading) {
    changeState();
    return <Loader />;
  }

  return (
    <div>
      <div>
      <Link to="/"><button >Back</button></Link>
        <div>
          <h1>Create Publication:</h1>
        </div>

        <div>
          <form onSubmit={(e) => handlerSubmit(e)}>
            <div>
              <div>
                <label>Title </label>
                <section>
                  {" "}
                  <input
                    placeholder="Title"
                    type="text"
                    value={input.title}
                    name="title"
                    onChange={handlerChange}
                  />
                  {err.title && <h5>{err.title}</h5>}
                </section>
              </div>
              <div>
                <label>Author </label>
                <section>
                  {" "}
                  <input
                    placeholder="Author"
                    type="text"
                    value={input.author}
                    name="author"
                    onChange={handlerChange}
                  />
                  {err.author && <h5>{err.author}</h5>}
                </section>
              </div>

              <div>
                <label>Editorial </label>
                <section>
                  {" "}
                  <input
                    placeholder="Editorial"
                    type="text"
                    value={input.editorial}
                    name="editorial"
                    onChange={handlerChange}
                  />
                  {err.editorial && <h5>{err.editorial}</h5>}
                </section>
              </div>

              <div>
                <label>Saga </label>
                <section>
                  {" "}
                  <input
                    placeholder="saga"
                    type="text"
                    value={input.saga}
                    name="saga"
                    onChange={handlerChange}
                  />
                  
                </section>
              </div>

              <div>
                <label>Image </label>
                <section>
                  {" "}
                  <input
                    placeholder="image"
                    type="text"
                    value={input.image}
                    name="image"
                    onChange={handlerChange}
                  />
                  {err.image && <h5>{err.image}</h5>}
                </section>
              </div>
              <div>
                <label>Year </label>
                <section>
                  {" "}
                  <input
                    placeholder="year"
                    type="number"
                    value={input.year}
                    name="year"
                    onChange={handlerChange}
                  />
                  {err.year && <h5>{err.year}</h5>}
                </section>
              </div>
              <div>
                <label>Price </label>
                <section>
                  {" "}
                  <input
                    placeholder="price"
                    type="number"
                    value={input.price}
                    name="price"
                    onChange={handlerChange}
                  />
                  {err.price && <h5>{err.price}</h5>}
                </section>
              </div>
              <br />
              <br />
              <div>
                <label>State </label>
                <select
                  defaultValue="state"
                  onChange={(e) => handlerSelectState(e)}
                >
                  <option disabled value="state">
                    State
                  </option>
                  <option value="New">New</option>
                  <option value="Used">Used</option>
                </select>
                {!input.state && <h5>{err.input}</h5>}
              </div>
              <div>
                <label>Type Book </label>
                <select
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
                {!input.typebook && <h5>{err.input}</h5>}
              </div>

              <div>
                <label>Languages </label>
                <select
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
                {!input.language && <h5>{err.input}</h5>}
              </div>

              <div>
                <label>Categories </label>
                <select
                  defaultValue="choose"
                  onChange={(e) => handlerSelectCategorie(e)}
                >
                  <option disabled value="choose">
                    choose categories
                  </option>
                  {categories.map((e) => (
                    <option
                      disabled={
                        input.categorie.includes(e) === false
                          ? false
                          : true
                      }
                      value={e}
                    >
                      {e}
                    </option>
                  ))}
                </select>
                {!input.categorie && <h5>{err.input}</h5>}
              </div>
              <div>
                <label>Genders </label>
                <select
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
                </select>
                {!input.gender.length && <h5>{err.input}</h5>}
              </div>

              <section>
                <button
                  type="submit"
                  disabled={
                    !input.title ||
                    err.title ||
                    err.author ||
                    err.editorial ||
                    err.image ||
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
              </section>
            </div>
          </form>
          <div>
            <br></br>
            <h3 className="choosenDiets">Choosen Genders</h3>
            {input.gender.map((e) => (
              <div>
                <p>{e}</p>{" "}
                <button type="button" onClick={() => handleDelete(e)}>
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
