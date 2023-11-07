// import { Elements } from "@stripe/react-stripe-js";
// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import Image from "next/image";
// import React from "react";

// const PUBLIC_KEY =
//     "pk_test_51Il0cBJhzZrG3DiVHH8iypMZeFY0uw7F44ofXv5qM0sbTp12ENJoSIhhuiRpc6dbWpnN0yoY2UG3003tbzXqmT";

// const stripeTestPromise = loadStripe(PUBLIC_KEY);

// const PaymentForm = () => {
//     return (
//         <div className='w-full max-w-md mx-auto p-4 bg-white rounded shadow-lg'>
//             <div className='text-center'>
//                 <p className='text-2xl font-bold text-black'>Pay with</p>
//                 <div className='flex items-center justify-center space-x-2'>
//                     <Image
//                         src='/src/images/Visa.jpg'
//                         className='h-10'
//                         width={30}
//                         height={15}
//                         alt='Visa'
//                     />
//                     <span>/</span>
//                     <Image
//                         src='/src/images/masterCard.jpg'
//                         className='h-5'
//                         width={30}
//                         height={15}
//                         alt='MasterCard'
//                     />
//                 </div>
//             </div>

//             <Elements stripe={stripeTestPromise}>
//                 <Payment itemId={1} />
//             </Elements>
//         </div>
//     );
// };

// export default PaymentForm;

// const CARD_OPTIONS = {
//     iconStyle: "solid",
//     style: {
//         base: {
//             iconColor: "#434243",
//             color: "#5c5c5c",
//             fontWeight: 500,
//             fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
//             fontSize: "16px",
//             fontSmoothing: "antialiased",
//             ":-webkit-autofill": { color: "blue" },
//             "::placeholder": { color: "#434243" },
//         },
//         invalid: {
//             iconColor: "#fce883",
//             color: "#fce883",
//         },
//     },
// };

// function Payment({ itemId }) {
//     const stripe = useStripe();
//     const elements = useElements();

//     const handleSubmit = async (e) => {
//         console.log("payment");
//     };

//     return (
//         <form onSubmit={handleSubmit} className='mt-4'>
//             <div className='mb-4'>
//                 <CardElement
//                     options={CARD_OPTIONS}
//                     className='p-2 border rounded'
//                 />
//             </div>

//             <button
//                 className='w-full py-2 px-4 bg-blue-500 text-white rounded'
//                 onClick={handleSubmit}
//             >
//                 Pay
//             </button>
//         </form>
//     );
// }
