import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'
import { flatMap } from 'lodash';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [language, setLanguage] = useState('en');
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmRegisterPassword, setConfirmRegisterPassword] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState('');

  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const translations = {
    en: {
      welcomeBack: 'Welcome Back',
      login: 'Login',
      createAccount: 'Create your account',
      createPassword: 'Create Password',
      confirmPassword: 'Confirm Password',
      register: 'Register',
      backToLogin: 'Back to Login',
      fullName: 'Full Name',
      email: 'Email',
      otp: 'OTP',
      forgotPassword: 'Forgot Password?',
      registerPrompt: 'Create your account',
      loginPrompt: 'Login to continue',
      sendOtp: 'Send OTP',
      verifyOtp: 'Verify OTP',
      otpSent: 'OTP sent successfully',
      otpInvalid: 'Invalid OTP',
      otpExpired: 'OTP expired',
    },
    es: {
      welcomeBack: 'Bienvenido de nuevo',
      login: 'Iniciar sesión',
      createAccount: 'Crear cuenta',
      createPassword: 'Crear contraseña',
      confirmPassword: 'Confirmar contraseña',
      register: 'Registrarse',
      backToLogin: 'Volver al inicio de sesión',
      fullName: 'Nombre completo',
      email: 'Correo electrónico',
      otp: 'Código OTP',
      forgotPassword: '¿Olvidaste tu contraseña?',
      registerPrompt: 'Crea tu cuenta',
      loginPrompt: 'Inicia sesión para continuar',
      sendOtp: 'Enviar OTP',
      verifyOtp: 'Verificar OTP',
      otpSent: 'OTP enviado con éxito',
      otpInvalid: 'OTP inválido',
      otpExpired: 'OTP expirado',
    },
  };

  const t = translations[language];
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLogin = async () => {
    setEmailError('');
    setPasswordError('');
    if (!email) setEmailError('Email is required');
    else if (!validateEmail(email)) setEmailError('Invalid email address');
    if (!password) setPasswordError('Password is required');

    const toastId = toast.loading('Please wait');
    try {
      const res = await axios.post(`${backendUrl}/api/user/login`, {
        email,
        password
      });
      if (res.data.success) {
        toast.update(toastId, {
          render: 'Success! 🎉',
          type: 'success',
          isLoading: false,
          autoClose: 3000,
        });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userId', res.data.user.id);
        navigate('/');
      } else {
        // Handles 2xx responses where success is false
        toast.update(toastId, {
          render: res.data.message,
          type: 'error',
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (error) {
      // Axios will throw for status codes outside of 2xx
      const serverMsg =
        error.response?.data?.message ||
        error.response?.statusText ||
        error.message;
      console.log('Login error:', serverMsg);

      toast.update(toastId, {
        render: serverMsg,
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
    }
  };


  const handleRegister = async () => {
    setPasswordMismatch(false);
    if (registerPassword !== confirmRegisterPassword) {
      setPasswordMismatch(true);
      return;
    }
    const toastID = toast.loading("Registering user");
    try {
      const res = await axios.post(`${backendUrl}/api/user/register`, {
        name,
        email,
        password: registerPassword
      });
      if (res.data.success) {
        toast.update(toastID, {
          render: 'Success! 🎉',
          type: 'success',
          isLoading: false,
          autoClose: 3000,
        });
      }
      else {
        toast.update(toastID, {
          render: 'Something went wrong 😢',
          type: 'error',
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.update(toastID, {
        render: 'Something went wrong 😢',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
      console.log("Error", error.message);
    }
  };

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus next input
    if (text && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && !otp[index]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSendOtp = async () => {
    if (!email || !validateEmail(email)) {
      setEmailError(t.email + ' is required and must be valid');
      return;
    }

    setOtpLoading(true);
    try {
      const res = await axios.post(`${backendUrl}/api/user/send-otp`, {
        email
      });
      if (res.data.success) {
        setOtpSent(true);
        setOtpError('');
        setOtp(res.data.otp);
        setOtpLoading(false);
        alert(t.otpSent);
      }
      else {
        console.log("OTP ", res.data);
      }
    } catch (error) {
      alert("Error : ", error.message)
    }

  };

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 6) {
      setOtpError(t.otpInvalid);
      return;
    }

    // Simulate OTP verification
    setOtpLoading(true);
    try {
      const res = await axios.post(`${backendUrl}/api/user/verify-otp`, {
        otp
      });
      if (res.data.success) {
        setOtpVerified(true);
        setOtpError('');
        alert("otp verified");
      }
      else {
        setOtpVerified(false);
        setOtpError(t.otpInvalid);
      }
      setOtpLoading(false);
    } catch (error) {
      console.log("Error ", error.message);
    }

  };

  const renderOtpInputs = () => {
    return (
      <div className="flex justify-between mb-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            className="w-10 h-10 border border-gray-300 rounded text-center text-xl"
            type="number"
            maxLength={1}
            keyboardType="numeric"
            value={digit}
            onChange={(e) => handleOtpChange(e.target.value, index)}
            onKeyDown={(e) => handleOtpKeyPress(e, index)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="relative flex flex-col lg:flex-row w-full max-w-5xl h-auto lg:h-[500px] rounded-3xl overflow-hidden shadow-lg bg-white">

        {/* Background Animation */}
        <div
          className={`absolute top-0 left-0 w-full lg:w-1/2 h-full bg-blue-100 transition-transform duration-700 ease-in-out z-0 ${isRegistering ? 'lg:translate-x-full' : ''
            }`}
        ></div>

        {/* Left Panel - Login */}
        <div className={`w-full lg:w-1/2 z-10 p-8 flex flex-col justify-center transition-all duration-700 ease-in-out transform ${!isRegistering ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
          <div>
            {!isRegistering ? (
              <>
                <h2 className="text-2xl font-bold mb-6">{t.welcomeBack}</h2>
                <input
                  className="w-full bg-gray-100 p-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError('');
                  }}
                  placeholder={t.email}
                />
                {emailError && <p className="text-red-500 text-sm mb-4">{emailError}</p>}

                <input
                  className="w-full bg-gray-100 p-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError('');
                  }}
                  placeholder={t.login}
                />
                {passwordError && <p className="text-red-500 text-sm mb-4">{passwordError}</p>}

                <button
                  onClick={handleLogin}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md transition duration-300"
                >
                  {t.login}
                </button>

                <button
                  onClick={() => setIsRegistering(true)}
                  className="mt-4 text-blue-500 underline"
                >
                  {t.createAccount}
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-3xl font-semibold text-gray-500">{t.welcomeBack}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Register */}
        <div className={`w-full lg:w-1/2 z-10 p-8 flex flex-col justify-center transition-all duration-700 ease-in-out transform ${isRegistering ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
          <div>
            {isRegistering ? (
              <>
                <h2 className="text-2xl font-bold mb-4">{t.registerPrompt}</h2>

                <input
                  className="w-full bg-gray-100 p-3 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.fullName}
                  disabled={!otpVerified}
                />

                <input
                  className="w-full bg-gray-100 p-3 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.email}
                />

                <div className="flex items-center justify-between">
                  <button
                    onClick={handleSendOtp}
                    disabled={otpLoading}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
                  >
                    {otpLoading ? 'Sending...' : t.sendOtp}
                  </button>
                </div>

                <div className="mb-4">
                  {renderOtpInputs()}
                  <div className="flex justify-between">
                    <button
                      onClick={handleVerifyOtp}
                      disabled={otpLoading}
                      className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md transition"
                    >
                      {otpLoading ? 'Verifying...' : t.verifyOtp}
                    </button>
                  </div>
                  {otpError && <p className="text-red-500 text-sm mt-2">{otpError}</p>}
                </div>

                <input
                  className="w-full bg-gray-100 p-3 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  placeholder={t.createPassword}
                  disabled={!otpVerified}
                />

                <input
                  className="w-full bg-gray-100 p-3 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="password"
                  value={confirmRegisterPassword}
                  onChange={(e) => setConfirmRegisterPassword(e.target.value)}
                  placeholder={t.confirmPassword}
                  disabled={!otpVerified}
                />

                {passwordMismatch && (
                  <p className="text-red-500 text-sm mb-4">Passwords do not match.</p>
                )}

                <button
                  onClick={handleRegister}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md transition duration-300"
                  disabled={!otpVerified}
                >
                  {t.register}
                </button>

                <button
                  onClick={() => setIsRegistering(false)}
                  className="mt-4 text-blue-500 underline"
                >
                  {t.backToLogin}
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-3xl font-semibold text-gray-500">{t.createAccount}</p>
              </div>
            )}
          </div>
        </div>


      </div>
    </div>
  );
}