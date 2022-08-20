import { makeStyles } from '@mui/styles';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import {
  useTheme,
  ThemeProvider,
  LinearProgress
} from "@mui/material";
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorBoundary';
import Alert from './components/Alert';
const Coinpage = React.lazy(() => import("./pages/Coinpage"));
const Homepage = React.lazy(() => import("./pages/Homepage"));

function App() {
  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: "#14161a",
      color: "white",
      minHeight: "100vh"
    }
  }))
  const theme = useTheme();
  const classes = useStyles()
  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary FallbackComponent={ErrorFallback}
    onReset={()=>{}}
    >
      <div className={classes.App}>
        <Suspense fallback={<LinearProgress style={{ backgroundColor: "gold" }} />} >
          <Header />
          <Routes>
            <Route path="/" element={<Homepage />} exact />
            <Route path="/coins/:id" element={<Coinpage />} />
          </Routes>
        </Suspense>
      </div>
      <Alert />
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
