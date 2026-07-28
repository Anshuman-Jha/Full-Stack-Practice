import { useContext, useState } from 'react'
import { CountContext } from './Context' // Provider
//Context Created Outside The Component to Avoid Prop Drilling && Making Code Readable 
function App() {

    const [count, setCount] = useState(0);

    // Wrap Anyone/All The Component that Wants to use The Teleported Value Inside a Provider
    // Have Provided The Value to CountContext.Provider which need to Be Teleported / Complex Object
    return (
        <div>
            <CountContext.Provider value={count}>
                <Count setCount={setCount} />
            </CountContext.Provider>


        </div>
    )

}
// This Count Component Re-Renders Even Though not Using State Variable Themself
// Passing Props For Child Component Buttons and CountRender
function Count({ setCount }) {
    return ( // This Componet Just Renderig 2 Child Component 
        // Not Using State Variable Count Themself
        <>
            <CountRender />
            <Buttons setCount={setCount} />
        </>
    )
}
// I Don't Have To Pass count as Props in CountRender() Component
// Since due to Context API => It Will be Teleported vby useContext()
function CountRender() {
    //Without Prop Drilling it Teleports the Value count state variable
    const count = useContext(CountContext); // Gives the value {count}

    return (
        <>
            {count}
        </>
    )
}



function Buttons({ setCount }) {
    //Teleported The State Variable count Variable from App Component via Teleporter
    const count = useContext(CountContext);

    return (
        <div>
            <button onClick={() => {
                setCount(count + 1)
            }}> Increment </button>
            <button onClick={() => {
                setCount(count - 1)
            }} > Decrement </button>
        </div>
    )
}


export default App;

// INTERVIEW TIME QUESTION !!!!
//ContextAPI Created to Avoid Prop Drilling && Making Code Readable && Syntax Cleaner
// NOT to Make Component ReRendering for Performing/Fix it =>  Instead
//Ex- Count Component Re-Renders Even Though not Using State Variable Themself

// State Managment is Used for Better Re-Rendering Performance