<<<<<<< HEAD
 const reportWebVitals = onPerfEntry => {
=======
const reportWebVitals = onPerfEntry => {
>>>>>>> 7b41ae252efcd20fe6bf32f350a36250aec2a145
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
