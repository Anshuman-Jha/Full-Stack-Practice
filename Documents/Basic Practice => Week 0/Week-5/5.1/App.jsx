import React from 'react';
import { useState } from 'react';
function App() {
    // This useState(0) => We pass Inital Value of state as 0
    // This Function Returns Two Value , First One set to count and second to setCount
    const [counter, setCount] = useState(0); // In

    function onClickHandler() {
        // counter = counter + 1; // But is not a correct way to Set State Variable count in react

        //Call the Function with new State Value => Changing the state
        setCount(counter + 1); // Pass the New State Variable value in function call

        //React Eventually Autoomatically ReRenders when State Changes
    }
    // This Part is Basically Component button which Takes Counter as an Input
    // Returns the Component i.e button i.e how it is Show when State Changes
    return (
        <div>
            <customButton count={counter} setcount={setCount} />
            <customButton count={counter + 100} setcount={setCount} />
        </div>
    )

    // Takes State as Input(count) => customButton is Component rendering
    function customButton(props) {
        //Given a State Value => Call Component for Differnt State Value =>It Renders Correspondigly
        //Componet taking state Object as Input => count , setCount as Property
        function onClickHandle() {
            props.setcount(props.count + 1);
        }

        return (
            <button onClick={onClickHandle}>
                Counter {props.count}
            </button>
        )

    }

} 