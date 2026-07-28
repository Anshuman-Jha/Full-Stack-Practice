import { ReactNode } from "react";
// Type of {children} is ReactNode=>Applies on all type of the Component 
export default function Layout({ children }: {
    children: ReactNode
}) {

    return (
        <div>
            <div> Header </div>
            {children}
            <div> Footer</div>
        </div>
    )

}