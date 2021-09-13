import React, { useEffect, useState } from "react";
import axios from "axios";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import fetchColorService from '../services/fetchColorService';
import axiosWithAuth from "../helpers/axiosWithAuth";

const BubblePage = () => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchColorService(setColors);
  }, []);

  const toggleEdit = (value) => {
    setEditing(value);
  };

  const saveEdit = (editColor, id) => {
    let newArray = [...colors]
    axiosWithAuth().put(`http://localhost:5000/api/colors/${id}`, editColor)
      .then(res => {
        colors.map((color, index) => {
          if (color.id === res.data.id) {
            newArray[index] = res.data
            setColors(newArray)
          }
        })
      })
      .catch(e => {             
          console.log(e)
      })
  };

  const deleteColor = (colorToDelete) => {
    let newArray = [...colors]
    axiosWithAuth().delete(`http://localhost:5000/api/colors/${colorToDelete.id}`)
      .then(res => {
        console.log(res.data)
        colors.map((color, index) => {
          console.log(color, index)
          if (color.id == res.data) {
            newArray.splice(index,1)
            setColors(newArray)
          }
        })
      })
      .catch(e => {             
          console.log(e)
      })
  };
  
  return (
    <div className="container">
      <ColorList colors={colors} editing={editing} toggleEdit={toggleEdit} saveEdit={saveEdit} deleteColor={deleteColor}/>
      <Bubbles colors={colors}/>
    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
//2. Complete toggleEdit, saveEdit, deleteColor and functions
