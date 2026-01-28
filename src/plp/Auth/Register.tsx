import React, { useState } from 'react';


const RegisterPage = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prevState => !prevState);
    };

    return (
        <div className='Register w-[100vw] h-[100vh] flex items-center justify-center'>
            <div className='text-[50px] font-extrabold mix-blend-difference text-white  md:mt-0 mt-[50%]'>VINTORA</div>
            <div className='flex absolute md:right-[5%] md:top-[auto] h-[50vh] top-[5%] flex-col gap-[24px] items-center justify-center w-full max-w-[350px] p-[12px]'>
                <h1 className='!text-[30px] font-bold'>REGISTER</h1>
                <div className='flex flex-col gap-[24px] w-full'>
                    <div className='flex gap-[8px] items-end'>
                        <img className='w-[25px] h-[25px]' src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png" alt="" />
                        <label className="input">
                            <input className="input__field" type="text" id="input-field" placeholder=" " />
                            <span className="input__label">Username</span>
                        </label>
                    </div>
                    <div className='flex gap-[8px] items-end'>
                        <img className='w-[25px] h-[25px]' src="https://icons.veryicon.com/png/o/miscellaneous/remitting-country-linear-icon/password-148.png" alt="" />
                        <label className="input">
                            <input
                                className="input__field"
                                type={isPasswordVisible ? 'text' : 'password'}
                                id="input-field"
                                placeholder=" "
                            />
                            <span className="input__label">Password</span>

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={togglePasswordVisibility}
                            >
                                {isPasswordVisible ? 'Hide' : 'Show'}
                            </button>
                        </label>
                    </div>
                    <div className='flex gap-[8px] items-end'>
                        <img className='w-[25px] h-[25px]' src="https://icons.veryicon.com/png/o/miscellaneous/fine-fillet-icon/email-144.png" alt="" />
                        <label className="input">
                            <input className="input__field" type="text" id="input-field" placeholder=" " />
                            <span className="input__label">Email</span>
                        </label>
                    </div>
                    <div className='flex gap-[8px] items-end'>
                        <img className='w-[25px] h-[25px]' src="https://icons.veryicon.com/png/o/object/monochrome/mobile-phone-117.png" alt="" />
                        <label className="input">
                            <input className="input__field" type="text" id="input-field" placeholder=" " />
                            <span className="input__label">Mobile No.</span>
                        </label>
                    </div>
                </div>
                <div className='w-full flex gap-[8px] items-center justify-center'>
                    <a className='register-now w-[45%]' href="/login"> <span className='register-text z-10'>Register </span></a>
                </div>
                <div className='w-full flex gap-[8px] items-center'>
                    <span>Have an account? </span><a className='register-now' href="/login"> <span className='register-text z-10'>Login Now </span></a>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;