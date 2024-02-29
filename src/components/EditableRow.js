import React, { useState } from 'react';
import './EditableRow.css';
const EditableRow = ({ editFormData, handleEditFormChange, handleCancelClick }) => {
    return (
        <tr>
            <td>
                <input
                    type="text"
                    required="requiered"
                    placeholder="Ingrese Ubicacion"
                    name="location"
                    value={editFormData.location}
                    onChange={handleEditFormChange}
        
                ></input>
            </td>

            <td>
                <input
                    type="text"
                    required="requiered"
                    placeholder="Costo Promedio"
                    name="average_cost"
                    value={editFormData.average_cost}
                    onChange={handleEditFormChange}
  

                ></input>
            </td>
            <td>
                <input
                    type="text"
                    required="requiered"
                    placeholder="Tipo de comida"
                    name="restaurant_type"
                    value={editFormData.restaurant_type}
                    onChange={handleEditFormChange}


                ></input>
            </td>
            <td>
  
                <button  
                          
                type="submit">Guardar</button>
            </td>
            <td>    
                <button class="styled" type="button" onClick={handleCancelClick}>Cancelar</button>
            </td>

        </tr>
    );

}

export default EditableRow;