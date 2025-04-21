import React, { useEffect, useState, useRef } from 'react';
import Api from '../../services/Api';
import Loader from '../Loader';
import { Toaster, toast } from "react-hot-toast";
import { Link } from 'react-router-dom';

const getFirstLetter = (str) => str ? str.charAt(0).toUpperCase() : '';

const Header = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [telegram_id, setTelegramId] = useState(localStorage.getItem("telegram_id"));
  const [loading, setLoading] = useState(true);
  const requestSent = useRef(false);
  const [username, setUsername] = useState("Guest"); // ✅ Default name

  useEffect(() => {
    if (token) {
        console.log("✅ User already logged in, skipping login request.");
        setLoading(false);
        return;
    }
    if (!window.Telegram || !window.Telegram.WebApp) {
        console.error("❌ Telegram WebApp SDK is missing.");
        setLoading(false);
        return;
    }

    const tg = window.Telegram.WebApp;
    tg.expand();
    const initDataUnsafe = tg.initDataUnsafe;
    if (initDataUnsafe && initDataUnsafe.user) {
        setUser(initDataUnsafe.user);

        const telegramUser = {
            telegram_id: initDataUnsafe.user.id,
            tusername: initDataUnsafe.user.username || "",
            tname: initDataUnsafe.user.first_name || "",
            tlastname: initDataUnsafe.user.last_name || "",
        };

        const loginUser = async () => {
            if (requestSent.current) return; 
            requestSent.current = true;
            try {
                const response = await Api.post('auth/telegram-login', telegramUser);
                if (response.data.token) {
                    setToken(response.data.token);
                    setTelegramId(response.data.telegram_id);
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("telegram_id", response.data.telegram_id);
                    
                    // ✅ Fetch username after login success
                    fetchUserInfo(response.data.telegram_id);
                } else {
                    console.error("❌ Login Error:", response.data.message);
                }
            } catch (error) {
                console.error("❌ API Error:", error);
            } finally {
                setLoading(false);
            }
        };
        loginUser();
    }
}, [token]);

// ✅ Only fetch user info when telegram_id is available
useEffect(() => {
    if (telegram_id) {
        fetchUserInfo(telegram_id);
    }
}, [telegram_id]);

const fetchUserInfo = async (telegram_id) => {
    try {
        const response = await Api.post('auth/telegram-user-detail', { telegram_id });
        if (response.data.status) {
            setUsername(response.data.user.user_id 
                ? response.data.user.name 
                : `${response.data.user.tname} ${response.data.user.tlastname}`.trim()
            );
        }
    } catch (err) {
        console.error("❌ Error fetching user info:", err);
    } finally {
        setLoading(false);
    }
};

// ✅ Show a loader while fetching data
if (loading) {
    return <Loader />;
}

return (
    <>
    <div className="flex items-center justify-between py-2 mt-5 px-4 md:px-10 lg:px-10 xl:px-20">
        {/* Logo Section */}
        <a className="md:hidden" href="/">
            <img alt="Logo" width="70" className="max-w-[156px]" src='/icon/logo.png' />
        </a>
        <div className="w-full flex flex-row justify-end md:justify-between">
            {/* User Section */}
            <div className="flex items-center h-[38px] text-gray-800 font-medium">
                <a className="hidden md:flex h-[38px] bg-white p-1 rounded-full mr-3">
                    <div className="flex items-center rounded-full pl-3 text-sm">
                        <img alt="User Avatar" width="16" height="16" src="upnl/assets/icons/icon_user_add.svg" className="mr-3" />
                        <span>{username}</span>
                    </div>
                </a>
            </div>

            {/* Button Section */}
            <div className="relative flex items-center space-x-2 font-semibold">
                <span className="lg:inline text-xl">{username}!</span>

                <button>
                    <Link to='/profile'>
                    <div className="flex items-center justify-center w-[40px] h-[38px] rounded-full text-[24px] font-semibold" style={{ backgroundColor: 'rgb(95, 202, 237)' }}>
                        {getFirstLetter(username)}
                    </div>
                    </Link>

                </button>
                <div className="hidden md:inline-block">
                    <div className="relative inline-block text-[16px] font-bold">
                        <button className="flex p-2 items-center bg-white border h-[38px] w-[60px] rounded-[20px] hover:bg-gray-200">
                            EN
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
);
};

export default Header;