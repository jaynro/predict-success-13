import React, { useState } from 'react';
import './App.css';
import data from "./mock-data.json";
import { nanoid } from "nanoid";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";
import AutoCompleteRestaurant from "./components/AutoCompleteRestaurant";
import Header from "./components/Header";
import { Fragment } from 'react';


const App = () => {
  const [predictions, setPredictions] = useState(data);
  //const predictions = data;
  console.log(predictions);

  const [addFormData, setAddFormData] = useState({
    location: "",
    average_cost: "",
    restaurant_type: "",
    success: "",
  });

  const [editFormData, setEditFormData] = useState({
    location: "",
    average_cost: "",
    restaurant_type: "",
    success: "",
  });


  const [editPredictionId, setEditPredictionId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData, success: "" };
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);


  };

  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData);
  }

  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    console.log('Agregando nueva prediccion...');
    // Create the request body
    const requestBody = {
        location: addFormData.location,
        average_cost: addFormData.average_cost,
        restaurant_type: addFormData.restaurant_type,

    };

    fetch('http://127.0.0.1:5000/submitForm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then(response => response.json())
      .then(prediction => {
        // Handle the response from the API
        console.log('Received prediction:', prediction);

        // Update the state with the new prediction
        const newPredictions = [...predictions, prediction];
        setPredictions(newPredictions);
      })
      .catch(error => {
        // Handle any errors that occurred during the request
        console.log('Error:', error); // This is not working
        
      });
    

    const newPrediction = {
      id: nanoid(),
      location: addFormData.location,
      average_cost: addFormData.average_cost,
      restaurant_type: addFormData.restaurant_type,

      success: addFormData.success,
    };



    const newPredictions = [...predictions, newPrediction];
    setPredictions(newPredictions);


  }; // end of handleAddFormSubmit

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    const editedPrediction = {
      id: editPredictionId,
      location: editFormData.location,
      average_cost: editFormData.average_cost,
      restaurant_type: editFormData.restaurant_type,
      success: editFormData.success,
    };

    const newPredictions = [...predictions];
    const index = predictions.findIndex((prediction) => prediction.id === editPredictionId);
    newPredictions[index] = editedPrediction;
    setPredictions(newPredictions);
    setEditPredictionId(null);

  };

  const handleEditClick = (event, prediction) => {
    event.preventDefault();
    setEditPredictionId(prediction.id);

    const formValues = {
      location: prediction.location,
      average_cost: prediction.average_cost,
      restaurant_type: prediction.restaurant_type,
      success: prediction.success,
    };

    setEditFormData(formValues);

  }

  const handleCancelClick = () => {
    setEditPredictionId(null);
  };

  const handleDeleteClick = (predictionId) => {
    const newPredictions = [...predictions];
    const index = predictions.findIndex((prediction) => prediction.id === predictionId);
    newPredictions.splice(index, 1);
    setPredictions(newPredictions);
  }

  return (
    <div className="app-container" >
    <Header></Header>
      <form onSubmit={handleEditFormSubmit}>
      <div style={{ overflow: 'auto', maxHeight: '400px' }}>
        <table>  
          <thead>
            <tr>
              <th>Ubicacion</th>
              <th>Costo Promedio</th>
              <th>Tipo de comida</th>
              <th>Pronostico de exito</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {predictions.map((prediction) => (
              <Fragment>
                {editPredictionId === prediction.id ? (
                  <EditableRow editFormData={editFormData}
                    handleCancelClick={handleCancelClick}
                    handleEditFormChange={handleEditFormChange} />
                ) : (
                  <ReadOnlyRow prediction={prediction}
                    handleDeleteClick={handleDeleteClick}
                    handleEditClick={handleEditClick} />
                )}

              </Fragment>


            ))}

          </tbody>



        </table>
        </div> 
      </form>
      <h2>Agregar nueva prediccion</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input type="text" name="location" required="requiered" placeholder="Ingrese Ubicacion" onChange={handleAddFormChange} />
        <input type="text" name="average_cost" required="requiered" placeholder="Costo Promedio" onChange={handleAddFormChange} />
        <input type="text" name="restaurant_type" required="requiered" placeholder="Tipo de restaurante" onChange={handleAddFormChange} />
        

        <button type="submit">Agregar</button>
      </form>
    </div>
  );
};

export default App;
