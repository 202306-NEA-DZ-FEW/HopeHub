export default function Confirmation() {
    return (
        <div className='bg-NeutralWhite'>
            <div className='w-full h-[650px] px-20 bg-zinc-100 '>
                <div className='pt-12 font-poppins font-extrabold text-NeutralBlack uppercase text-4xl leading-loose'>
                    your request has been submitted!
                </div>
                <div className='font-poppins font-extrabold text-justify text-NeutralBlack text-lg leading-relaxed'>
                    You will receive an email guiding you to book a date and
                    time soon.
                </div>
                <div className='flex flex-col text-center bg-NeutralWhite w-[803px] h-[300px] mx-auto mt-14 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.42)] rounded-lg relative'>
                    <h3 className='pt-12  text-NeutralBlack text-2xl font-bold font-poppins capitalize'>
                        request submitted
                    </h3>

                    <div className=' '>
                        <h3 className='rounded-md py-12 text-NeutralBlack text-xl font-extrabold font-poppins capitalize'>
                            you will receive a confirmation email soon.
                            <br Please keep an eye on your mail />
                        </h3>
                    </div>

                    <div className='group'>
                        <button className='w-36 h-10 rounded-md text-lg bg-Accent text-NeutralBlack group-hover:bg-[#879AB8] group-hover:text-NeutralWhite group-hover:scale-105 duration-500'>
                            Back to home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
