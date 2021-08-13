import React from "react";
import MovieReviews from "../components/movieReviews";
import SampleMovie from "./sampleData";
import { MemoryRouter } from "react-router";

export default {
  title: "Reviews/MovieReviews",
  component: MovieReviews,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
      ],
};

export const Basic = () => <MovieReviews movie={SampleMovie} />;

Basic.storyName = "Default";