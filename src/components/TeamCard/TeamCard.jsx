import Image from "next/image";
import React from "react";

const TeamCard = ({ image, name, position }) => {
    return (
        <div className='card w-48  shadow-xl mb-4 m-4 bg-Accent hover:bg-Primary hover:shadow-md'>
            <figure>
                <Image
                    src={image}
                    alt={name}
                    width='96'
                    height='42'
                    layout='responsive'
                />
            </figure>
            <div className='card-body text-NeutralBlack'>
                <h2 className='card-title text-l'>{name}</h2>
                <p>{position}</p>
            </div>
        </div>
    );
};

export default TeamCard;
