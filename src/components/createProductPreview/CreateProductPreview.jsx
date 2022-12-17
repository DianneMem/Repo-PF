import React from "react";
import { useSelector } from "react-redux";
import noImgAvailable from "./mclovin-sony-pictures-entertainment.jpg";

export default function CreateProductPreview({ input }) {
  const imageState= useSelector(state=>state.images)
  return (
    <div>
      <div >
        <div >
          {imageState.length ? (
            <img  src={imageState} />
          ) : (
            <img src={noImgAvailable} />
          )}
<br/>
          <span >
            Title:{" "}
            <span >
              {input.title ? `${input.title}` :" "}
            </span>
          </span>
          <br/>
          <span >
            Author:{" "}
            <span >
              {input.author.length
                ? `${input.author}`
                :" "}
            </span>
          </span>
          <br/>
          <span >
            Editorial:{" "}
            <span >
              {input.editorial ? `${input.editorial}` :" "}
            </span>
          </span>
          <br/>
          <span >
            Saga:{" "}
            <span >
              {input.saga ? `${input.saga}` :" "}
            </span>
          </span>
          <br/>
          <span >
            Year:{" "}
            <span >
              {input.year ? `${input.year}` :" "}
            </span>
          </span>

          <br/>
          <span >
            Price:{" "}
            <span >
              {input.price ? `U$D ${input.price}` :" "}
            </span>
          </span>
          <br/>
          <span>
          Typebook:{" "}
            <span >
              {input.typebook ? `${input.typebook}` :" "}
            </span>
          </span>
          <br/>
          <span >
            State:{" "}
            <span >
              {input.state ? ` ${input.state}` :" "}
            </span>
          </span>
          <br/>
          <span >
            Language:{" "}
            <span >
              {input.language ? `${input.language}` :" "}
            </span>
          </span>
          <br/>   
          <span >
            Category:{" "}
            <span >
              {input.categorie ? `${input.categorie}` :" "}{" "}
            </span>
          </span>
          <br/>
          <span >
            Genders:{" "}
            <span >
              {input.gender[0] ? `${input.gender[0]}` :" "}
            </span>
            <span >
              {input.gender[1] ? `${input.gender[1]}` :" "}
            </span>
            <span >
              {input.gender[2] ? `${input.gender[2]}` :" "}
          </span>
                      <span >
              {input.gender[3] ? `${input.gender[3]}` :" "}
          </span>
          <span >
              {input.gender[4] ? `${input.gender[4]}` :" "}
          </span>
          <span >
              {input.gender[5] ? `${input.gender[5]}` :" "}
          </span>
          <span >
              {input.gender[6] ? `${input.gender[6]}` :" "}
          </span>
          <span >
              {input.gender[7] ? `${input.gender[7]}` :" "}
          </span>
          <span >
              {input.gender[8] ? `${input.gender[8]}` :" "}
          </span>
          <span >
              {input.gender[9] ? `${input.gender[9]}` :" "}
          </span>

          <span >
              {input.gender[10] ? `${input.gender[10]}` :" "}
          </span>

          <span >
              {input.gender[11] ? `${input.gender[11]}` :" "}
          </span>

          <span >
              {input.gender[12] ? `${input.gender[12]}` :" "}
          </span>

          <span >
              {input.gender[13] ? `${input.gender[13]}` :" "}
          </span>

          <span >
              {input.gender[14] ? `${input.gender[14]}` :" "}
          </span>

          </span>
          

        </div>
      </div>
    </div>
  );
}
