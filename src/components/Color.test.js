import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Color from './Color';

test("Renders without errors with blank color passed into component", () => {
    render(<Color color={{
        color: "",
        code: {
          hex: "",
        },
        id: 0,
      }}/>)
});
  
test("Renders the color passed into component", () => {
    render(<Color color={{
        color: "limegreen",
        code: {
          hex: "#99ddbc",
        },
        id: 2,
      }}/>)
    const targetColor = screen.getByTestId("color")
    expect(targetColor).not.toBeNull()
});

test("Executes handleDelete and toggleEdit property when the 'x' icon is clicked", () => {
    const toggleEdit = jest.fn();
    const deleteColor = jest.fn();
    render(<Color color={{
        color: "limegreen",
        code: {
          hex: "#99ddbc",
        },
        id: 2,
      }} toggleEdit={toggleEdit} deleteColor={deleteColor}/>);
    
    
    const deleteButton = screen.getByTestId("delete");

    userEvent.click(deleteButton);
    
    expect(toggleEdit).toHaveBeenCalled();
    expect(deleteColor).toHaveBeenCalled();
});

test("Executes setEditColor and toggleEdit property when color div is clicked", () => {
    const setEditColor = jest.fn();
    const toggleEdit = jest.fn();
    const setColorId = jest.fn();

    render(<Color color={{
        color: "limegreen",
        code: {
          hex: "#99ddbc",
        },
        id: 2,
      }} toggleEdit={toggleEdit} setEditColor={setEditColor} setColorId={setColorId}/>);

    const colorDiv = screen.getByTestId("color");
    userEvent.click(colorDiv);

    expect(toggleEdit).toHaveBeenCalled();
    expect(setEditColor).toHaveBeenCalled();
});