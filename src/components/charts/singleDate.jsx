import React from "react";

function SingleDate({ data }) {
    console.log("datadta ", data);
    // useEffect(()=>{

    // },[data])

    // const data=[{ name: '70u2t0DaFjOvWtvU9fBgcTDpVde2', time: '14h30' },
    // { name: '70u2t0DaFjOvWtvU9fBgcTDpVde2', time: '15h30' },
    // { name: '70u2t0DaFjOvWtvU9fBgcTDpVde2', time: '16h30' },{ name: '70u2t0DaFjOvWtvU9fBgcTDpVde2', time: '18h30' },
    // { name: '70u2t0DaFjOvWtvU9fBgcTDpVde2', time: '17h30' },{ name: '70u2t0DaFjOvWtvU9fBgcTDpVde2', time: '13h30' },]

    return (
        <div className='border border-NeutralBlack w-full col-start-2 col-end-3 row-start-2 h-full overflow-auto'>
            <table className='w-full border corder-black p-6 border-spacing-3'>
                <thead>
                    <tr className='bg-Accent p-0.5 '>
                        <th className='border h-5 w-3/5 border-gray-200 bg-transparent rounded'>
                            User
                        </th>
                        <th className='border h-5 w-2/5 border-gray-200 bg-transparent rounded'>
                            Time
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data.map((day, id) => {
                            return (
                                <tr key={id} className='p-0.5 my-8'>
                                    <td className='overflow-hidden py-3 px-1 border border-gray-200'>
                                        {day.name}
                                    </td>
                                    <td className='overflow-hidden py-3 px-1 border border-gray-200'>
                                        {day.time}
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}

export default SingleDate;
