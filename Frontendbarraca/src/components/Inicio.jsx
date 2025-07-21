import React from "react";
import SimpleImageSlider from "react-simple-image-slider";



export const Inicio = () => {
const images = [
  { url: "./src/assets/fondo1.2.jpg" },
  { url: "./src/assets/fondo2.jpg" },
  { url: "./src/assets/fondo3.jpg" },

];
 
  return (
    <>
      <div>
      <SimpleImageSlider
        width={1350}
        height={500}
        style={{marginTop:"10rem", position:"relative", zIndex:"01", width:"100%", backgroundSize:"cover"}}
    images={images}
        showBullets={true}
        showNavs={true}
        autoPlay={true}
      />
    </div>
     
      
    </>
  );
};
