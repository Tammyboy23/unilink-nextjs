import Navbar from "./components/Navbar"

export default function Home(){
  return(
    <>
    <Navbar />
    <main className="flex flex-col gap-6 justify-center items-center p-6">
      <h1 className="text-4xl font-extrabold text-[#fff] mt-4">Unilink</h1>
      <p>Your University Marketplace.</p>
    </main>
    </>
  )
}