import React from "react";
//import getMovieReviews from "../components/movieReviews";
import SampleMovie from "./sampleData";
import { MemoryRouter } from "react-router";
///import { action } from "@storybook/addon-actions";
import MovieReviews from "../components/movieReviews";

export default {
  title: "Movie Details Page/MovieReviews",
  component: MovieReviews,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
  ],
};

export const Basic = () => <MovieReviews movie={SampleMovie} />;

Basic.storyName = "Default";
