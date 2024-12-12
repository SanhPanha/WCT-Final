"use client";

import { useRegisterMutation } from "@/redux/service/user";
import style from "./style.module.css";
import { useSession } from "next-auth/react";

type ValueTypes = {
	email: string;
	password1: string;
	password2: string;
	first_name: string;
	last_name: string;
};


export default function Register() {
    const {data:section} = useSession()
    const user = section?.user
    const name = user?.name
    const image = user?.image
    const email = user?.email

    console.log(user)
    console.log(name)
    console.log(image)


    const initialValues: ValueTypes = {
        email:email|| "",
        password1: "Admin@1234",
        password2:'Admin@1234',
        first_name:name|| "",
        last_name: "username",
    };
 
    const [userRegister,{data,isLoading,isError}] = useRegisterMutation();

    const handleResiter = async (values: ValueTypes) => {
        userRegister:({
            userRegister:values
        })
    }
    if(section)
        {
            handleResiter(initialValues)
        }

	return (
		<main className={`${style.container}`}>
			
		</main>
	);
}
