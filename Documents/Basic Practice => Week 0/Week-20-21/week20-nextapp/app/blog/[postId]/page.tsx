// /blog/[postId] => Dynamic Routing => whatevr=> blog/ 
import axios from "axios";


//  params is Object whose key params is  of Promise type whose Inside generics is a object of having postId: string key-pair
export default async function BlogPage({ params }: {
    params: Promise<{
        postId: string
    }>
}) {
    // Get From Request Parameter => params.[Inside it]=> IN Route
    // Whatever Written Inside []/ => or It is object of key params value only

    // params is a Promise => we await the promise then only can process
    // we can Process via attaching event handler / via await => promise
    const dynamicId = (await params).postId;

    const response = await axios.get(`https://jsonplaceholder/blog/${dynamicId}`);

    const data = response.data;

    return (
        <div>
            Blog Page {dynamicId}  !!!
            <br />

            data -  {data.title}
            body - {data.body}
        </div>
    )

}
//Ex => blog/page, blog/ 4, blog/some => not blog/9/7
// blog/Anything => It will Render whatver Returned => Rendered 
//Dynamic Routing will occur for /blog.harkirat
// but not /blog/harkirat/123/7 => not possible 
