import React, { useState, useEffect } from 'react'

import { CheckCircleIcon, EyeIcon, EyeOffIcon, XCircleIcon } from '@heroicons/react/solid'
import Button from '../../components/Button'
import {theme} from "../../theme"
import Alert from '../../components/Alert'
import { AcademicCapIcon } from '@heroicons/react/outline'

const PasswordVisibleButton = ({isVisible, onClick}) => {
    return (
        <button className='w-5 h-5' onClick={onClick}>
            {isVisible ? 
                <EyeIcon className="w-5 h-5 text-gray-700" />
                :
                <EyeOffIcon className="w-5 h-5 text-gray-700" />
            }
        </button>
    )
}


const Register = () => {

    const [email, setEmail] = useState('')
    const [userName, setUsername] = useState('')

    const [password, setPassword] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false)
    
    const [confirmPassword, setConfirmPassword] = useState('')
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)

    const [alert, setAlert] = useState(false)
    const [alertType, setAlertType] = useState('success')

    const [loading, setLoading] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault();
        
        let validEmail = email.length >= 3
        let validUserName = userName.length >= 5
        let validPassword = password.length >= 12 && password === confirmPassword
        let valid = validEmail && validUserName && validPassword

        if(valid) {
            setAlert(true)
            setLoading(true)
            setAlertType('success')
            const data = {
                email: email,
                userName: userName,
                password: password
            }
            localStorage.setItem('userInfo', JSON.stringify(data))
            console.log(data)
        }
        else {
            setAlert(true)
            setAlertType("danger")
            console.log('oh no')
        }
        
        setTimeout(() => {
            if(valid) {
                window.location.pathname = '/'
            }
            setAlert(false)
        }, 1400)
    }

    return (
        <div className='max-w-lg w-full mx-auto bg-white rounded-md p-6'>
            
            <div className='block w-12 h-12 mx-auto mb-4'>
                <div className='w-12 h-12 border-4 inline-flex border-emerald-500 items-center justify-center flex-shrink-0 rounded-full'>
                    <AcademicCapIcon className='text-emerald-500 w-10 h-10' />
                </div>
            </div>

            <p className='font-bold text-xl text-center mb-4'>Register</p>
            <div>

                <div className='grid grid-cols-6 gap-4 mb-2'>
                    <div className="col-span-6 sm:col-span-3">
                        <span className='font-semibold text-gray-600 text-sm'>
                            Email
                            <input type="text" id='first-name' className={theme.textfield} value={email} onChange={(e) => setEmail(e.target.value)}  />
                        </span>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <span className='font-semibold text-gray-600 text-sm'>
                            Username
                            <input type="text" className={theme.textfield} value={userName} onChange={(e) => setUsername(e.target.value)}  />
                        </span>
                    </div>
                </div>

                <div className='my-2'>
                    <span className='font-semibold text-gray-600 text-sm'>
                        Password
                        <div className='flex items-center space-x-1'>
                            <input type={passwordVisible ? 'text' : 'password'} className={theme.textfield} value={password} onChange={(e) => setPassword(e.target.value)} />
                            <PasswordVisibleButton isVisible={passwordVisible} onClick={() => setPasswordVisible(!passwordVisible)} />
                        </div>
                    </span>
                </div>
                
                <div className='my-2'>
                    <span className='font-semibold text-gray-600 text-sm'>
                        Confirm Password
                        <div className='flex items-center space-x-1'>
                            <input type={confirmPasswordVisible ? 'text' : 'password'} className={theme.textfield} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            <PasswordVisibleButton isVisible={confirmPasswordVisible} onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} />
                        </div>
                    </span>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
                    <div>
                        <p className='text-sm font-semibold'>Email</p>

                        <div className='flex space-x-1 my-1'>
                            {email.length >= 3 ? 
                                <CheckCircleIcon className='w-5 h-5 flex-shrink-0 text-green-500' />
                                :
                                <XCircleIcon className='w-5 h-5 flex-shrink-0 text-red-500' />
                            }
                            <p className='text-sm text-gray-600 font-semibold'>Email is valid</p>
                        </div>
                        
                    </div>
                    <div>
                        <p className='text-sm font-semibold'>Username</p>

                        <div className='flex space-x-1 my-1'>
                            {userName.length >= 5 ? 
                                <CheckCircleIcon className='w-5 h-5 flex-shrink-0 text-green-500' />
                                :
                                <XCircleIcon className='w-5 h-5 flex-shrink-0 text-red-500' />
                            }
                            <p className='text-sm text-gray-600 font-semibold'>Username has at least 5 characters</p>
                        </div>
                        
                    </div>
                    <div>
                        <p className='text-sm font-semibold'>Password</p>

                        <div className='flex space-x-1 my-1'>
                            {password.length >= 12 ? 
                                <CheckCircleIcon className='w-5 h-5 flex-shrink-0 text-green-500' />
                                :
                                <XCircleIcon className='w-5 h-5 flex-shrink-0 text-red-500' />
                            }
                            <p className='text-sm text-gray-600 font-semibold'>Password has at least 12 characters</p>
                        </div>
                        <div className='flex space-x-1 my-1'>
                            {confirmPassword === password ? 
                                <CheckCircleIcon className='w-5 h-5 flex-shrink-0 text-green-500 transition duration-200' />
                                :
                                <XCircleIcon className='w-5 h-5 flex-shrink-0 text-red-500' />
                            }
                            <p className='text-sm text-gray-600 font-semibold'>Confirm password equals password</p>
                        </div>
                        
                    </div>
                </div>
                {loading ?
                    <button disabled className='w-full mt-4 flex justify-center items-center text-center disabled text-white font-semibold bg-emerald-700 rounded-md px-4 py-2'>
                        <svg 
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24"
                        >
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Loading...
                    </button>
                    :
                    <Button onClick={onSubmit} variant='primary' style={{width: "100%", marginTop: "16px"}}>
                        Register
                    </Button>
                }
                

            </div>
            {alert &&
                <Alert duration={1200} open={true} variant={alertType}>
                    <p className='font-semibold'>
                        {alertType === 'success' ? 
                            "Account successfully created!"
                            :
                            "Error when trying to create account!"
                        }
                    </p>
                </Alert>
            }
        </div>
    )
}

export default Register
