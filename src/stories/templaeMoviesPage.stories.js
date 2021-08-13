import React from "react";
import TemplateMoviePage from "../components/templateMoviePage";
import SampleMovie from "./sampleData";
import { MemoryRouter } from "react-router";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

export default {
  title: "Movies/TemplateMoviePage",
  component: TemplateMoviePage,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,    
    (Story) => <QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>
  ],
};
export const Basic = () => <TemplateMoviePage movie={SampleMovie} />;

Basic.storyName = "Default";