export type ProductType={
    slug: string;
    name: string;
    price: number;
    desc: string;
    image: string;
    category: string;
    seller: string;
    quantity:number;
    key?: string; 
	date?: string;
	isHighLight?: boolean;
	isCheckOut?: boolean;
}


export type CatageoryType = {
    slug: string
	title: string;
	desc: string;
	image?: string
    key?: string; 
}
    

export const initialValues = {
	categoryName: "",
	categoryIcon: "",
	name: "",
	desc: "",
	image: "",
	price: 0,
	quantity: 0,
	fileProduct: null,
};

export type CartProductType = {
	name: string;
	image: string;
	price: number;
    desc:string
	id: string;
    quantity: number;
	onClick?: () => void;
};

export type FavoriteType = {
	name: string;
	image: string;
	price: number;
    desc:string
	id: string;
	onClick?: () => void;
};