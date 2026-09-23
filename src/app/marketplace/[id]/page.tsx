type ProductPageProps = {
    params: Promise<{
        id: string
    }>;
};

export default async function ProductPage({
    params,
}: ProductPageProps){
    const {id} = await params;

    return(
        <main className="p-6">
            <h1 className="text-3xl font-bold">
                Product: {id}
            </h1>
        </main>
    )
}