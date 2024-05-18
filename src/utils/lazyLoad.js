export default function lazyLoad(p) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("load module");
      resolve(p);
    }, 2000);
  });
}
