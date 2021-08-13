import React from "react";
import Spinner from "../components/spinner";
import SampleMovie from "./sampleData";

export default {
  title: "Spinner",
  component: Spinner
};

export const Basic = () => <Spinner credit={SampleMovie} />;

Basic.storyName = "Default";