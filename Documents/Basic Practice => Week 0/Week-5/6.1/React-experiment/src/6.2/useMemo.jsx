import { use, useMemo, useState } from 'react';
//React State Update Happens Asynchronously => Not Imemdiately / in it's Own Time => I will Bulikfy it => Happens Eventually =>  c => c + 1
//useEffect => When update Asynchronously Depends on an Effect/Backend Call
// Wanna DO Side Effects => Put Always Inside useEffect() => setTimeout,fetch,setInterval
function App() {

    const [counter, setCounter] = useState(0);
    const [input, setInput] = useState(1);

    //This will Run Again when counter also Changes But Input not Changed  => Re-Rendering 
    let sum = 0;
    // Due to Re-render Expensive Operation For loop Runs Again even if Input not Change
    for (let i = 1; i <= input; i++) {
        sum = sum + i;
    }

    return (
        <div>

            <input placeholder={"Find Sum from 1 to n"} onChange={function (e) {
                setInput(e.target.value); {/* input value given by user => e.target.value & e.target => refernce to <input DOM  */ }
            }} />
            <br />

            Sum from 1 to {input} is {sum}

            <button onClick={function () {
                setCounter(counter + 1)

            }} />
            Count is {counter}

        </div>
    )


}
//useMemo() => Returns Value

// Most Optimized Way => Memoize the Value Across Re-Renders  
// useMemo => Across Render Remebers The Last State Value so that Expensive Operation Don't Run Again 
// Used when useMemo() => Variable like totalsum depends on another State Variable input 
function Optimized() {

    const [counter, setCounter] = useState(0);
    const [input, setInput] = useState(1);

    // totalSum is dependent on input State variable => No Need to Make Seperate State Variable
    // Since Saves 1 State Variable 1 Re-Render
    // Dependent => When input changes totalSum for Sure Changes
    // Wheenver Re-Render due to input change totalSum for Sure Updates BeforeRe-endering
    // totalSum => Calculated on the Fly => Maps Consistently with input
    let totalSum = useMemo(() => { // Storing in totalsum => Not State 

        let sum = 0;

        for (let i = 0; i <= input; i++) {
            sum = sum + i;
        }

        return sum; // Returns Sum and we Store it in totalsum by UseMemo() => Which Remmbers the Value

    }, [input]) // Runs Only when Input changes



    return (
        <div>

            <input placeholder={"Find Sum from 1 to n"} onChange={function (e) {
                setInput(e.target.value); {/* input value given by user => e.target.value & e.target => refernce to <input DOM  */ }
            }} />
            <br />

            Sum from 1 to {input} is {totalSum}

            <button onClick={function () {
                setCounter(counter + 1)

            }} />
            Count is {counter}

        </div>
    )


}

// useMemo => Storing/Memoizing Heavy Calculation whereas useEffect => is for LifeCycle after Component Renders
// It is causing 1 Extra Re-Render of component => bcz 1 Extra State Variable 
function SecondaryOptimized() {

    const [counter, setCounter] = useState(0);
    const [input, setInput] = useState(1);
    const [finalSum, setFinalSum] = useState(0); //State=> Whenever there is new sum want to Print/Render on Screen => Want Component to Change
    // Reflect The FinalSum change on Screen/ hence want Component ot Re-render => Achievd by Changing State Variable
    useEffect(() => {
        let sum = 0;
        for (let i = 1; i <= input; i++) {
            sum = sum + i;
        }
        setFinalSum(sum); // Update finalSum value which want to print on sreen =>Componet Changes
    }, [input]) // Run This Only When Input Changes 
    //useEffect => When update Asynchronously Depends on an Effect/Backend Call
    // Wanna DO Side Effects => Pu Alwayys Inside useEffect() => setTimeout,fetch,setInterval
    return (
        <div>

            <input placeholder={"Find Sum from 1 to n"} onChange={function (e) {
                setInput(e.target.value); {/* input value given by user => e.target.value & e.target => refernce to <input DOM  */ }
            }} />
            <br />

            Sum from 1 to {input} is {finalSum}

            <button onClick={function () {
                setCounter(counter + 1)

            }} />
            Count is {counter}

        </div>
    )


}
