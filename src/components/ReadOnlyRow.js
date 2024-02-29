import React, { useState } from 'react';

const ReadOnlyRow = ({prediction,handleEditClick,handleDeleteClick }) => {
    return (
        <tr>
        <td>{prediction.location}</td>
        <td>{prediction.average_cost}</td>
        <td>{prediction.restaurant_type}</td>
        <td>{prediction.success}</td>
        <td>
            <button onClick={(event) => handleEditClick(event, prediction)}>Editar</button>   
            <button onClick={() => handleDeleteClick(prediction.id)}>Eliminar</button>
        </td>
        
        </tr>
    );

}

export default ReadOnlyRow;