import Image from "next/image";
import React from "react";

import Input from "@/components/Input";

import Layout from "@/layout/Layout";

function index() {
    function handleSubmit() {}
    const infos = [
        {
            label: "User Name",
            id: "therapistName",
            name: "therapistName",
            type: "text",
        },
        {
            label: "Email",
            id: "therapistEmail",
            name: "therapistEmail",
            type: "email",
        },
        {
            label: "City",
            id: "therapistCity",
            name: "therapistCity",
            type: "text",
        },
        {
            label: "License Number",
            id: "therapistLicense",
            name: "therapistLicense",
            type: "text",
        },
        {
            label: "Create Password",
            id: "therapistPassword",
            name: "therapistPassword",
            type: "password",
        },
        {
            label: "Confirm Password",
            id: "therapistPassword2",
            name: "therapistPassword2",
            type: "password",
        },
    ];
    return (
        <Layout>
            <main className='flex flex-row items-center justify-between w-full h-fit py-4'>
                <div className='w-1/2'>
                    <h1 className='text-NeutralBlack text-6xl font-poppins font-bold'>
                        Create{" "}
                        <span className='text-Accent font-aclonica'>
                            Therapist
                        </span>{" "}
                        account
                    </h1>
                    <form onSubmit={handleSubmit}>
                        {infos.map((info) => (
                            <Input
                                label={info.label}
                                id={info.id}
                                name={info.name}
                                type={info.type}
                                key={info.id}
                            />
                        ))}
                    </form>
                </div>
                <div className='w-1/2'>
                    <Image
                        src='https://images.pexels.com/photos/4098148/pexels-photo-4098148.jpeg'
                        alt='Hope Hub'
                        width={300}
                        height={600}
                    />
                </div>
            </main>
        </Layout>
    );
}

export default index;
