import React, { useState } from 'react';

function TextComponent() {
    return (
        <div>
            Hi There !!!
        </div>
    )
}


// This Function Wrapper is Taking Component as Input and Rendering Them
// When Rendering Some Child Component props ={Component} as input just Like State Variable
function Wrapper() {

    // Passing Component as Input i.e Props for CardWrapper in Wrapper  
    //CardWrapper is Outer Level Component which is Accepting other Componnet as Input
    return (
        <div>
            <CardWrapper innerComponent={<TextComponent />} >

            </CardWrapper>
        </div>

    )
}


//OuterMost Level Component => Accepting Other Component as Input
// Component i.e TextComponent is Passed as Input in Parameter of CardWrapper
// Receving Props/by Destructing innerComponent in Parameter as Input
function CardWrapper({ innerComponent }) {

    return (
        <div style={{ border: "2px solid black", padding: 20 }}>
            {innerComponent}
        </div>
    )
}


export default Wrapper;