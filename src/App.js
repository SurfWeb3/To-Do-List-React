//import logo from './logo.svg';
import { useState, useEffect } from "react"
import './App.css'



function App() {
//the "useState()" function is used to make the starting value of the state variable, 
//and also provides a function to update that value.
//a value is put into the (), and and array, inside (), 
//is used for the list (of things to do) shown on the web page
//With the form, we have a text field where we put in the things to do

//We use "setTodos", which is a useState hook function, to control and set the text values,
//and to control the state of "todos" (the to-do list)
const [todos, setTodos] = useState([]) 


useEffect(() => {
  const storedTodos = JSON.parse(localStorage.getItem("todos"))
  if (storedTodos.length > 0) {
    setTodos(storedTodos)
  }
}, [])

useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos))
}, [todos])




//We use a function to add items to the to-do list (to the array)
//We can call addTodo function with text argument
  function addTodo(text) {

//We use "setTodos", which is a useState hook function, to control and set the text values,
//and to control the state of "todos" (the to-do list)    
//function "addTodo" adds a new to-do (to the array list)
//We add to-dos with text
//strings sent to the text parameter are put at the end of the array (of to-do items)
//With "...todos" we have the todos array (list), and we add to the array (list) with "text" (of input)
    setTodos([...todos, text])
  }
  //"filter" : (JavaScript) "a method used to return array elements 
  //that match the condition stated in a callback function" (OT)
  //we repeat through todos (called "todo"), & repeat through the index (called "i") 
  //The filter function in the code removes the element with the index 
  //that matches the index of the string value the user wants to remove.

  
    function removeTodo(index) {
      setTodos(todos.filter((todo, i) => i !== index ))
    }
//function "removeTodo" removes an item 
//input and button are for user input, 
//ul (= unorderd list = list without numbers) is for showing the to-do items on screen, 
//usung the JavaScript map function inside the HTML list,
//which repeats through "todo" and "index"
//onSubmit is a submit listener
//the addTodo function-call-item receives input event.target.elements.todo.value
//and calls the function addTodo, which has the argument text, and
//text receives the value of "todo", which is the name of the text input tag
//<input type="text" name="todo" /> USER INPUT
//event.target.elements sends the data to addTodo function's input "text"
//which calls setTodos, and add the new text to the end of the list
//event.target.elements is used to get data from an HTML page (event/event listener)
//we need to call with event.preventDefault to not submit again and again


//function editTodo(index, newText) {
//  updatedTodos[index] = newText;
//  
//  setTodos(newTodos) //(updatedTodos);
//}

//alternative version of edit 
//(I might need to change "newText" and updatedTodos" names elsewhere in this code):
function editTodo(index, text) {
  const newTodos = [...todos];
  newTodos[index] = text
// this line of code did not work:  
console.log("editTodo has been called: new task is: ", text)
//we call setTodos
    setTodos(newTodos);
}


  return (
    <div className="App">
      <h1>To-do List</h1>
      <form onSubmit={(event) =>{
          event.preventDefault()
          addTodo(event.target.elements.todo.value)
//event.target.elements.todo.value = "" erases sent input, that user put in the field
//"submit" = "to send user input"
          event.target.elements.todo.value = ""
        }}>

        <input type="text" name="todo" />
        <button type="submit">Add to-do</button>
      </form>
      <ul>
      {todos.map((todo, index) => (
      //li = list item, which is a single item on a list
      //onClick with button removes todo item
      //; was needed to separate the tag section
      //li has a key prop  the key prop should be unique for the list  we use "index" since that's always unique
      //{todo} (under <li key={index}>) is where we showing the text items, and we replace it with an input field
          <li key={index}>
            <input type="text" value={todo} onChange={(event) => editTodo(index, event.target.value)} />
            <button onClick={() => removeTodo(index)}>Remove</button>
          </li>
      ) ) }
      </ul>
 
    </div>
  );
}


export default App;