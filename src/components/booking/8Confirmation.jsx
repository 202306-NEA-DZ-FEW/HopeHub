import Link from "next/link";

export default function Confirmation() {
    return (
        <div className='bg-NeutralWhite min-w-screen min-h-screen'>
            <div className='w-full h-full px-8 lg:px-20 bg-NeutralWhite '>
                <div className='mb-3 pt-12 font-ogg font-bold text-NeutralBlack capitalize text-2xl lg:text-4xl leading-normal'>
                    your request has been submitted!
                </div>
                <div className='font-poppins font-regular text-justify text-NeutralBlack text-base lg:text-lg leading-relaxed'>
                    You will receive an email guiding you to book a date and
                    time soon.
                </div>
                <div className='flex flex-col bg-NeutralWhite lg:w-1/2 lg:h-1/2 sm:w-full sm:h-[80%] sm:leading-tight mx-auto mt-14 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.42)] rounded-lg relative'>
                    <div className='flex flex-col justify-center items-center'>
                        <h3 className='py-5 px-4 lg:py-5 lg:px-11 leading-normal text-NeutralBlack lg:text-2xl text-2xl font-regular font-poppins capitalize '>
                            request submitted
                        </h3>

                        <div className=''>
                            <h3 className='py-5 px-4 lg:py-5 lg:px-11 leading-normal text-NeutralBlack lg:text-2xl text-2xl font-regular font-poppins capitalize '>
                                you will receive a confirmation email soon.
                            </h3>
                        </div>
                    </div>

                    <div className=' self-center py-10  group '>
                        <Link
                            href='/'
                            className='w-36 h-10 rounded-md text-lg bg-Accent text-NeutralBlack group-hover:bg-[#879AB8] group-hover:text-NeutralWhite group-hover:scale-105 duration-500'
                        >
                            Back to home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
