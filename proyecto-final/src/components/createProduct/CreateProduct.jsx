import React from "react";
import { useEffect, useState } from "react";

import { createPost } from "../../redux/actions";
import { useDispatch } from "react-redux";

export default function CreatePost() {
  const dispatch = useDispatch();

  const [err, setErr] = useState({});
  const [input, setInput] = useState({
title:
"",
author:
"",
categorie:
[],
editorial:
"",
saga:
"",
language:
[],
image:
"",
price:
0,
year:
0,
state:
"",
typebook:
""
  });



  useEffect(() => {
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

  // function handlerSelect(e) {
  //   e.preventDefault();
  //   setInput({
  //     ...input,
  //     categorie: [...input.categorie, e.target.value],
  //   });
  //   console.log(input.categorie);
  // }

    // function handlerSelect(e) {
  //   e.preventDefault();
  //   setInput({
  //     ...input,
  //     language: [...input.language, e.target.value],
  //   });
  //   console.log(input.language);
  // }

  function handlerSubmit(e) {
    e.preventDefault();
    console.log(input);
    dispatch(createPost(input));
    alert("Post Created!");
    setInput({
      title:
      "",
      author:
      "",
      categorie:
      [],
      editorial:
      "",
      saga:
      "",
      language:
      [],
      image:
      "",
      price:
      0,
      year:
      0,
      state:
      "",
      typebook:
      ""
        });
  }
  function validate(input) {
    let RegEXP = /[`ª!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    let err = {};
    if (!input.title) {
      err.title = "· Title is required";
    } else if (RegEXP.test(input.title)) {
      err.title = "· Special characters are not accepted";
    } else if(!input.author){
      err.author = "· Author is required";
    }else if (RegEXP.test(input.author)) {
      err.author = "· Special characters are not accepted";
    }
    
    
    else if (
      !input.health_score ||
      input.health_score < 0 ||
      input.health_score > 100
    ) {
      err.health_score = "· Health Score input Error";
    } else if (!input.summary) {
      err.summary = "· Summary is required";
    } else if (!input.steps) {
      err.steps = "· Steps is required";
    } else if (!input.stock || input.stock < 1 || input.stock > 10) {
      err.stock = "Error input";
    }
    return err;
  }
  function handleDelete(el) {
    setInput({
      ...input,
      diets: input.diets.filter((e) => e !== el),
    });
  }

  return (
    <div>
      <div >
        <div >
          <h1>Create Publication:</h1>
        </div>

        <div>
          <form onSubmit={(e) => handlerSubmit(e)}>
            <div >
              <div >
                <label >Title </label>
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
              <div >
                <label >Author </label>
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
                <select  onChange={(e) => handlerSelect(e)}>
                  <option value="terror">Terror</option>
                  <option value="novel">Novel</option>
                  <option value="bestseller">Best Seller</option>
                  <option value="biography">Biography</option>
                  <option value="comic">Comic</option>
                  <option value="manga">Manga</option>
                  <option value="police">Police</option>
                </select>
              </div>


              <div >
                <label >Year </label>
                <section>
                  {" "}
                  <input
                    placeholder="year"
                    type="number"
                    value={input.year}
                    name="year"
                    onChange={handlerChange}
                  />
                  {err.year && (
                    <h5 >{err.year}</h5>
                  )}
                </section>
              </div>

              {/* <div className="divSelect">
                <label className="label">Summary </label>
                <section>
                  <textarea
                    placeholder="Summary"
                    className={
                      err.summary ? "inputErrLarge" : "inputClassLarge"
                    }
                    type="text"
                    value={input.summary}
                    name="summary"
                    onChange={handlerChange}
                  />
                  {err.summary && <h5 className="errLabel">{err.summary}</h5>}
                </section>
              </div> */}
{/* 
              <div className="divSelect">
                <label className="label">Steps </label>
                <section>
                  <textarea
                    placeholder="Steps"
                    className={err.steps ? "inputErrLarge" : "inputClassLarge"}
                    type="text"
                    value={input.steps}
                    name="steps"
                    onChange={handlerChange}
                  />
                  {err.steps && <h5 className="errLabel">{err.steps}</h5>}
                </section>
              </div> */}
              {/* <div className="divSelect">
                <label className="label">Stock</label>
                <section>
                  {" "}
                  <input
                    placeholder="Stock"
                    className={err.name ? "inputErr" : "inputClass"}
                    type="number"
                    value={input.stock}
                    name="stock"
                    onChange={handlerChange}
                  />
                  {err.stock && <h5 className="errLabel">{err.stock}</h5>}
                </section>
              </div> */}

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
                  // disabled={
                  //   !input.name ||
                  //   err.name ||
                  //   err.summary ||
                  //   err.steps ||
                  //   err.health_score
                  //     ? true
                  //     : false
                  // }
                >
                  Create
                </button>
              </section>
            </div>
          </form>
          <div>
            <br></br>
            <h3 className="choosenDiets">Choosen categories</h3>
            {input.categorie.map((e) => (
                <div >
                  <p>{e}</p>{" "}
                  <button
                    className="deleteButton"
                    type="button"
                    onClick={() => handleDelete(e)}
                  >
                    X
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
