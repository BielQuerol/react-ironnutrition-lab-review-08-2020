import React, { Component } from 'react'
import 'bulma/css/bulma.css'
import foods from './foods.json'
import FoodBox from './components/Foobox/FoodBox'
import AddFoodForm from './components/AddFoodForm/AddFoodForm'
import SearchBar from './components/Searchbar/SearchBar'

export default class App extends Component {
  state = {
    foodList: foods, // array principal con todas las comidas (utilizado durante del filter en método `filterFood`)
    filteredFood: foods,  // array filtrado que estamos mostrando/renderizando en render
    calculatedFoods: []   // array con las comidas añadidas por botón "+" de FoodBox y método `addNewFood` 
  }

  //Creo la función que recibe una comida, hace una copia del
  //estado de foods y lo agrega al foodList
  addFood = (food) => {
    const newFoodList = [...this.state.filteredFood, food];
    const filteredFoodCopy = [...this.state.filteredFood, food]
    this.setState({
      foodList: newFoodList,
      filteredFood: filteredFoodCopy
    })
  };

  filterFood = (searchStr) => {
    // crear copia del array foods
    const foodCopy = [...this.state.foodList]
    // filtrar y crear nuevo array
    const filteredFood = foodCopy.filter((foodObj) => {
      if (foodObj.name.toLowerCase().includes(searchStr)) {
        return true;
      } else {
        return false;
      }
      // return foodObj.name.toLowerCase().includes(searchStr)
    })

    // actualizar state
    this.setState({ filteredFood: filteredFood });

  }

  addNewFood = (foodToAddObj) => {
    console.log('foodToAddObj', foodToAddObj)
    const calculatedFoodsCopy = [...this.state.calculatedFoods];

    if (calculatedFoodsCopy.length === 0) { // si el array de calculatedFoods es vacío
      calculatedFoodsCopy.push(foodToAddObj);
      this.setState({ calculatedFoods: calculatedFoodsCopy }); // actualiza el `state`
    }
    else { // si el array de calculatedFoods ya tiene algunas comidas añadidas
      let foundFood = false; // la variable indicadora

      const updatedCalculatedFoods = calculatedFoodsCopy.map((addedFoodObj) => {
        // si la comida ya existe, actualiza el objeto
        if (addedFoodObj.name === foodToAddObj.name) {
          addedFoodObj.quantity += foodToAddObj.quantity;
          foundFood = true; // cambiamos la variable indicadora a true, porque hemos encontrado y actualizado la comida 
        }
        return addedFoodObj;
      })

      if (!foundFood) {
        // si comida con este nombre ya no existe en calculatedFoods, 
        // si no la hemos encontrado durante de iteracion con el calculatedFoodsCopy.map
        // añade la comida al array
        console.log('HERE',)
        console.log('foundFood', foundFood)
        console.log('foodToAddObj **', foodToAddObj)

        updatedCalculatedFoods.push(foodToAddObj);
        console.log('after push', updatedCalculatedFoods)

      }

      this.setState({ calculatedFoods: updatedCalculatedFoods }); // actualiza el `state`
    }
  }


  render() {
    return (
      <div>
        {/* IT4.3: Paso la función de filtrado como prop. */}
        <SearchBar filterFood={this.filterFood} />

        {/* Le pasamos la función addFood al children AddFoodFood */}
        <AddFoodForm addFood={this.addFood} />

        {/* React necesita que le asignemos una key a cada iteración
                Para poder borrarlo o actualizarlo, solamente ese, no todo */}
        {this.state.filteredFood.map((food, index) => (
          <FoodBox food={food} key={index} addNewFood={this.addNewFood} />))}


        {/* Aqui estamos imprimiendo/mostrando la lista de comidas añadidas */}

        {
          this.state.calculatedFoods.map((addedFoodObj, i) => {
            // aqui calculamos las calorias totales
            const totalCalories = addedFoodObj.calories * addedFoodObj.quantity;

            return <p key={i} > {addedFoodObj.quantity} {addedFoodObj.name} {totalCalories}kcal</p>
          })
        }
      </div>
    )
  }
}