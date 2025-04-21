import React, { useEffect, useState, useRef } from "react";
import logo from '../c0vj7n5t-removebg-preview.png';
import { Toaster, toast } from "react-hot-toast";
import Api from "../services/Api";
import Loader from "./Loader";
import { encryptID } from "./cryptoUtils";

const getFirstLetter = (str) => str ? str.charAt(0).toUpperCase() : '';


const Profile = () => {
  const [telegram_id, setTelegramId] = useState(localStorage.getItem("telegram_id"));
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("Guest"); // ✅ Default name
  const [connect, setConnect] = useState(false); // ✅ Default name
  const [connectUrl, setconnectUrl] = useState(""); // ✅ Default name

  // ✅ Only fetch user info when telegram_id is available
  useEffect(() => {
    if (telegram_id) {
      fetchUserInfo(telegram_id);
      const encrypted = encryptID(telegram_id);
      const connectUrl3 = 'https://app.hypermesh.io/connect?provider=telegram&code='+encrypted;
      setconnectUrl(connectUrl3);        
    }
  }, [telegram_id]);


  

  const fetchUserInfo = async (telegram_id) => {
    try {
      const response = await Api.post('auth/telegram-user-detail', { telegram_id });
      if (response.data.status) {
        setConnect(response.data.user.user_id ? true : false);
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


    <div
      className="flex-1 overflow-y-auto px-4 md:px-10 lg:px-10 xl:px-20 pt-5 pb-[88px] md:pb-[20px]"
    >
      <div className="w-full mt-10 flex justify-center text-primary">
        <div className="w-full max-w-[1440px] rounded-lg">

          <div class="mt-10 mb-10 flex flex-col gap-5 items-center"><div style={{background:'rgb(255 87 51)'}} class="w-[100px] h-[100px] bg-[#ff5733] rounded-[50%] flex items-center justify-center border border-neutral-300"><p class="font-semibold text-[40px] leading-[48px] font-[ClashDisplay-Semibold] text-neutral-1000 uppercase" style={{fontFamily:'sans-serif'}}> {getFirstLetter(username)}</p></div></div>

          <div className="max-w-[1920px] w-full grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="p-5 h-full rounded-[16px] flex flex-col justify-center items-center" style={{ background: 'rgb(240, 240, 240)' }}>


              <div className="flex flex-col items-center justify-center gap-2 ">
                {/* Content Text */}
                <div className="flex justify-center mb-4">
                 
                </div>
                <div className="font-semibold text-center">
                  Connect app.hypermesh.io
                </div>
                <div className="text-gray-500 text-center">
                  Connect your Telegram to your HyperMesh account for easy node management and reward tracking.
                </div>

                {/* Button */}


                {connect ? (
                  <div className="bg-white flex items-center justify-center gap-2 px-5 py-2 rounded-full">
                    <img alt="Check Circle" loading="lazy" width="22" height="22" src="/icon/check_circle_icon.svg" />
                    <p className="text-sm font-medium text-neutral-1000">Connected</p>
                  </div>
                ) : (
                  <>
                  
                    <button  onClick={() => window.open(connectUrl, "_blank")} className="bg-[#171717] rounded-lg mt-4 cursor-pointer text-white py-3 px-4 h-[30px] rounded-2xl flex justify-center items-center">
                      <span className="text-[14px] ">Connect</span>
                    </button>
                  </>
                )}



              </div>
            </div>

          </div>

        </div>

      </div>
    </div>


  );
};




export default Profile;
