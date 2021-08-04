import React from "react";
import PaginationControlled from "../components/Pagination";
import SampleMovie from "./sampleData";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";


export default {
  title: "Home Page/Pagination",
  component: PaginationControlled,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
};

export const Basic = () => {
  return (
    <PaginationControlled
     
    
    />
  );
};
Basic.storyName = "Default";