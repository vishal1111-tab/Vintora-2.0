import React, { useState } from 'react';


const LoginPage = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prevState => !prevState);
    };

    return (
        <div className='login w-[100vw] h-[100vh] flex items-center justify-center'>
            <div className='text-[50px] font-extrabold mix-blend-difference text-white'>VINTORA</div>
            <div className='flex absolute md:right-[5%] md:top-[auto] h-[50vh] top-[5%] flex-col gap-[24px] items-center justify-center w-full max-w-[350px] p-[12px]'>
                <h1 className='!text-[30px] font-bold'>SIGN IN</h1>
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
                </div>
                <div className='w-full flex gap-[8px] items-center justify-center'>
                    <a className='register-now w-[45%]' href="/productlist"> <span className='register-text z-10'>Login </span></a>
                </div>
                <div className='w-full flex gap-[8px] items-center'>
                    <span>Not Registered? </span><a className='register-now' href="/register"> <span className='register-text z-10'>Register Now </span></a>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;