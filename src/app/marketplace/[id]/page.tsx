import Navbar from "@/app/components/Navbar";

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
        <>
        <Navbar />
        <main className="p-6 bg-[#f5f0e8] min-h-screen">
            <h1 className="text-3xl font-bold">
                Product: {id}
            </h1>
        </main>
        </>
    )
}