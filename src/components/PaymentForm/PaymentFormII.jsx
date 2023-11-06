import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

const PaymentFormII = () => {
    const { t } = useTranslation("common");

    const [isMasterCard, setIsMasterCard] = useState(false);
    const [cardType, setCardType] = useState("Visa");
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
        const card = isMasterCard ? "masterCard" : "Visa";
        setCardType(card);
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
        <div className='w-full'>
            {/* Left Column */}

            <form
                className='w-full flex flex-col gap-5 md:flex-row justify-start items-center lg:gap-32'
                onSubmit={handleSubmit}
            >
                <div className='w-full flex flex-col justify-start'>
                    <label htmlFor='cardType' className='text-lg'>
                        {t("Supported Card types")}
                    </label>
                    <div className='flex flex-row items-center justify-start '>
                        <button
                            onClick={handleCardChange}
                            className={`block w-1/2 p-2 border border-Accent rounded rounded-tr-none rounded-br-none ${
                                isMasterCard
                                    ? "bg-blue-100 text-Accent"
                                    : "text-blue-400"
                            }`}
                        >
                            {t("Visa")}
                        </button>

                        <button
                            onClick={handleCardChange}
                            className={`block w-1/2 p-2 border border-Accent rounded rounded-tl-none rounded-bl-none ${
                                isMasterCard
                                    ? "text-Accent "
                                    : "bg-blue-100 text-Accent"
                            }`}
                        >
                            {t("MasterCard")}
                        </button>
                    </div>
                    <div className='mt-4'>
                        <label htmlFor='cardNumber' className='text-lg'>
                            {t("Card Number")}
                        </label>
                        <input
                            type='number'
                            id='cardNumber'
                            value={cardNumber}
                            onChange={(e) => {
                                if (e.target.value.length <= 14) {
                                    setCardNumber(e.target.value);
                                }
                            }}
                            className='block w-full p-2  bg-white rounded border border-Accent focus:border-red-500 outline-none'
                            maxLength='14'
                            pattern='[0-9]{14}'
                            title='Card number must be 14 digits'
                            placeholder='**************'
                        />
                    </div>
                    <div className='flex flex-wrap mt-4'>
                        <div className='w-1/2 pr-2'>
                            <label
                                htmlFor='expiryDate mb-2'
                                className='text-lg'
                            >
                                {t("Expiry Date")}
                            </label>
                            <input
                                type='text'
                                id='expiryDate'
                                value={expiryDate}
                                onChange={handleExpiryDateChange}
                                className='block w-full p-2 bg-white rounded border border-Accent focus:border-red-500 outline-none'
                                placeholder={t("MM/YY")}
                            />
                        </div>
                        <div className='w-1/2 pl-2'>
                            <label htmlFor='cvv' className='text-lg'>
                                {t("CVV Code")}
                            </label>
                            <input
                                type='number'
                                id='cvv'
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                className='block w-full p-2 bg-white rounded border border-Accent focus:border-red-500 outline-none'
                                maxLength={3}
                                pattern='[0-9]{3}'
                                title='CVV number must be 3 digits'
                                placeholder='***'
                            />
                        </div>
                    </div>
                    <div className='mt-4'>
                        <label htmlFor='nameOnCard' className='text-lg'>
                            {t("Name on Card")}
                        </label>
                        <input
                            type='text'
                            id='nameOnCard'
                            value={nameOnCard}
                            onChange={(e) => setNameOnCard(e.target.value)}
                            className='block w-full p-2 bg-white rounded border border-Accent focus:border-red-500 outline-none'
                            placeholder={t("Name On Card")}
                        />
                    </div>
                </div>

                {/* Right Column */}
                <div className='w-full flex flex-col justify-start'>
                    <div className=''>
                        <label htmlFor='country' className='text-lg'>
                            {t("Country")}
                        </label>
                        <Select
                            id='country'
                            value={selectedCountry}
                            onChange={handleCountryChange}
                            options={countryList().getData()}
                            // className="block w-full p-2 bg-white rounded border-[1px] border-Accent focus-border-red-500"
                            placeholder={t("Your Country Name")}
                        />
                    </div>
                    <div className='mt-4'>
                        <label htmlFor='zipCode' className='text-lg'>
                            {t("Zip Code")}
                        </label>
                        <input
                            type='text'
                            id='zipCode'
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            className='block w-full p-2 bg-white rounded border border-Accent focus:border-red-500 outline-none'
                            placeholder='*********'
                        />
                    </div>

                    <div className='mt-4'>
                        <label htmlFor='city' className='text-lg'>
                            {t("City")}
                        </label>
                        <input
                            type='text'
                            id='city'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className='block w-full p-2 bg-white rounded border border-Accent focus:border-red-500 outline-none'
                            placeholder={t("Your City Name")}
                        />
                    </div>
                    <div className='mt-4'>
                        <label htmlFor='address' className='text-lg'>
                            {t("Address")}
                        </label>
                        <input
                            type='text'
                            id='address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className='block w-full p-2 bg-white rounded border border-Accent focus:border-red-500 outline-none'
                            placeholder={t("Your Address")}
                        />
                    </div>
                </div>
            </form>
            <div>
                <button
                    type='submit'
                    className='w-32 p-2 bg-Accent text-NeutralBlack font-bold rounded mt-8'
                >
                    {t("Add Card")}
                </button>
            </div>
        </div>
    );
};

export default PaymentFormII;
