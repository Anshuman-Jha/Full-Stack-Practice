
export default async function Blog({ params }: {
    params: Promise<{
        id: string
    }>
}) {

    // [..id] => Then (await params).id => [id] witten insde [..]
    // It is an array [2, 1, 2] => we do stringify => not possible to 
    const postId = (await params).id; //All of them././ is Catched by

    // Catched all Routes id of Request which is in Request in [] => according to that Respond / Make 
    return <div>
        Blog Page {JSON.stringify(postId)}
    </div>

}

// Means Whatever Comes x/y or ab/c/b//nf/gf => Renderedon The Screen 