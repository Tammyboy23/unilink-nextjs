import Navbar from "../components/Navbar"
import ProductCard from "../components/ProductCard"

export default function Marketplace(){
    return(
        <>
        <Navbar />
        <main className="p-6 bg-white min-h-screen pt-25 px-25">
            <div className="flex flex-col gap-2 bg-emerald-600 rounded-xl p-6">
            <p className="text-emerald-200 font-[600] font-oswald">STUDENT SERVICES</p>   
            <h1 className="text-white font-outfit font-bold text-4xl">Find Skilled Students <br /> at your next campus</h1> 
            <p className="text-emerald-200">Tutoring, Creative work, and more - from verified Students</p>
            </div>            
        </main>
        <div className="grid grid-cols-3 px-25 gap-8">
            <ProductCard
          id={1}
          img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1sK3WAYn-AUAGqKmh5dYixSmm8N3EGzYXH-2XMRu9pg&s=10"
          ratings={4.6}
          name="Wireless Noise-Cancelling Headphones"
          price={45000}
          category="Electronics"
        />
        <ProductCard
          id={2}
          img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHUvVMbU_3DeJOgniyISvd9RnMmTCLKK976wZZpxJzug&s=10"
          ratings={4.3}
          name="Classic White Sneakers"
          price={28500}
          category="Fashion"
        />
        <ProductCard
          id={3}
          img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9GVdskQZe9LSUn0Vc-Nze2SEiTckn0CXVcGGI89RbxQ&s"
          ratings={4.8}
          name="Water-Resistant Laptop Backpack"
          price={22000}
          category="Bags"
        />
        <ProductCard
          id={4}
          img="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQWPi15en-sTv4Co36k-4mfNKV9p4pK89vmzfyrcpq0Et1oGpf90NlbGWjCWzY088Weq_-8jNUUPEgIP69S4GLyNeHygKKNJ4QcvG8XBJLr8M7Dtkr0h2-3WNgFfZrBmpnuNl01W8c&usqp=CAc"
          ratings={4.1}
          name="Minimalist Analog Wrist Watch"
          price={35000}
          category="Accessories"
        />
        <ProductCard
          id={5}
          img="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRmXWa-m-a-36Y1I_3BJ-NoC_N627vzx2inDU25LVfTYxXuMOGH49bdkTYIbAoU6lNzcoPD3gVu-krHZi8AXG0f2Jc7_M2tLK8yoKfkfXl7nyH-mJEbg7reKaDzLeko4WiabZGlPNPCpQ&usqp=CAc"
          ratings={4.5}
          name="Portable Smoothie Blender"
          price={18500}
          category="Home & Kitchen"
        />
        <ProductCard
          id={6}
          img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKHLQdyVdbvfVxuifNxu-TR-yzDtpddjYMy9ZpvbPNmQ&s=10"
          ratings={4.7}
          name="Bluetooth Party Speaker"
          price={39900}
          category="Electronics"
        />
        <ProductCard
          id={7}
          img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-HBA3KVDsqew4y8VWZpvItO9Hb6rAkoOgkBVAZLhxUQ&s=10"
          ratings={3.9}
          name="Polarized Aviator Sunglasses"
          price={12500}
          category="Accessories"
        />
        <ProductCard
          id={8}
          img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc_OOPWLMUk9FK0oy5AKOnw7uuQKPKYbB5K3t25jBYzQ&s=10"
          ratings={4.9}
          name="Indoor Snake Plant with Ceramic Pot"
          price={9800}
          category="Home & Garden"
        />
        </div>
        </>
    )
}