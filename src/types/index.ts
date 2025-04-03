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