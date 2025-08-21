export interface HomeService {
    id: number,
    price: number,
    duration: number,
    name: string,
    slug: string,
    is_popular:boolean,
    category: Category,
    thumbnail: string,
    benefits: Benefit[],
    testimonials: Testimonial[],
    about: string,
}

interface Benefit{
    id: number,
    name: string,
}

export interface Category{
    id: number,
    name: string,
    slug: string,
    photo: string,
    photo_white: string,
    home_services_count: number;
    home_services: HomeService[],
    popular_services: HomeService[],   
}

interface Testimonial{
    id: number,
    name: string,
    message: string,
    photo: string,
}

export interface BookingDetails {
    id: number;
    name: string;
    phone: string;
    email: string;
    proof: string | null;
    address: string;
    post_code: string;
    city: string;
    booking_trx_id: string;
    is_paid: boolean;
    sub_total: number;
    total_tax_amount: number;
    total_amount: number;
    started_time: string;
    schedule_at: string;
    transaction_details: TransactionDetails[];
}


interface TransactionDetails{
    id: number,
    price: number,
    home_service_id: number,
    home_service: HomeService,
}

export interface CartItem{
    service_id: number,   
    slug: string,
    quantity:number,
}

export type BookingFormData = {
    name: string;
    email: string;
    phone: string;
    started_time: string;
    schedule_at: string;
    post_code: string;
    address: string;
    city: string;
};
