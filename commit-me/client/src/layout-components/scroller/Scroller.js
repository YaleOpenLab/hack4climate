import React, {useEffect}  from 'react';

function Scroller(props) {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [props.location]) // Only run this effect if props.location changes

  return (
    <div className="Scroller">
      {props.children}
    </div>
  );

}
export default Scroller;
