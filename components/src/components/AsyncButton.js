import React from 'react';

// Taken from https://github.com/then/is-promise
function isPromise(obj) {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  );
}

export const AsyncButton = ({onClick, disabled, loadingNode, children, ...props}) => {
  const [loading, setLoading] = React.useState(false);

  // const asyncHandler = React.useCallback(
  //   async e => {
  //     const result = onClick(e);
  //     if(isPromise(result)) {
  //       try {
  //         setLoading(true);
  //         await result;
  //       }finally {
  //         setLoading(false);
  //       }
  //     }
  //   }
  // )
  const asyncHandler = async(e) => {
    const result = onClick(e);
        if(isPromise(result)) {
          try {
            setLoading(true);
            await result;
          }finally {
            setLoading(false);
          }
        }
  }

  return <button {...props} onClick={asyncHandler}>{(loading && loadingNode) || children}</button>
}