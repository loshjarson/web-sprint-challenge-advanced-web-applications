import React from 'react';
import MutationObserver from 'mutationobserver-shim';
import fetchColorService from '../services/fetchColorService';
import { render, screen} from "@testing-library/react";
import BubblePage from './BubblePage';
import { waitFor } from '@testing-library/dom';

jest.mock('../services/fetchColorService')

const testColors = [
    {
        color: "aliceblue",
        code: {
          hex: "#f0f8ff",
        },
        id: 1,
      },
      {
        color: "limegreen",
        code: {
          hex: "#99ddbc",
        },
        id: 2,
      },
      {
        color: "aqua",
        code: {
          hex: "#00ffff",
        },
        id: 3,
      }
]

test("Renders without errors", ()=> {
    render(<BubblePage/>)
});

test("Renders appropriate number of colors passed in through mock", async ()=> {
    act(() => {fetchColorService.mockResolvedValue(testColors);})
    const {getAllByTestId} = render(<BubblePage/>)

    await waitFor(()=> {expect(fetchColorService).toHaveBeenCalled()});
    await waitFor(() => {
        const colors = getAllByTestId("color");
        expect(colors).toHaveLength(3)
    })
    
});