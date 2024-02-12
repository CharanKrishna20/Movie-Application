export interface User {
    userId:string;
    userName:string;
    userEmailId:string;
    password:string;
    isVerified:boolean;
    isSubscribed:boolean;
    registeredDate:Date;
    wishList?:[];
}