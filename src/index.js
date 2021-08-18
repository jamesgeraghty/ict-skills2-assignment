import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch, Link } from "react-router-dom";
import HomePage from "./pages/homePage";
import UpcomingMoviesPage from "./pages/upComing";
import TopRatedMoviesPage from "./pages/topRated";
import PopularMoviesPage from "./pages/popularMovies";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage"; // NEW
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import WriteReviewPage from "./pages/addMovieReviewPage";
import PLayListPage from "./pages/playList";
import SimpleBottomNavigation from "./components/QuickNavigation/mainNav";
import NowPlayingMoviesPage from "./pages/nowPlayingMoviesPage";
import SimilarMoviesPage from "./pages/similarMovies";
import LoginPage from "./pages/loginPage";
import PrivateRoute from "./components/privateRoute";
import AuthHeader from "./components/authHeader";
import AuthProvider from "./contexts/authContext";
import { SiteSearch } from "./components/Searchpage";
import "./index.css";


// the below - will retain all data in the cache for 1 hour before it becomes invalidated
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <AuthProvider>
        <SiteHeader />
        <MoviesContextProvider>           
        <Switch>
        <Route exact path="/movies/search" component={SiteSearch} />
        <Route exact path="/movies/:id/similar" component={SimilarMoviesPage} />
        <Route exact path="/movies/now_playing" component={NowPlayingMoviesPage} />
        <Route exact path="/movies/popular" component={PopularMoviesPage} />
        <PrivateRoute exact path="/movies/playlist" component={PLayListPage} />
        <Route exact path="/movies/toprated" component={TopRatedMoviesPage} />
        <Route exact path="/reviews/form" component={AddMovieReviewPage} />
        <Route exact path="/movies/upcoming" component={UpcomingMoviesPage} />
        <Route path="/reviews/:id" component={MovieReviewPage} />
        <Route exact path="/movies/favorites" component={FavoriteMoviesPage} />
        <Route exact path="/reviews/form" component={WriteReviewPage} />
        <Route path="/movies/:id" component={MoviePage} />          
        <PrivateRoute exact path="/" component={HomePage} />   
        <Route path="/login" component={LoginPage} />   
        <Redirect from="*" to="/" />
        </Switch>
        </MoviesContextProvider>
        <SimpleBottomNavigation />
        </AuthProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));