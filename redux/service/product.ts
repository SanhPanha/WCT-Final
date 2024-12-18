import { ecommerceApi } from "../api";

export const productApi = ecommerceApi.injectEndpoints({
    endpoints: (builder) => ({
        
		// get all products             
		getProducts: builder.query<any, { page: number; pageSize: number }>({
			query: ({ page = 1, pageSize = 10 }) =>({
				url: `api/products/my_products/?page=${page}&page_size=${pageSize}`,
			    method: "GET",
				
			})
			
		}),
		// get single product
		getProductById: builder.query<any,{id:number}>({
			query: ({id}) => 
				({
			    url:`api/products/${id}/`,
			 	method:'GET'
		})
		}),
		
        // update product
		updateProduct: builder.mutation<
			any,
			{ id: number; updatedProduct: object; }
		>({
			query: ({ id, updatedProduct }) => ({
				url: `/api/products/${id}/`,
				method: "PATCH",
				body: updatedProduct,
			}),
		}),

		// delete product
		deleteProduct: builder.mutation<any, number>({
			query: (id:number) => ({
				url: `/api/products/${id}/`,
				method: "DELETE",
			}),
		}),

		//create product
		createProduct: builder.mutation<any, object>({
			query: (newProduct:object) => ({
				url: `/api/products/`,
				method: "POST",
				body: newProduct,
			}),
		}),
         
		//get All product 
		getAllProducts: builder.query<any, { page: number; pageSize: number }>({
			query: ({ page = 1, pageSize = 10 }) =>({
				url: `api/products/?page=${page}&page_size=${pageSize}`,
			    method: "GET",
				
			})
			
		}),
	

	
	})
})

export const {
	useGetProductsQuery,
	useGetProductByIdQuery,
	useUpdateProductMutation,
	useDeleteProductMutation,
	useCreateProductMutation,
	useGetAllProductsQuery
	
} = productApi;