import React, { Suspense } from 'react'
import Banner from '../components/Banner/Banner';
import { LinearProgress } from '@mui/material'
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../components/ErrorBoundary';
const CoinsTable = React.lazy(()=> import("../components/CoinsTable"));

const Homepage = () => {
  return (
    <>
    <Banner />
    <ErrorBoundary FallbackComponent={ErrorFallback}
    onReset={()=>{}}
    >
      <Suspense fallback={<LinearProgress style={{ backgroundColor: "gold" }}  />}>
      <CoinsTable/>
    </Suspense>
    </ErrorBoundary>
    </>
  )
}

export default Homepage