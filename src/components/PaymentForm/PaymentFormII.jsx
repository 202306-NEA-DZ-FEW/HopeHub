import React, { useState } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

const PaymentFormII = () => {
    const [isMasterCard, setIsMasterCard] = useState(false);
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [nameOnCard, setNameOnCard] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [selectedCountry, setSelectedCountry] = useState(null);

    const handleCountryChange = (selectedOption) => {
        setSelectedCountry(selectedOption);
    };

    const handleCardChange = () => {
        setIsMasterCard(!isMasterCard);
    };

    const handleExpiryDateChange = (e) => {
        const input = e.target.value;

        // Allow only digits and "/" character
        if (/^\d{0,2}(\/\d{0,2})?$/.test(input)) {
            setExpiryDate(input);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (expiryDate.length !== 5) {
            console.log("Invalid expiry date format");
            return;
        }
        if (!selectedCountry) {
            console.log("Please select a country");
            return;
        }
        // Handle the form submission here
    };

    return (
        <div className='grid grid-cols-2 gap-2'>
            {/* Left Column */}
            <div>
                <form className='justify-center' onSubmit={handleSubmit}>
                    <div className='w-1/2'>
                        <label htmlFor='cardType'>Supported Card types</label>
                        <button
                            onClick={handleCardChange}
                            className={`block w-full p-2 border-[1px] border-[#2DD3E3] rounded ${
                                isMasterCard
                                    ? "bg-blue-100 text-[#2DD3E3]"
                                    : "text-[#2DD3E3]"
                            }`}
                        >
                            {isMasterCard ? "MasterCard" : "Visa"}
                        </button>
                    </div>
                    <div className='w-1/2'>
                        <label htmlFor='cardNumber'>Card Number:</label>
                        <input
                            type='number'
                            id='cardNumber'
                            value={cardNumber}
                            onChange={(e) => {
                                if (e.target.value.length <= 14) {
                                    setCardNumber(e.target.value);
                                }
                            }}
                            className='block w-full p-2 bg-white rounded border-[1px] border-Accent focus-border-red-500'
                            maxLength='14'
                            pattern='[0-9]{14}'
                            title='Card number must be 14 digits'
                            placeholder='**************'
                        />
                    </div>
                    <div className='flex flex-wrap'>
                        <div className='w-1/4 pr-2'>
                            <label htmlFor='expiryDate'>
                                Expiry Date (MM/YY):
                            </label>
                            <input
                                type='text'
                                id='expiryDate'
                                value={expiryDate}
                                onChange={handleExpiryDateChange}
                                className='block w-full p-2 bg-white rounded border-[1px] border-Accent focus-border-red-500'
                                placeholder='MM/YY'
                            />
                        </div>
                        <div className='w-1/4 pl-2'>
                            <label htmlFor='cvv'>CVV Code:</label>
                            <input
                                type='number'
                                id='cvv'
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                className='block w-full p-2 bg-white rounded border-[1px] border-Accent focus-border-red-500'
                                maxLength='3'
                                pattern='[0-9]{3}'
                                title='CVV number must be 3 digits'
                                placeholder='***'
                            />
                        </div>
                    </div>
                    <div className='w-1/2'>
                        <label htmlFor='nameOnCard'>Name on Card:</label>
                        <input
                            type='text'
                            id='nameOnCard'
                            value={nameOnCard}
                            onChange={(e) => setNameOnCard(e.target.value)}
                            className='block w-full p-2 bg-white rounded border-[1px] border-Accent focus-border-red-500'
                            placeholder='Name On Card'
                        />
                    </div>
                    <div>
                        <button
                            type='submit'
                            className='w-1/3 p-2 bg-Accent text-NeutralBlack font-bold rounded mt-8'
                        >
                            Add Card
                        </button>
                    </div>
                </form>
            </div>
            {/* Right Column */}
            <div>
                <div className='w-1/2'>
                    <label htmlFor='country'>Country:</label>
                    <Select
                        id='country'
                        value={selectedCountry}
                        onChange={handleCountryChange}
                        options={countryList().getData()}
                        // className="block w-full p-2 bg-white rounded border-[1px] border-Accent focus-border-red-500"
                        placeholder='Your Country Name'
                    />
                </div>
                <div className='w-1/2'>
                    <label htmlFor='zipCode'>Zip Code:</label>
                    <input
                        type='text'
                        id='zipCode'
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        className='block w-full p-2 bg-white rounded border-[1px] border-Accent focus-border-red-500'
                        placeholder='*********'
                    />
                </div>

                <div className='w-1/2'>
                    <label htmlFor='city'>City:</label>
                    <input
                        type='text'
                        id='city'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className='block w-full p-2 bg-white rounded border-[1px] border-Accent focus-border-red-500'
                        placeholder='Your City Name'
                    />
                </div>
                <div className='w-1/2'>
                    <label htmlFor='address'>Address:</label>
                    <input
                        type='text'
                        id='address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className='block w-full p-2 bg-white rounded border-[1px] border-Accent focus-border-red-500'
                        placeholder='Your Address'
                    />
                </div>
            </div>
        </div>
    );
};

export default PaymentFormII;
