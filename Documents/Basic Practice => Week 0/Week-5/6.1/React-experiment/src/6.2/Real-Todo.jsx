import React, { useState, useEffect } from 'react';
import axios from "axios";

function Todo() {

    // Return Todo Corresponding to id / clicker state variable
    const [selectedId, setSelectedId] = useState(1);

    // Can't do Straight => OnClick = {setId} => State Function => Wrong
    //Here for Each Buttton Type we set state variable id on Clicking button
    // Setting State Varible id equal to Button Number => selectedId = Button Number
    // Taht's Why we eDefine Specific Function For Each Button
    // Rendering Child Compnent Corresponding to that id  
    return (
        <div>
            <Button onClick={function () {
                setSelectedId(1)
            }}> 1
            </Button>
            <Button onClick={function () {
                setSelectedId(2)
            }}> 2
            </Button>
            <Button onClick={function () {
                setSelectedId(3)
            }}>  3
            </Button>
            <Button onClick={function () {
                setSelectedId(4)
            }}> 4
            </Button>

            {/*  This Below Line Renders Child Component for id = selectedId*/}
            <Todos id={selectedId} />
        </div>
    )


}
// We pass The Value id as State Varibale which Keeps on Changing on Button Click 
// We are assigning that id to the component => Id is created by us
function Todos({ id }) {

    const [todos, setTodos] = useState([]);

    // // We use asyncuseEffect Library for async function inside UseEffect()

    // (,[]) => Run Only Once when First Time component get Rendered => Will Not Run After That No Matter What Changes 
    useEffect(() => {

        axios.get(`https://sum-server.100xdevs.com/todos?id=${id}`)
            .then(function (response) { // .data.todo => Have there todos after axios fetch the data
                setTodos(response.data.todos) // updating state variable
            })
            .catch((err) => {
                console.error("Error Fetching Data");
            });

        // But When we Set [id] => Runs When The id Changes
    }, [id]);


    return (
        <div>
            {todos.map((todo) =>
                <Eachtodo title={todo.title} description={todo.description} Id={id} />
            )}
        </div>
    )

}

function Eachtodo(props) {

    return (
        <div>
            Id: {props.Id}
            <h1> {props.title} </h1>
            <h1> {props.description} </h1>
        </div>
    )

}

export default Todo;

// can't Run Async Function Inside useEffect() => Below Code is Wrong 

/*  useEffect(async () => {

        const response = await axios.get("https://sum-server.100xdevs.com/todos");

        setTodos(response.data.todos) // updating state variable

    }, []);
*/

// We use asyncuseEffect Library for async function inside UseEffect()
