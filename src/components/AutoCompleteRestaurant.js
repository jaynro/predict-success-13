import React, { useState } from 'react';

const suggestions = [
    
'American,  Barbecue,  European',
'American,  Burger,  Italian,  Continental',
'Arabian,  North Indian,  Chinese,  Biryani',
'Bengali,  North Indian,  Chinese',
'Chinese,  Asian,  Japanese',
'Chinese,  Bengali,  Seafood',
'Continental,  Asian,  Italian,  Chinese',
'European,  American,  Italian,  Continental,  Drinks',
'Fast Food,  Coffee,  Pizza,  Drinks',
'Fast Food,  Desserts,  Bakery and Confectionary'  ,
'Italian,  Continental,  Chinese,  Coffee',
'Mexican,  American,  Fast Food',
'North Indian,  Chinese,  Continental,  Italian',
'Multi-Cuisine,  Chinese,  Continental,  American',





];

const AutoCompleteRestaurant = ({ handleAddFormChange}) => {
    return (
        <div>
        <input list="restaurants"
  
        name="restaurant_type" 
        required="requiered" 
        placeholder="Tipo de comida" 
        onChange={handleAddFormChange} />
        
        <datalist id="restaurants">
            {suggestions.map((suggestion, index) => (
            <option key={index} value={suggestion} />
            ))}
        </datalist>
        </div>
    );
}

export default AutoCompleteRestaurant;