// To Catch all Option /docs as well as / docs/anything/xyz/a

// We Specxify data type of Destructing object 
//  params is of Promise type whose Inside generics is a object of having blog: string pair
export default async function Hybrid({ params }: {
    params: Promise<{
        blog: string
    }>
}) {

    const reqId = (await params).blog;

    return (
        <div>
            {JSON.stringify(reqId)}
        </div>
    )

} 