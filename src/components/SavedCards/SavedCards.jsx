import React from "react";

const SavedCards = ({ color, title }) => {
    return (
        <div className='bg-NeutralWhite flex justify-center items-center'>
            <div className='space-y-16'>
                <div
                    className={`w-96 h-56 m-auto ${color} rounded-xl relative text-white`}
                >
                    {/* <Image
                        className='relative object-cover w-full h-full rounded-xl'
                        src='https://i.imgur.com/kGkSg1v.png'
                        alt='idk'
                        width={50}
                        height={50}
                    /> */}
                    <div className='w-full px-8 absolute top-8'>
                        <div className='flex justify-between'>
                            <div>
                                <p className='font-light'>Name</p>
                                <p className='font-medium tracking-widest'>
                                    {title}
                                </p>
                            </div>
                            {/* <Image
                                className='w-14 h-14'
                                src='https://i.imgur.com/bbPHJVe.png'
                                alt='idk'
                                width={50}
                                height={50}
                            /> */}
                        </div>
                        <div className='pt-1'>
                            <p className='font-light'>Card Number</p>
                            <p className='font-medium tracking-more-wider'>
                                4642 3489 9867 7632
                            </p>
                        </div>
                        <div className='pt-6 pr-6'>
                            <div className='flex justify-between'>
                                <div>
                                    <p className='font-light text-xs'>Valid</p>
                                    <p className='font-medium tracking-wider text-sm'>
                                        11/15
                                    </p>
                                </div>
                                <div>
                                    <p className='font-light text-xs'>Expiry</p>
                                    <p className='font-medium tracking-wider text-sm'>
                                        03/25
                                    </p>
                                </div>
                                <div>
                                    <p className='font-light text-xs'>CVV</p>
                                    <p className='font-bold tracking-more-wider text-sm'>
                                        ···
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SavedCards;
