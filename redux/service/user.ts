import { ecommerceApi } from "../api";

export const userApi = ecommerceApi.injectEndpoints({
    endpoints: (builder) => ({
        //register user
        register: builder.mutation<any, { data: object}>({
            query: ({ data }) => ({
                url: `api/user/register/`,
                method: "POST",
                body: data,
            }),
        }),

        //verify email
        verifyEmail: builder.mutation<any, { key: string }>({
            query: ({ key }) => ({
                url: `api/user/verify-email/${key}/`,
                method: "POST",
            }),
        }),

        //login user
        login: builder.mutation<any, { data: object }>({
            query: ({ data }) => ({
                url: `api/user/login/`,
                method: "POST",
                body: data,
            }),
        }),
})
})

export const {
	useRegisterMutation,
    useVerifyEmailMutation,
    useLoginMutation
} = userApi;