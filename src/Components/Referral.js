import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Api from "../services/Api";
const Referral = () => {
  const [isActive, setIsActive] = useState(false);
  const [telegram_id] = useState(localStorage.getItem("telegram_id"));
  const [referralBonus, setreferralBonus] = useState(0); // ✅ Default name
  const [sponsor, setReferral] = useState(0); // ✅ Default name
  const copyToClipboard = () => {
    const textToCopy = document.getElementById("textToCopy").textContent;
    navigator.clipboard.writeText(textToCopy).then(() => {
      toast.success("Referral Copied!");
      setIsActive(false);
    });
  };
  const handleClick = () => {
    setIsActive(!isActive); // Toggle class
  };

  useEffect(() => {
    getreferral();
  }, []);

  const getreferral = async () => {
    try {
      const response = await Api.get("auth/getReferral");
      if (response.data.success) {
        setReferral(response.data.sponsor);
        setreferralBonus(response.data.referralBonus);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };


  return (
    <div
      className="flex-1 overflow-y-auto px-4 md:px-10 lg:px-10 xl:px-20 pt-5 pb-[88px] md:pb-[20px]"
    >
      <div className="w-full mt-10 flex justify-center text-primary">
        <div className="w-full max-w-[1440px] rounded-lg">
          <div className="max-w-[1920px] w-full grid grid-cols-1 md:grid-cols-3 gap-6">
            <button className="text-sm flex flex-col items-center  justify h-[72px] px-4 py-1 rounded-[22px] bg-[#F1F1F1]">
              <img
                alt="Filter Icon"
                loading="lazy"
                width="40"
                height="40"
                src="upnl/assets/icons/users.svg"

              />
              <p className="pl-3 font-semibold text-[16px] text-center mt-2">Your Friends({sponsor ? sponsor : "0"})</p>
            </button>
            <div className="p-5 h-full rounded-[16px] flex flex-col justify-center items-center" style={{ background: 'rgb(240, 240, 240)' }}>
              <div className="text-center mb-[14px]">
                <p className="text-sm text-gray-500">Referral Rewards</p>
                <p className="text-xl font-semibold" style={{ color: 'rgb(9, 185, 244)' }}>  {referralBonus ? referralBonus.toFixed(1) : "0.0"} USDT</p>
              </div>


            </div>
            <p style={{ fontSize: "13px" }}>Invite your friends to HyperMesh and earn Team Commissions. Start building your team today!
            </p>

            <img src="/icon/referral_program.png" />
            <button
              className="bg-black text-white font-bold py-2 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-800"
              style={{
                backgroundImage: 'linear-gradient(315deg,rgb(0, 0, 0) 0%,rgb(0, 0, 0) 100%)',
                border: 'none',
                padding: '10px 20px',
                fontSize: '14px',
                cursor: 'pointer',
              }} onClick={handleClick}
            >
              Invite Friends
            </button>
          </div>
        </div>
      </div>
      <div className={`modal-backdrop ${isActive ? "modal-active" : ""}`}>
        <div class="modal-content">
          <h1 class="modal-header">Friendship bonus</h1>
          <div class="modal-body" id="textToCopy">
            https://t.me/hypermesh_bot?start=T_{telegram_id}
          </div>
          <div class="modal-footer">
            <button onClick={copyToClipboard}>
              Copy Referral Link
            </button>
          </div>
        </div>
      </div>


    </div>

  );
};

export default Referral;
