import { useState } from 'react'

function App() {

    const [count, setCount] = useState(0);

    // Have to input/Props as setCount in Component Count nput => Prop Drilling
    //Even Though <Count /> Doesn't need it but we need to Pass for Child Components
    return (
        <div>
            <Count count={count} setCount={setCount} />

        </div>
    )

}
// In Order To Render Button Component Inside Count Component
// We need Pass Count Component Props 'setCount' also Even Though Count Does not need it
// We need to Pass Props Down The Component to Acceseed by Child => Prop Drilling
function Count({ count, setCount }) {
    return (
        <>
            {count}
            <Buttons count={count} setCount={setCount} />
        </>
    )
}

function Buttons({ count, setCount }) {

    return (
        <div>
            <button onClick={() => {
                setCount(c => c + 1)
            }}> Increment </button>
            <button onClick={() => {
                setCount(c => c - 1)
            }} > Decrement </button>
        </div>
    )
}

export default App;