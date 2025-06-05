import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { shopContext } from './../context/ShopContext'

const LoginModal = () => {
    const { setLoginModalVisible } = useContext(shopContext);
    const navigate = useNavigate();
    const handleModal = (type) => {
        if (type === "cancel") {
            setLoginModalVisible(false);
        }
        else {
            setLoginModalVisible(false);
            setTimeout(() => {
                navigate('/signin');
            }, 3000)
        }
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-[90%] max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                    Please log in to continue
                </h2>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={() => handleModal('cancel')}
                        className="px-4 py-2 rounded-full border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => handleModal('login')}
                        className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LoginModal
