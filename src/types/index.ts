export interface Users {
    id : string,
    email: string,
    username : string,
    password_hash : string,
    phone_number : string,
    profile_picture : string,
    created_at : string,
    updated_at : string,
}

export interface Creators {
    id : string,
    bio : string,
    social_links : string,
    slug : string,
    kyc_status : string,
    created_at : string,
    image_url : string,
    color : string
}

export interface Projects {
    color: string
    created_at: string
    creator_id: string
    description: string
    id: string
    image_url: string
    slug: string
    status: string
    title: string
    updated_at: string
}

export interface Catalogues {
    created_at: string
    creator_id: string
    currency: string
    description: string
    id: string
    image_url: string
    price: number
    slug: string
    stock: number
    title: string
}


export interface Events {
    created_at: string
    creator_id: string
    description: string
    end_date: string
    id: string
    image_url: string
    location: string
    project_id: string
    slug: string
    start_date: string
    title: string
}

export interface WalletTransactions {
    id : string,
    creator_id: string | null,
    donor_name : string | null,
    donor_email : string | null,
    donor_message : string | null,
    amount : number,
    currency : string,
    glasses : number | null,
    moneroo_payment_id : string | null,
    payment_method : string | null,
    payment_method_id : string | null,
    payment_provider : string,
    paid_at : string | null,
    status : string | null,
    created_at : string | null,
    updated_at : string | null,
}

export interface Wallet {
    id : string,
    creator_id : string | null,
    balance : number | null,
    updated_at : string | null,
    created_at : string,
}