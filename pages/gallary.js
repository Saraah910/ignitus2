import React, { useState } from 'react';
import pic1 from "../public/chef.jpg"
import pic2 from "./assets/man-laptop.jpg"
import pic3 from "./assets/pencil.jpg"
import pic4 from "./assets/main-page.png"
import pic5 from "./assets/logo-image.jpg"
import pic6 from "./assets/logo-image.jpg"
import { ConnectButton, Button } from 'web3uikit';
import { useMoralis } from 'react-moralis';
import Image from 'next/image';
import { ethers } from 'ethers';

export default function Gallary(){
    const {account} = useMoralis()
    let finalPrice
    const [pictures, setPictures] = useState([
          { id: 1, name: 'Picture 1', price: 10000000000000, address: pic1},
          { id: 2, name: 'Picture 2', price: 15000000000000, address: pic2},
          { id: 3, name: 'Picture 3', price: 20000000000000, address: pic3},
          { id: 4, name: 'Picture 4', price: 25000000000000, address: pic4},
          { id: 5, name: 'Picture 5', price: 30000000000000, address: pic5},
          { id: 6, name: 'Picture 6', price: 20000000000000, address: pic6},
        ]);
      
    const [cart, setCart] = useState([]);
    const [paid, setPaid] = useState(false);
      
    const addToCart = (picture) => {
        setCart((prevCart) => {
            return [...prevCart, picture];
        });
        setPictures((prevPictures) =>
            prevPictures.filter((item) => item.id !== picture.id)
        );
    };
    
    const removeFromCart = (picture) => {
        setCart((prevCart) => {
        const pictureIndex = prevCart.findIndex((item) => item.id === picture.id);
        if (pictureIndex !== -1) {
            const updatedCart = [...prevCart];
            updatedCart.splice(pictureIndex, 1);
            return updatedCart;
        }
        return prevCart;
        });
        setPictures((prevPictures) => [...prevPictures, picture]);

    };
    
    const getTotalPrice = () => {
        finalPrice = cart.reduce((total, item) => total + item.price, 0);
        return finalPrice;
    };

    const transferEther = async () => {
        
        console.log("transferring", finalPrice.toString())
        try {
          const provider = new ethers.providers.JsonRpcProvider('https://eth-goerli.g.alchemy.com/v2/dYQDiXglMEfbI6cRM1e5r2IxJECg4An0');
    
          const privateKey = 'ee43d50f940520e9c1977bfd6d2d47d6254a0935d80edf713d5d43a29a09a4ad';
          const wallet = new ethers.Wallet(privateKey, provider);
    
          const weiAmount = ethers.utils.parseEther(finalPrice.toString());
    
          const transaction = await wallet.sendTransaction({
            to: "0xa1b5EF94855aD94Ba9d069D72b5A3841c4e2AF61",
            value: weiAmount,
          });
    
          console.log('Transaction hash:', transaction.hash);
        } catch (error) {
          console.error(error);
        }
        setCart([])
      };

    return(
        <div style={{textAlign:"center", fontFamily:"cursive",margin:"5%"}}>
            <ConnectButton moralisAuth={false}></ConnectButton>
            <div style={{border:"2px solid red",marginLeft:"5%",marginRight:"5%", padding:"2%"}}>
                <h2>Pictures for Sale</h2>
                <br></br>
                <h4>Buy pictures of your choice starting just for 10 $</h4>
            </div>
            
            <ul style={{display:"flex", flexDirection:"row",alignItems:"center", gap:"3%",overflowX:"scroll",marginLeft:"15%",marginRight:"10%"}}>
                {pictures.map((picture) => (
                    <div key={picture.id} >
                            <Image alt={picture.name} src={picture.address} width={200} height={200}></Image>
                            <br></br>
                            <br></br>
                            <Button text='Buy' theme='outline' onClick={() => addToCart(picture)}></Button>
                            <br></br>
                    </div>
                
                ))}
            </ul>

            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty. <b>Buy items</b></p>
            ) : (
                <ul>
                {cart.map((picture) => (
                    <li key={picture.id} style={{listStyle:"none",display:"flex",justifyContent:"center",alignItems:"center"}}>
                    {picture.name} - ${picture.price}
                    <Image alt={picture.name} src={picture.address} width={80} height={80}></Image>
                    <Button text="Remove" size='small' theme='primary' onClick={() => removeFromCart(picture)}></Button>
                    </li>
                ))}
                </ul>
            )}

            {cart.length > 0 && (
                <div>
                <h3>Total Price: ${getTotalPrice()}</h3>
                <Button 
                    text='Pay'
                    theme='secondary'
                    // onClick={() => {
                    //     setCart([])
                    // }}
                    onClick={transferEther}
                ></Button>
                
                
                </div>
            )}
        </div>
        )
}