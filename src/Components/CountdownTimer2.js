import React, { useState, useEffect, useRef } from "react";
import Api from "../services/Api";
import { Toaster, toast } from "react-hot-toast";

const CountdownTimer = ({ depositAmount = 100 }) => {
  const [telegram_id] = useState(localStorage.getItem("telegram_id"));
  const [timeLeft, setTimeLeft] = useState(0);
  const [points, setPoints] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showClaim, setShowClaim] = useState(false);
  const [rewardPerDay, setrewardPerDay] = useState(localStorage.getItem("rewardPerDay") || depositAmount * 0.01);

  const rewardPerInterval = rewardPerDay / (24 * 60 * 60 / 5); // Every 5 sec

  // console.log("per"+rewardPerInterval);
  
  const intervalRef = useRef(null);

  useEffect(() => {
    fetchLastTrade();
  }, []);

  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev > 0) return prev - 1;
          clearInterval(timer);
          clearInterval(intervalRef.current);
          setIsRunning(false);
          setShowClaim(true);
          return 0;
        });
      }, 1000);

      intervalRef.current = setInterval(async () => {
        setPoints((prevPoints) => {
          const newPoints = Math.min(prevPoints + rewardPerInterval, rewardPerDay);
          if (newPoints >= rewardPerDay) {
            clearInterval(intervalRef.current);
          }
          updateTodayROI(newPoints);
          return newPoints;
        });
      }, 5000);
      return () => {
        clearInterval(timer);
        clearInterval(intervalRef.current);
      };
    }
  }, [isRunning]);

  const fetchLastTrade = async () => {
    try {
      const response = await Api.post("auth/get-last-trade", { telegram_id });
      if (response.data.success) {
        const { todayroi, timeLeft, lastUpdated } = response.data;
        setPoints(todayroi);
        setTimeLeft(timeLeft);
        setIsRunning(timeLeft > 0);
        setShowClaim(timeLeft === 0 && todayroi > 0);
      }
    } catch (error) {
      console.error("❌ Error fetching lastTrade:", error);
    }
  };

  const updateTodayROI = async (newPoints) => {
    try {
      await Api.post("auth/update-today-roi", { telegram_id, todayroi: newPoints , lastUpdated: Date.now()  });
    } catch (error) {
      console.error("❌ Error updating todayroi:", error);
    }
  };

  const startTrade = async () => {
    try {
      const response = await Api.post("auth/start-trade", { telegram_id });
      if (response.data.success) {
        localStorage.setItem("rewardPerDay", response.data.rewardPerDay);
        setTimeLeft(24 * 60 * 60);
        setPoints(0);
        setIsRunning(true);
        setShowClaim(false);
        setrewardPerDay(response.data.rewardPerDay);
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : "Start earning failed. Please try again.";
    toast.error(errorMessage); // Proper error message show karega
    }
  };

  const claimReward = async () => {
    try {
      const response = await Api.post("auth/claim-reward", { telegram_id, roi: points });

      if (response.data.success) {
        localStorage.removeItem("rewardPerDay");
        setPoints(0);
        setShowClaim(false);

        toast.success('claimed successfully!')

      }
    } catch (error) {
      console.error("❌ Error claiming reward:", error);
    }
  };

  const formatTime = (seconds) => {
    seconds = Math.max(0, Math.floor(seconds));
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hrs}h ${mins}m`;
  };

  return (
    <div className="w-full p-5 overflow-auto flex justify-center">
        <div className="relative z-50 overflow-hidden flex flex-col justify-between items-center w-[200px] h-[200px] text-neutral-800 bg-neutral-200 border-[3px] border-primary-600 rounded-full p-8" style={{
        background: !isRunning 
          ? "linear-gradient(rgb(94 202 237) 15.89%, rgba(0, 255, 163, 0) 80.52%, rgba(255, 255, 255, 0) 103.51%)"
          : "rgb(229, 231, 235)" // Default neutral background when running
      }}>
    {!isRunning && !showClaim ? (
          <>
           <img onClick={startTrade}
              alt="Power Icon"
              loading="lazy"
              width={36} 
              height={36}
              className="z-50 w-9 h-9"
              src="/icon/power-2.ccd5a21f9ffffb3b220dddc19e3536bd.svg"
              style={{ color: "transparent" ,width:'3.25rem',height:'3.25rem'}}
            />
            <div className="z-50 text-center text-neutral-1000 max-w-[120px]" onClick={startTrade}>
              <p className="text-xl font-semibold">  
                Start Earning 
              </p>
            </div>

          </>
        ) : (
          <>
            <img
              alt="Energy Icon"
              loading="lazy"
              width={36} 
              height={36}
              className="z-50 w-9 h-9"
              src="/icon/icons8-energy-100.png"
              style={{ color: "transparent" ,width:'3.25rem',height:'3.25rem'}}
            />
            <div className="z-50 text-center text-neutral-1000 max-w-[120px]">
              <p className="text-xl font-semibold">  
                <img src="/icon/icons8-tether-48.png" width="18" height="18" style={{ marginRight: '4px', float:'left', marginTop:'6px' }} /> 
                {points.toFixed(4)}
              </p>
              <p className="text-xs font-medium mt-2">{formatTime(timeLeft)}</p>
            </div>

            {showClaim && (
              <div class="z-50 h-[38px] max-w-[120px]"
              ><button  onClick={claimReward}  style={styles.claimButton}  class="w-full __className_4fd903 btn btn-primary btn-medium">Claim</button>
              </div>

            )}
            <div className="liquid" style={{ top: `${-206 + (1 - points / rewardPerDay) * 206}px` }}></div>

          </>
        )}


    </div>
  </div>
  );
};
const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" },
  button: {
    width: "53px",
    height: "25px",
    borderRadius: "11px",
    border: "none",
    background: "black",
    color: "white",
    fontSize: "14px",
    cursor: "pointer",
    textAlign: "center",
  },
  claimButton: {
    width: "53px",
    height: "25px",
    borderRadius: "11px",
    border: "none",
    background: "gold",
    color: "black",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
    textAlign: "center",
  },
};

export default CountdownTimer;