import React from 'react';

const Footer = () => {


  const footerRef = React.useRef(null)

  const [footerHeight, setFooterHeight] = React.useState(0)

  // function calcFooterHeight(footerEl: HTMLDivElement){
  //   let offsetHeight = footerEl.offsetHeight
  //   console.log(offsetHeight)
  //   // footerRef.current.style.top = `calc(100vh  - ${offsetHeight}px)`
  //   setFooterHeight(offsetHeight)
  // }
  //
  // React.useEffect(()=>{
  //   if(footerRef.current){
  //     calcFooterHeight(footerRef.current)
  //   }
  //
  //   window.addEventListener("resize", (e)=> {
  //
  //     if(footerRef.current){
  //       calcFooterHeight(footerRef.current)
  //     }
  //   })
  // }, [])


  // console.log("state")

  return (
    <footer ref={footerRef} style={{top: `calc(100vh  - ${footerHeight}px)`}}  className="bg-primary absolute  w-full">
      
      <div className="container-1200">
        <div className="px-4">
          <h1>Footer</h1>
          <p>Lorem ipsum dolor sit amet,</p>
        </div>

      </div>
      
      
    </footer>
  );
};

export default Footer;