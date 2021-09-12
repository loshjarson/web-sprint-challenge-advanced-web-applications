import React, { useState } from "react";

import Color from './Color';
import EditMenu from './EditMenu';

const ColorList = (props) => {
  const { colors, editing, toggleEdit, saveEdit, deleteColor } = props;
  const [ editColor, setEditColor] = useState({ color: "", code: { hex: "" }});
  const [ colorId, setColorId ] = useState("");

  return (
    <div className="colors-wrap">
      <p id="color_title">colors</p>
      <ul>
        {colors.map(color => <Color key={color.id} setEditColor={setEditColor} color={color} toggleEdit={toggleEdit} deleteColor={deleteColor} setColorId={setColorId}/>)}
      </ul>
      
      {editing && <EditMenu editColor={editColor} setEditColor={setEditColor} toggleEdit={toggleEdit} saveEdit={saveEdit} colorId={colorId}/>}
    </div>
  );
};

export default ColorList;