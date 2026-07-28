import React, { useState, useCallback } from "react";

function App() {

    const [count, setCount] = useState(0);

    //useCallback is to Memoize Function  => Returns Function
    const inputFunction = useCallback(() => { // Function Wrapped Inside useCallback
        console.log("Hi There");
    }, [])
    //Will Consider Input Function Changed if only inside dependency Array Changes / Or [] => Consider Input Chnagered Only Once 

    // Every Time Parent Renders , Child Re-Renders Until we use memo
    return (
        <>
            <ButtonComponent inputFunctionVal={inputFunction} />
            <Button onClick={() => {
                setCount(count + 1)
            }
            } />
        </>
    )

}
// memo() with useCallback()=> Props input Function not Changes => Child don't Render
// Due to useCallBack Child Componnet will Not Render else It would have Renderd
// Wrap Component Inside Memo With Help of useCallback IT Will not render Even for Same Input Function
const ButtonComponent = memo(({ inputFunctionVal }) => {

    console.log("Child Renderd");

    return (
        <>
            <Button> Button Clicked</Button>
        </>
    )
})

// Without CallBack Even Using memo() using Same Input Function 
// It Will Re-Render Child Component 
function AnotherApp() {

    const [count, setCount] = useState(0);

    function inputFunction() {
        console.log("Hi There"); //Constant Function 
    }

    return (
        <>
            <ButtonComponents inputFunctionVal={inputFunction} />
            <Button onClick={() => {
                setCount(count + 1)
            }
            } />
        </>
    )

}
// As Same for Object and Function => Without useCallback(,[])
// inputFunction1 == inputFunction2 => False => Body is Same => Refernce is Different

// Even We Use Memo() same function passed as Props i.e same input But Child Compnent Re-Renders

const ButtonComponents = memo(({ inputFunctionVal }) => {

    console.log("Child Renderd");

    return (
        <>
            <Button> Button Clicked</Button>
        </>
    )
})
