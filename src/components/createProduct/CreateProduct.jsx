import React from "react";
import { useEffect, useState } from "react";

import { createPost, getCategories, getLanguages } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function CreatePost() {
  const dispatch = useDispatch();
  const categorie = useSelector((state) => state.categories);
  const language = useSelector((state) => state.languages);
  const [err, setErr] = useState({});
  const [input, setInput] = useState({
    title: "",
    author: "",
    categorie: "",
    editorial: "",
    saga: "",
    language:"",
    image: "",
    price: 0,
    year: 0,
    state: "",
    typebook: "",
  });
  console.log(input);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getLanguages());
  }, []);

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
    console.log(input.categorie);
  }

  function handlerSelectLanguage(e) {
    e.preventDefault();
    setInput({
      ...input,
      language: e.target.value,
    });
    console.log(input.language);
  }
  function handlerSelectTypeBook(e) {
    e.preventDefault();
    setInput({
      ...input,
      typebook: e.target.value,
    });
    console.log(input.typebook);
  }

  function handlerSelectState(e) {
    e.preventDefault();
    setInput({
      ...input,
      state:  e.target.value
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
      categorie: "",
      editorial: "",
      saga: "",
      language:"",
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

  function handleDeleteState(el) {
    setInput({
      ...input,
      state: input.state.filter((e) => e !== el),
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
                <select
                  defaultValue="type"
                  onChange={(e) => handlerSelectTypeBook(e)}
                >
                  <option disabled value="type">
                    Type Book
                  </option>

                  <option value="physical">Physical</option>
                  <option value="virtual"> Virtual</option>
                </select>
              </div>

              <div>
                <label>State </label>
                <select
                  defaultValue="state"
                  onChange={(e) => handlerSelectState(e)}
                >
                  <option disabled value="state">
                    State
                  </option>
                  <option value="new">New</option>
                  <option value="used">Used</option>
                </select>
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
                  {language.map((e) => (
                    <option
                      disabled={
                        input.language.includes(e.name) === false
                          ? false
                          : true
                      }
                      value={e.name}
                    >
                      {e.name}
                    </option>
                  ))}
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
                <select
                  defaultValue="choose"
                  onChange={(e) => handlerSelectCategorie(e)}
                >
                  <option disabled value="choose">
                    choose categories
                  </option>
                  {categorie.map((e) => (
                    <option
                      disabled={
                        input.categorie.includes(e.name) === false
                          ? false
                          : true
                      }
                      value={e.name}
                    >
                      {e.name}
                    </option>
                  ))}
                </select>
              </div>

              <section>
                <button
                  type="submit"
                  disabled={
                    !input.title ||
                    err.title ||
                    err.author ||
                    err.editorial ||
                    err.saga ||
                    err.year ||
                    err.price
                      ? true
                      : false
                  }
                >
                  Create
                </button>
              </section>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
