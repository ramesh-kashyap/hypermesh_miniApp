import { useEffect, useState, useRef } from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './Components/Common/Sidebar';
import Footer from './Components/Common/Footer';
import Header from './Components/Common/Header';
import Home from './Components/Home';
import Earn from './Components/Earn';
import Referral from './Components/Referral';
import Profile from './Components/Profile';
import Api from "./services/Api";
import ProtectedRoute from "./Components/ProtectedRoute";
import { Toaster, toast } from "react-hot-toast";
import Loader from "./Components/Loader"; // ✅ Import Loader for better UX

function App() {
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [telegram_id, setTelegramId] = useState(localStorage.getItem("telegram_id"));
    const [username, setUsername] = useState("Guest"); // ✅ Default username
    const [loading, setLoading] = useState(true);
    const requestSent = useRef(false);



    // ✅ Fetch user login data when the app loads
    useEffect(() => {
        if (!window.Telegram || !window.Telegram.WebApp) {
            console.log("❌ Telegram WebApp SDK is missing.");
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
            const telegramUser2 = {
                telegram_id: "1197473382",
                tusername: "rameshkashyapdev",
                tname: "Ramesh",
                tlastname: "",
            };

            const loginUser = async () => {
              
                if (requestSent.current) return; // ✅ Prevent duplicate API calls
                   requestSent.current = true;
                
                try {
                    const response = await Api.post('auth/telegram-login',telegramUser);
                    if (response.data.token) {
                        setToken(response.data.token);
                        setTelegramId(response.data.telegram_id);
                        localStorage.setItem("token", response.data.token);
                        localStorage.setItem("telegram_id", response.data.telegram_id);

                        // ✅ Fetch username after login
                        fetchUserInfo(response.data.telegram_id);
                    } else {
                        console.error("❌ Login Error:", response.data.message);
                    }
                } catch (error) {
                    console.error("❌ API Error:", error.message, error.stack);
                    alert(error.message);
                } finally {
                    setLoading(false);
                }
            };


            loginUser();
        }
    }, []);


    
    // ✅ Fetch user info only when telegram_id is available
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
        <div id="__next">
            <Toaster position="top-center" /> {/* ✅ Ensures toast visibility */}
            <div className="w-full h-screen flex justify-center">
                <div className="w-full max-w-[1920px] flex bg-white">
                    <Sidebar />
                    <div className="flex-1 flex flex-col text-black bg-[#F1F1F1] h-screen">
                        <Header username={username} /> {/* ✅ Pass username to Header */}
                        <Routes>
                            <Route path="/" element={ <ProtectedRoute><Home /></ProtectedRoute> } />
                            <Route path="/earn" element={ <ProtectedRoute><Earn /></ProtectedRoute>} />
                            <Route path="/referral" element={<ProtectedRoute> <Referral /></ProtectedRoute>} />
                            <Route path="/profile" element={<ProtectedRoute> <Profile /></ProtectedRoute>} />
                        </Routes>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default App;