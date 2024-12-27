import "./App.css";
import grocerycartimg from "./assets/grocery-cart.png";
import { useState, useEffect } from "react";
function App() {
  const [inputValue, setInputValue] = useState("");
  const [groceryItems, setGroceryItems] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);


  useEffect(() => {
    determineCompletedStatus();
  }, [groceryItems]);


  const handleChangeInputValue = (e) => {
    setInputValue(e.target.value);
  };
  //console.log(groceryItems);

  const determineCompletedStatus = () => {
    if (!groceryItems.length) {
      return setIsCompleted(false);
    }

    let isAllCompleted = true;

    groceryItems.forEach((item) => {
      if (!item.completed) isAllCompleted = false;
    });


    setIsCompleted(isAllCompleted);
  };


  const handleAddGroceryItem = (e) => {
    if (e.key === "Enter") {
      if (inputValue) {
        const updatedGroceryList = [...groceryItems];
        const itemIndex = updatedGroceryList.findIndex((item) => item.name === inputValue);

        if (itemIndex === -1) {
          updatedGroceryList.push({
            name: inputValue,
            quantity: 1,
            completed: false,
          });
        } else {

          updatedGroceryList[itemIndex].quantity++;
        }

        setGroceryItems(updatedGroceryList);
        setInputValue("");
      }
    }
  };


  const handleRemoveItem = (name) => {
    setGroceryItems([...groceryItems].filter((item) => item.name !== name));
  };

  const handleUpdateCompleteStatus = (status, index) => {
    const updatedGroceryList = [...groceryItems];
    updatedGroceryList[index].completed = status;
    setGroceryItems(updatedGroceryList);
  };


//   const [count,setCount]=useState(0);
//   const addToCount=()=>{
//   if(count<10){
//     setCount(count+1)
//   }
//   }
// const subtractFromCount=()=>{
//   if(count>0){
//     setCount(count-1)
//   }
// }

  const renderGroceryList = () => {
    return groceryItems.map((item, index) => (
      <li key={item.name}>
        <div className="container">
          <input type="checkbox" onChange={(e) => {
            handleUpdateCompleteStatus(e.target.checked, index);
          }}
            value={item.completed}
            checked={item.completed} />

            
          <p>
            {item.name}{item.quantity>1&&<span>x{item.quantity}</span>}
          </p>
        </div>
        {/* <p>{item.name}</p>
            <button className="b1"onClick={subtractFromCount}>-</button>
            <h3 className="p1">{count}  </h3>
            <button className="b1"onClick={addToCount}>+</button> */}
        <div>
          <button className="remove-button" onClick={() => handleRemoveItem(item.name)}> x </button>
        </div>
      </li>
    ));
  };

  return (
    <main className="App">
      <div>
        <div>
          {isCompleted && <h4 className="success">You're Done</h4>}
          <div className="header">
            <h1>Shopping List</h1>
            <img src={grocerycartimg} alt="" />
            <input type="text" placeholder="Add an item" className="item-input" onChange={handleChangeInputValue} onKeyDown={handleAddGroceryItem} value={inputValue} />
          </div>
        </div>


        <ul>
          {renderGroceryList()}
        </ul>
      </div>
    </main>
  );
}

export default App;