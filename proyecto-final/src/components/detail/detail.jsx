import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import defaultImage from '../../assets/bookDefault.png';
import { getBooksDetails } from '../../redux/actions';

export default function Detail(props){

const detail = useSelector(state => state.detailsBook);
const dispatch = useDispatch();
useEffect(()=>{
  dispatch(getBooksDetails(props.match.params.id));
},[dispatch, props.match.params.id]);

return(
<div>
  <img src={detail.image? (detail.image) : (defaultImage)} alt='Book'/>
  <h4>{detail.title}</h4>
  <p>{detail.typebook}</p>
</div>
)};
