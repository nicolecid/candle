// All Imports
import React from 'react';
import { useState } from 'react';
import { Button } from "@material-ui/core";
import { Card } from '@material-ui/core';
import nyc from './newyork.png';
import ib from './ibiza.png';
import la from './LA.jpeg';
import sant from './santiago.png';
import par from './paris.png';
import lon from './london.png';
import ams from './amsterdam.jpg';
import hels from './helsinki.png';
import tok from './tokyo.png';
import mia from './miami.png';
import rio from './rio.png';
import vien from './vienna.png';
import dub from './dubai.jpg';
import seo from './seoul.png';

// Constants
const LOW = 'Low To High'
const HIGH = 'High to Low'
const TALL = 'Tall'
const MEDIUM = 'Medium'
const SMALL = 'Small'
const LAV = 'Lavender'
const SAL = 'Salty'
const CIT = 'Citrus'
const VAN = 'Vanilla'
const BERR = 'Berry'

// Disclaimer: I do use functional React because I learned it first like that 
// and it made more sense to me. 

export default function Items({ setCart, cart }) {
    // styling for different buttons and Card
    const button = {
        backgroundColor: '#B4B4B4',
    }
    const button2 = {
        backgroundColor: 'white',
    }
    const card = {
        backgroundColor: 'lavender',
        width: '230px',
        height: '430px',
    }

    // 3 constants for the states of filtering and sorting features
    const [price, setPrice] = useState(LOW);

    const [scent, setCandleScent] = useState('All');

    const [size, setCandleSize] = useState('All');
   

    // creating the list of items and using the state of them
    const [items] = useState([
        { name: "New York", scent: LAV, size: SMALL, price: '15', image: nyc },
        { name: "Ibiza", scent: SAL, size: MEDIUM, price: '20', image: ib },
        { name: "Los Angeles", scent: CIT, size: TALL, price: '25', image: la },
        { name: "Santiago", scent: VAN, size: MEDIUM, price: '20', image: sant },
        { name: "Paris", scent: LAV, size: SMALL, price: '15', image: par },
        { name: "London", scent: BERR, size: MEDIUM, price: '20', image: lon },
        { name: "Amsterdam", scent: LAV, size: TALL, price: '25', image: ams },
        { name: "Helsinki", scent: VAN, size: SMALL, price: '15', image: hels },
        { name: "Tokyo", scent: BERR, size: TALL, price: '25', image: tok },
        { name: "Miami", scent: SAL, size: MEDIUM, price: '20', image: mia },
        { name: "Rio de Janeiro", scent: CIT, size: TALL, price: '25', image: rio },
        { name: "Vienna", scent: VAN, size: SMALL, price: '15', image: vien },
        { name: "Seoul", scent: BERR, size: TALL, price: '25', image: seo },
        { name: "Dubai", scent: SAL, size: MEDIUM, price: '20', image: dub },
    ]);

    //ALL CART METHODS:
    //Adding to Cart
    function addToCart(candle){
        let newCart = [...cart];
        let itemInCart = newCart.find((item) => candle.name === item.name);
        if (itemInCart) {
            itemInCart.quantity++;
        } else {
            itemInCart = {...candle, quantity: 1,};
            newCart.push(itemInCart);
        }
        setCart(newCart);
    };

    // returns the total price of the cart
    function sumCart(){
        var sum = cart.reduce((sum, { price, quantity }) => sum + price * quantity, 0);
        return sum;
    }

    // removes an item from the cart and reduces que quantity
    function removeFromCart(candle){
        var newCart = [...cart];
        var itemInCart = newCart.find((item) => candle.name === item.name);
        if (itemInCart) {
            itemInCart.quantity--;
        }
        setCart(newCart);
    }
    
    // clears the cart completly by emptying the list
    function clearCart(){
        setCart([]);
    }

   
    // FILTER and SORTING METHODS: 
    // filters the candles by scent
    function filterScent(){
        if (scent === 'All') {
            return items;
        } else {
            return items.filter((candle) => candle.scent === scent);
        }
    };

    // filters the candles by size
    function filterSize() {
        if (size === 'All') {
            return items;
        } else {
            return items.filter((candle) => candle.size === size);
        }
    };

    // sorts the candles by price
    function sortCandles(listCandles){
        var num = 1;
        var listResult = listCandles.sort((one, two) => {

            if (one.price < two.price){
                return num;
            }
                
            if (one.price > two.price){
                return -num;
            }
                
            if (price === LOW) {
                num = -1;
            }
            return 0;
        });
        return listResult
    }

    // associated all filters with each other so they work all at the same time
    function getFilters() {

        if (filterScent().length === items.length) {

            return sortCandles(filterScent()), filterSize();
        }

        if (filterSize().length === items.length) {

            return sortCandles(filterSize()), filterScent();
        }

        var filt = filterScent().filter((x) => {
            return filterSize().indexOf(x) !== -1;
        });

        return sortCandles(filt);
    }

    // returns all the display
    return (
        <div>
            <h3> Filters</h3>
            <div className='FL-item'>
        
                <h4>
                    Scent 
                </h4>
                <select onChange={(event) => setCandleScent(event.target.value)}>
                    <option>
                        {'All'}
                    </option>
                    <option>
                        {LAV}
                    </option>
                    <option>
                        {SAL}
                    </option>
                    <option>
                        {CIT}
                    </option>
                    <option>
                        {VAN}
                    </option>
                    <option>
                        {BERR}
                    </option>
                </select>
            

                <h4>
                    Size 
                </h4>
                <select onChange={(event) => setCandleSize(event.target.value)}>
                    <option>
                        {'All'}
                    </option>
                    <option>
                        {TALL}
                    </option>
                    <option>
                        {MEDIUM}
                    </option>
                    <option>
                        {SMALL}
                    </option>
                </select>
            

                <h4>
                    Sort
                </h4>
                <select onChange={(event) => setPrice(event.target.value)}>
                    <option>
                        {LOW}
                    </option>
                    <option>
                        {HIGH}

                    </option>
                </select>
            </div>


            <div className='FL-get'>
            <div className='titleCart'>
                <h2>Shopping Cart</h2>
                <h4>Total Price: ${sumCart().toFixed(2)}</h4>
                </div>
                
                <div className='FL-cart'>
                    {cart.map((candle) => (
                        <div className="cart">
                            <Card style={card}>
                                <h2>{candle.name}</h2>
                                <img src={candle.image} alt='h1' />
                                <p>{candle.scent}</p>
                                

                                <Button onClick={() => addToCart(candle)} style={button2}>
                                     +
                                </Button>
                                
                                <Button style = {button} >
                                    {candle.quantity}
                                </Button>
                                
                                <Button onClick={() => removeFromCart(candle)}style={button2}> 
                                    -
                                </Button>
                            </Card>
                        </div>
                    ))}

                    {cart.length > 0 && (
                        <Button onClick={() => clearCart()} style={button}>
                            Remove All
                        </Button>
                    )}
                </div>
           
                {getFilters().map((candle) => (
                    <div className="candle">
                        <Card>
                            <h2>
                                {candle.name}
                            </h2>
                            <img src={candle.image} alt='h' />

                            <p>
                                {candle.scent}
                            </p>
                            <p>
                                {candle.size}
                            </p>
                            <p>
                                ${candle.price}
                            </p>

                            <Button onClick={() => addToCart(candle)} style={button}>
                                Add to Cart
                        </Button>
                        </Card>

                    </div>
                ))}

            </div>

        </div>

    )

}
