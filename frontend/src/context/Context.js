import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const userInfo = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : null;

  const [product, setProduct] = useState([
    {
      id: 1,
      url: "https://fastly.picsum.photos/id/12/2500/1667.jpg?hmac=Pe3284luVre9ZqNzv1jMFpLihFI6lwq7TPgMSsNXw2w",
      name: "Beach Side",
      category: "Paintings",
      seller: "Evalie Wagner",
      price: 50,
    },
    {
      id: 2,
      url: "https://fastly.picsum.photos/id/11/2500/1667.jpg?hmac=xxjFJtAPgshYkysU_aqx2sZir-kIOjNR9vx0te7GycQ",
      name: "Fall Panorama",
      category: "Landscapes",
      seller: "Songmi Heart",
      price: 80,
    },
    {
      id: 3,
      url: "https://fastly.picsum.photos/id/13/2500/1667.jpg?hmac=SoX9UoHhN8HyklRA4A3vcCWJMVtiBXUg0W4ljWTor7s",
      name: "Eagles Nest",
      category: "Photos",
      seller: "Ivan Didovoduik",
      price: 100,
    },
    {
      id: 4,
      url: "https://fastly.picsum.photos/id/18/2500/1667.jpg?hmac=JR0Z_jRs9rssQHZJ4b7xKF82kOj8-4Ackq75D_9Wmz8",
      name: "Colourful Fields",
      category: "Landscapes",
      seller: "Zinna Yoo",
      price: 60,
    },
    {
      id: 5,
      url: "https://fastly.picsum.photos/id/29/4000/2670.jpg?hmac=rCbRAl24FzrSzwlR5tL-Aqzyu5tX_PA95VJtnUXegGU",
      name: "Our Hillside",
      category: "Photos",
      seller: "Paul Ledent",
      price: 120,
    },
    {
      id: 6,
      url: "https://fastly.picsum.photos/id/51/5000/3333.jpg?hmac=9dZb89mIRt-mPQpI_ScJAxVsNI82SFCGOuiKsvGSchY",
      name: "Sea View",
      category: "Paintings",
      seller: "Tom Voyce",
      price: 40,
    },
  ]);

  const [cart, setCart] = useState([]);

  const addToCart = (data) => {
    setCart([...cart, { ...data, quantity: 1 }]);
  };

  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => {
      return item.id !== id;
    });
    setCart(newCart);
  };

  return (
    <GlobalContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        product,
        setProduct,
        removeFromCart,
        userInfo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
