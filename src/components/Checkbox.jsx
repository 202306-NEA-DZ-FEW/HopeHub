import { useState } from "react";
const Checkbox = ({ label, selected, btnChecked }) => {
    const [isChecked, setIsChecked] = useState(selected);
    return (
        <div className='checkbox-wrapper mb-[0.125rem] block min-h-[1.5rem] pl-11 py-2'>
            <label className='md:px-6 md:mx-10 group'>
                <input
                    className='appearance-none relative h-[1.30rem] w-[1.30rem] rounded-md border-[0.125rem] border-solid border-slate-500  checked:after:absolute checked:after:-mt-px checked:after:ml-[0.35rem] checked:after:block checked:after:h-[1rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:bg-transparent hover:cursor-pointer focus:before:opacity-[0] dark:checked:border-Dark_Primary dark:checked:bg-Dark_Primary'
                    type='checkbox'
                    checked={selected}
                    onChange={() => btnChecked(label, selected)}
                />
                <span className='px-2 text-NeutralBlack dark:text-NeutralWhite text-xl font-normal font-poppins capitalize'>
                    {label}
                </span>
            </label>
        </div>
    );
};
export default Checkbox;
