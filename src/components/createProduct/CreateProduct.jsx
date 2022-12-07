import React from "react";
import { useEffect, useState } from "react";

import { createPost } from "../../redux/actions";
import { useDispatch } from "react-redux";

export default function CreatePost() {
  const dispatch = useDispatch();

  const [err, setErr] = useState({});
  const [input, setInput] = useState({
    title: "",
    author: "",
    categorie: [],
    editorial: "",
    saga: "",
    language: [],
    image: "",
    price: 0,
    year: 0,
    state: "",
    typebook: "",
  });

  useEffect(() => {}, []);

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
      categorie: [...input.categorie, e.target.value],
    });
    console.log(input.categorie);
  }

  function handlerSelectLanguage(e) {
    e.preventDefault();
    setInput({
      ...input,
      language: [...input.language, e.target.value],
    });
    console.log(input.language);
  }
  function handlerSelectTypeBook(e) {
    e.preventDefault();
    setInput({
      ...input,
      typebook: [...input.typebook, e.target.value],
    });
    console.log(input.typebook);
  }

  function handlerSelectState(e) {
    e.preventDefault();
    setInput({
      ...input,
      state: [...input.state, e.target.value],
    });
    console.log(input.state);
  }

  function handlerSubmit(e) {
    e.preventDefault();
    console.log(input);
    dispatch(createPost(input));
    alert("Post Created!");
    setInput({
      title: "",
      author: "",
      categorie: [],
      editorial: "",
      saga: "",
      language: [],
      image: "",
      price: 0,
      year: 0,
      state: "",
      typebook: "",
    });
  }
  function validate(input) {
    let RegEXP = /[`ª!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
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
    } else if (!input.saga) {
      err.saga = "· Saga is required";
    } else if (RegEXP.test(input.saga)) {
      err.saga = "· Special characters are not accepted";
    } else if (!input.price || input.price < 0) {
      err.price = "· Price input Error";
    } else if (!input.year || input.year < 0) {
      err.year = "· Year input Error";
    }
    return err;
  }
  function handleDelete(el) {
    setInput({
      ...input,
      categorie: input.categorie.filter((e) => e !== el),
    });
  }

  return (
    <div>
      <div>
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
                  {err.saga && <h5>{err.saga}</h5>}
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
                <label>Type Book </label>
                <select   defaultValue="type" onChange={(e) => handlerSelectTypeBook(e)}>
                <option disabled value="type">Type Book</option>
                  <option value="physical">Physical</option>
                  <option value="virtual">Virtual</option>
                </select>
              </div>

              <div>
                <label>State </label>
                <select  defaultValue="state" onChange={(e) => handlerSelectState(e)}>
                <option disabled value="state">State</option>
                  <option value="new">New</option>
                  <option value="used">Used</option>
                </select>
              </div>

              <div>
                <label>Languages </label>
                <select  defaultValue="language" onChange={(e) => handlerSelectLanguage(e)}>
                <option disabled value="language">Language</option>
                  <option value="spanish">Spanish</option>
                  <option value="english">English</option>
                  <option value="portuguese">Portuguese</option>
                  <option value="german">German</option>
                  <option value="polish">Polish</option>
                  <option value="french">French</option>
                  <option value="italian">Italian</option>
                  <option value="manual">Manual</option>
                </select>
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
              <div>
                <label>Categories </label>
                <select defaultValue="choose" onChange={(e) => handlerSelectCategorie(e)}>
                  <option disabled value="choose">Choose categories </option>
                  <option
                    disabled={
                      input.categorie.includes("terror") === false
                        ? false
                        : true
                    }
                    value="terror"
                  >
                    Terror
                  </option>
                  <option
                    disabled={
                      input.categorie.includes("novel") === false ? false : true
                    }
                    value="novel"
                  >
                    Novel
                  </option>
                  <option
                    disabled={
                      input.categorie.includes("bestseller") === false
                        ? false
                        : true
                    }
                    value="bestseller"
                  >
                    Best Seller
                  </option>
                  <option
                    disabled={
                      input.categorie.includes("biography") === false
                        ? false
                        : true
                    }
                    value="biography"
                  >
                    Biography
                  </option>
                  <option
                    disabled={
                      input.categorie.includes("comic") === false ? false : true
                    }
                    value="comic"
                  >
                    Comic
                  </option>
                  <option
                    disabled={
                      input.categorie.includes("manga") === false ? false : true
                    }
                    value="manga"
                  >
                    Manga
                  </option>
                  <option
                    disabled={
                      input.categorie.includes("police") === false
                        ? false
                        : true
                    }
                    value="police"
                  >
                    Police
                  </option>
                  <option
                    disabled={
                      input.categorie.includes("manual") === false
                        ? false
                        : true
                    }
                    value="manual"
                  >
                    Manual
                  </option>
                </select>
              </div>

              {/* 

              {/* <div className="divSelect">
                <label className="label">Diets Types </label>
                <section>
                  <select
                    className="selectClass"
                    onChange={(e) => handlerSelect(e)}
                  >
                    {diets.map((e) => (
                      <option
                        disabled={
                          input.diets.includes(e.name) === false ? false : true
                        }
                        value={e.name}
                      >
                        {e.name}
                      </option>
                    ))}
                  </select>
                </section>
              </div> */}

              <section>
                <button
                  type="submit"
                  disabled={
                    !input.title ||
                    err.title ||
                    err.author ||
                    err.editorial ||
                    err.saga||err.year
                    ||err.price
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
            <h3>Choosen categories</h3>
            {input.categorie.map((e) => (
              <div>
                <p>{e}</p>{" "}
                <button
                  className="deleteButton"
                  type="button"
                  onClick={() => handleDelete(e)}
                >
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
