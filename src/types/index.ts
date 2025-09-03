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
    user_id: string,
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
    creator_id: string,
    donor_name : string,
    donor_email : string,
    amount : number,
    payment_method_id : string,
    status : string,
    wallet_id : string,
    created_at : string,
}

export interface Wallet {
    id : string,
    user_id: string,
    balance : number,
    updated_at : string,
    created_at : string,
}