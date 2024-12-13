import React from 'react';
import GeneralNavbar from './GeneralNavbar';

const products = [
  {
    id: 1,
    image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQRDgfZvE6y7e2dX77Jg9ozyD_DAOaeCXqnjZIUt_yQzyCCWFftT5hQh1FE7xGpVXGWCOXMHJIsVZnZqUGpN-0PMW6MEu9SfP5RGLi9lrEXtCcazYYYnWVc&usqp=CAE",
    title: "Product 1",
    description: "SMART LIGHT BULB.",
    link: "https://www.google.com/shopping/product/3435818262580748083?q=smart+light+bulbs&sca_esv=0fa1702409854fcb",
  },
  {
    id: 2,
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcThkZJ9icyWbt1R7uJMmeThpNp3unqhfSq8W4EQavfLd00T_yJAlpG-u47jUahgrIYoZqyQ79sLugC9iCso9VvjGWfd8hlPdzeNQGKRTM-Y1X_-FORV15Zx7g",
    title: "Product 2",
    description: "SMART LIGHT BULB.",
    link: "https://www.google.com/shopping/product/8758994006091896310?sca_esv=0fa1702409854fcb",
  },
  {
    id: 3,
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSGguM46Dou0HRgTaubdQpjBaHfmJhzTvDsNUq5ct0UkqJ8zmDOpTRf72hI4xbpyi0sNzHqxjXBOEeq1-E4TTymw47RBWY81CYA7wxlbvQ-JWomE8jMIGTxJw&usqp=CAE",
    title: "Product 3",
    description: "SMART LIGHT BULB.",
    link: "https://www.google.com/url?q=https://www.dealsplant.com/products/avita-domus-10w-led-5ch-rgb-smart-bulb%3Fvariant%3D40038312738891",
  },
  {
    id: 4,
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTiXQcYlUpPe1YDuSKX6Dc43_kX1jm4TOnEvB1MAH-Av96F1GoXhX9i3PNa41-O8mDkN-Walzgyt6KmWed-pG_f0G7HQDwZL80PNW6Uyh_XlTeMukHSH4BTVg&usqp=CAE",
    title: "Product 4",
    description: "SMART LIGHT BULB.",
    link: "https://www.google.com/url?q=https://smartlivingindia.com/product/philips-wiz-smart-wifi-led-bulb-b22/%3Fattribute_pa_style-variant%3D10w",
  },
  {
    id: 5,
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR5LL3ioVC0s5IlkCvgO_6xKm5Tx6KX573ZBDXO1Gwza7hr_b7BJcDSmiyn842kqDY-q27mmBoxQxfxB2hMVxufL6eJqXWKq2Ki9VZGr05YQnsm7Bmi4xHN&usqp=CAE",
    title: "Product 5",
    description: "SMART FAN.",
    link: "https://www.google.com/url?url=https://atomberg.com/shop-ceiling-fans-atomberg-renesa-smart-ceiling-fan-with-bldc-motor",
  },
  {
    id: 6,
    image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR2TF5WVtACpcHG6wXrGG-Fz3rNHbmkMnU-_WLMKDp0QuEJo-iYFVdPGTY7YeyiDZ0HhXXXQZNWFMJBHfrTsFHwwQHuFhmTr0C7OypsMTE&usqp=CAE",
    title: "Product 6",
    description: "SMART FAN.",
    link: "https://www.google.com/url?q=http://www.flipkart.com/crompton-energion-roverr-smart-5-star-1200-mm-3-blade-ceiling-fan",
  },
];

const Products = () => {
  const containerStyle = {
    fontFamily: "Arial, sans-serif",
    backgroundImage: "url('https://img.freepik.com/free-photo/plain-dark-blue-product-background_53876-102471.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    margin: 0,
    padding: 0,
    minHeight: "100vh",
  };

  const headingStyle = {
    textAlign: "center",
    color: "#333",
    marginTop: "20px",
  };

  const productContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
    padding: "20px",
  };

  const productStyle = {
    border: "1px solid #ccc",
    padding: "15px",
    textAlign: "center",
    backgroundColor: "rgb(163, 158, 158)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const imgStyle = {
    maxWidth: "100%",
    height: "auto",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#007bff",
    fontWeight: "bold",
  };

  return (
    <>
      <GeneralNavbar/>
      <div style={containerStyle}>
        <h1 style={headingStyle}>Our Products</h1>
        <div style={productContainerStyle}>
          {products.map((product) => (
            <div key={product.id} style={productStyle}>
              <img src={product.image} alt={product.title} style={imgStyle} />
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <a href={product.link} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                View Product
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;