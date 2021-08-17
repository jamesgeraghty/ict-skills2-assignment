import React from "react";
import { ResultsCard } from "../components/ResultsCard";
import { MemoryRouter } from "react-router";

export default {
  title: "Results Card",
  component: ResultsCard,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
  ],
};

export const Basic = () => <ResultsCard />;

Basic.storyName = "Default";
