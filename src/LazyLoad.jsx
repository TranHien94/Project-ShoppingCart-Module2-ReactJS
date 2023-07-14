

import React, { lazy, Suspense } from 'react'
import Loading from './components/Loading';


const LazyLoad = (importFunct) => {

    const LazyComponent = lazy(importFunct);

    return (props) => (
        <Suspense fallback={<Loading/>}>
            <LazyComponent {...props} />
        </Suspense>
    )
};



export default LazyLoad
