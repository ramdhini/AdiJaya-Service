import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CartItem, type HomeService } from "../types/type";
import apiClient from "../services/apiServices";
import { Swiper, SwiperSlide } from "swiper/react";

export default function DetailsPage () {

    const { slug } = useParams<{ slug : string }>();

    const [service, setService] = useState<HomeService | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null >(null);

    //STATE BUAT CART

    const [cart, setCart] = useState<CartItem[]>([]);
    const [isAdding, setIsAdding] = useState(false);

    //buat animasi scrolling
    const [isScrolled, setIsScrolled] = useState(false);


    //HOOKS BUAT ADD CART

    useEffect(()=> {
        const savedCart = localStorage.getItem("cart");
        if(savedCart) {
            setCart(JSON.parse(savedCart));
        } 

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
         
        window.addEventListener("scroll", handleScroll);

        return() => {
            window.removeEventListener("scroll", handleScroll)
        };

    }, [])


    useEffect(() => {
        apiClient
        .get(`/service/${slug}`)
        .then((response) => {
            setService(response.data.data);
            setLoading(false);
        })
        .catch((error) => {
            setError(error);
            setLoading(false);
        });
    }, [slug]);

    const formatCurrency = (value : number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency : "IDR",
            maximumFractionDigits: 0,
        }).format(value);
    }
    
    const handleAddToCart = () => {
    if (service) {
    setIsAdding(true);
    const itemExists = cart.find((item) => item.service_id === service.id);
    if (itemExists) {
      alert("Jasa sudah tersedia di Cart");
      setIsAdding(false);
    } else {
      const newCartItem: CartItem = {
        service_id: service.id,
        slug: service.slug,
        quantity: 1,
      };

      const updatedCart = [...cart, newCartItem];
      setCart(updatedCart);

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      alert("Jasa berhasil ditambahkan ke Cart");
      setIsAdding(false);
      }
  }
};

    

    if(loading){
        return <p className="flex items-center justify-center min-h-screen bg-white"> loading...</p>;
    }

    if(error){
        return <p className="flex items-center justify-center min-h-screen bg-white">service not found</p>;
    }

    const BASE_URL = import.meta.env.VITE_REACT_API_STORAGE_URL; 



        return(
        <main className="relative mx-auto w-full max-w-[640px] overflow-x-hidden bg-white pb-[144px]">
  <div id="Background" className="absolute left-0 right-0 top-0 h-[228px]">
    <img
      src="/assets/images/backgrounds/orange-service-details.png"
      alt="image"
    />
  </div>
  <section
    id="NavTop"
    className={`fixed left-0 right-0 z-30 transition-all duration-300
        ${isScrolled ? 'top-[30px]' : 'top-[16px]'}
        `}
  >
    <div className="relative mx-auto max-w-[640px] px-5">
      <div
        id="ContainerNav"
        className={`flex items-center justify-between py-[14px] transition-all duration-300
            ${isScrolled ? 'bg-white rounded-[22px] px-[16px] shadow-[0px_12px_20px_0px_#0305041C]' : ''}
            `}
      >
        <Link to={`/`}>
          <div
            id="Back"
            className={`flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-white
                ${isScrolled ? 'border border-shujia-graylight' : ''}
                `}
          >
            <img
              src="/assets/images/icons/back.svg"
              alt="icon"
              className="h-[22px] w-[22px] shrink-0"
            />
          </div>
        </Link>
        <h2
          id="Title"
          className={`font-semibold transition-all duration-300
            ${isScrolled ? '' : 'text-white'}
            `}
        >
          Detail
        </h2>
        <Link to={`/cart`}>
          <div
            id="Cart"  
            className={`flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-white
                ${isScrolled ? 'border border-shujia-graylight' : ''}
                `}
          >
            <img
              src="/assets/images/icons/cart.svg"
              alt="icon"
              className="h-[22px] w-[22px] shrink-0"
            />
          </div>
        </Link>
      </div>
    </div>
  </section>
  <header className="mt-[100px] px-5">
    <div className="relative flex w-full items-center justify-center overflow-hidden rounded-[40px]">
      <img
        src={`${BASE_URL}/${service.thumbnail}`}
        alt="image"
        className="h-full w-full object-cover"
      />
      <div className="absolute right-5 top-5 flex shrink-0 items-center gap-[2px] rounded-full bg-white px-[8px] py-[7px]">
        <img
          src="/assets/images/icons/star-service-details.svg"
          alt="icon"
          className="h-[22px] w-[22px] shrink-0"
        />
        <p className="font-semibold">4.8</p>
      </div>

      {service.is_popular ? 

      <div className="absolute bottom-5 left-[20.5px] flex shrink-0 items-center gap-[2px] rounded-full bg-white px-[8px] py-[7px]">
        <img
          src="/assets/images/icons/star-service-details.svg"
          alt="icon"
          className="h-[22px] w-[22px] shrink-0"
        />
        <p className="font-semibold">Popular</p>
      </div>
      : ' '}

    </div>
    <h1 className="mt-5 text-2xl font-bold leading-[36px]">
      {service.name}
    </h1>
  </header>
  <section
    id="ServiceDetails"
    className="mt-5 grid grid-cols-2 gap-[14px] px-5"
  >
    <div className="flex items-center gap-[10px] rounded-[20px] bg-[#F4F5F7] px-[14px] py-[14px]">
      <img
        src="/assets/images/icons/clock-service-details.svg"
        alt="icon"
        className="h-[32px] w-[32px] shrink-0"
      />
      <div>
        <strong className="text-sm font-semibold leading-[21px]">
          {service.duration}
        </strong>
        <p className="text-sm leading-[21px] text-shujia-gray">Durasi</p>
      </div>
    </div>
    <div className="flex items-center gap-[10px] rounded-[20px] bg-[#F4F5F7] px-[14px] py-[14px]">
      <img
        src="/assets/images/icons/note-service-details.svg"
        alt="icon"
        className="h-[32px] w-[32px] shrink-0"
      />
      <div>
        <strong className="text-sm font-semibold leading-[21px]">
          Layanan terbaik
        </strong>
        <p className="text-sm leading-[21px] text-shujia-gray">Jaminan</p>
      </div>
    </div>
    <div className="flex items-center gap-[10px] rounded-[20px] bg-[#F4F5F7] px-[14px] py-[14px]">
      <img
        src="/assets/images/icons/calender-service-details.svg"
        alt="icon"
        className="h-[32px] w-[32px] shrink-0"
      />
      <div>
        <strong className="text-sm font-semibold leading-[21px]">
          {service.category.name}
        </strong>
        <p className="text-sm leading-[21px] text-shujia-gray">Kategori</p>
      </div>
    </div>
    <div className="flex items-center gap-[10px] rounded-[20px] bg-[#F4F5F7] px-[14px] py-[14px]">
      <img
        src="/assets/images/icons/clock-service-details.svg"
        alt="icon"
        className="h-[32px] w-[32px] shrink-0"
      />
      <div>
        <strong className="text-sm font-semibold leading-[21px]">
          Tools Gratis
        </strong>
        <p className="text-sm leading-[21px] text-shujia-gray">SNI Level</p>
      </div>
    </div>
  </section>
  <section id="ServiceDescription" className="mt-5 px-5">
    <h3 className="font-semibold">Detail</h3>
    <p className="leading-7">
      {service.about}
    </p>
  </section>

  
  <section id="ServiceBenefits" className="mt-5 px-5">
    <div className="flex w-full flex-col gap-3 rounded-[24px] border border-shujia-graylight p-[14px]">
      <h3 className="font-semibold">Manfaat Layanan</h3>
      
      {service.benefits.length > 0 ? 
        service.benefits.map((benefit, index) => (
        <div key={benefit.id} className="flex flex-col gap-3" >
        <div className="flex items-center gap-3">
            <img
            src="/assets/images/icons/verify-service-details.svg"
            alt="icon"
            className="h-[32px] w-[32px] shrink-0"
            />
            
            <p className="leading-[26px]">
                {benefit.name}
            </p>
        </div>
        {index < service.benefits.length - 1 && (
             <hr className="border-shujia-graylight" />
        )}
       
        </div>
        ))

       : "belum ada data" }
      
    </div>
  </section>
  <section id="GreatCustomers" className="relative mt-5 space-y-[14px]">
    <h3 className="pl-5 font-semibold">Pelanggan Setia</h3>
    <div id="GreatCustomersSlider" className="swiper w-full overflow-x-hidden">
      

         <Swiper
    className="swiper-wrapper"
    direction="horizontal"
    spaceBetween={20}
    slidesPerView="auto"
    slidesOffsetAfter={20}
    slidesOffsetBefore={20}
    >

        {service.testimonials.length > 0 ? (
            service.testimonials.map((testimonial) => (
        <SwiperSlide key={testimonial.id} className="swiper-slide !w-fit">
          <a href="#" className="card">
            <div className="flex w-[300px] flex-col gap-4 rounded-3xl border border-shujia-graylight p-5">
              <div className="stars flex items-center">
                <img
                  src="/assets/images/icons/star-service-details.svg"
                  alt="icon"
                  className="h-[22px] w-[22px] shrink-0"
                />
                <img
                  src="/assets/images/icons/star-service-details.svg"
                  alt="icon"
                  className="h-[22px] w-[22px] shrink-0"
                />
                <img
                  src="/assets/images/icons/star-service-details.svg"
                  alt="icon"
                  className="h-[22px] w-[22px] shrink-0"
                />
                <img
                  src="/assets/images/icons/star-service-details.svg"
                  alt="icon"
                  className="h-[22px] w-[22px] shrink-0"
                />
                <img
                  src="/assets/images/icons/star-service-details.svg"
                  alt="icon"
                  className="h-[22px] w-[22px] shrink-0"
                />
              </div>
              <p className="leading-7">
                {testimonial.message}
              </p>
              <div className="profil flex items-center gap-3">
                <div className="flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-full">
                  <img
                    src={`${BASE_URL}/${testimonial.photo}`}
                    alt="image"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-[2px]">
                  <h5 className="font-semibold">{testimonial.name}</h5>
                  <p className="text-sm leading-[21px] text-shujia-gray">
                    Pelanggan
                  </p>
                </div>
              </div>
            </div>
          </a>
        </SwiperSlide>

         ))
        )  : 'belum ada data terbaru'}

        
    
      </Swiper>
    </div>
  </section>


  <nav className="fixed bottom-5 left-0 right-0 z-30 mx-auto w-full">
    <div className="mx-auto max-w-[640px] px-5">
      <div className="flex items-center gap-[45px] rounded-[24px] bg-shujia-black px-[20px] py-[14px]">
        <div>
          <strong className="whitespace-nowrap text-[22px] font-extrabold leading-[33px] text-white">
            {formatCurrency(service.price)}
          </strong>
          <p className="text-sm leading-[21px] text-white">Garansi Dana</p>
        </div>


        <button onClick={handleAddToCart} disabled={isAdding} className="w-full">
          <p className="w-full rounded-full bg-shujia-orange px-[18px] py-[14px] text-center font-semibold text-white transition-all duration-300 hover:shadow-[0px_4px_10px_0px_#D04B1E80]">
            {isAdding ? "Adding..." : "Pesan" }
          </p>
        </button>


      </div>
    </div>
  </nav>
</main>

    );
}