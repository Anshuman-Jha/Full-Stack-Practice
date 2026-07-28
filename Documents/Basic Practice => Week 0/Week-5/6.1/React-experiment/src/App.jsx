import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



function App() {

  // const [title, setTitle] = useState("my Name is Anshuman");

  // function updateTitle() {
  //  setTitle("My Name is " + Math.random());
  // }

  console.log("Is App Component Rendering");
  return (
    <>
      <HeaderwithButton />
      { /* <button onClick={updateTitle}> Change Title </button> {/* 
   If Parent Re-Renderes all child Re-Renders doesn't Matter it Uses
  State Variable or not Irresepctive of i.e title = {title} or title ="Anshu"      
              */}
      {/*   <Header title={title} />
      <Header title="Harkirat" />  
          */}

    </>
  )
}

// Least Common Ancestor => LCA => Push Satee Down => Min ReRendering
// Always Allocate to Lowest Common Ancestor of All Child Node => To Avoid Re-Rendering 
//To Minimize Re-rendering => Pushing State Down => Less Child Component ReRenders
function HeaderwithButton() {

  const [title, setTitle] = useState("my Name is Anshuman");

  function updateTitle() {
    setTitle("My Name is " + Math.random());
  }
  console.log("Second Child is Now Re-rendering Avoiidng APP to re-render");
  return (
    <>
      <button onClick={updateTitle}> Change Title </button>
      <Header title={title} />
      <Header title="Harkirat" />
    </>
  )

}

// Props is Basically Passed as State Object => Whatver attributes is
// props.title or {title} extract from props object => When State titlechangesHeader also Re-Renders 

// MEMO LET'S YOU SKIP Re-Rendering Component When it's Props are Unchnged 
// Re-Render Child Component Only When Prop Changes not when it is Constant 
const Header = React.memo(function Header({ title }) {
  console.log("Child is Re-Renred as Parent Renders / State Changes");
  return (
    <div>
      {title}
    </div>
  )
})
// A Parent Component Re-Renders Triggers All Child Component get re-Rendered 
// Re-Renders => React do some work to calculate what all Should Update => DOM-Manipulate
export default App
