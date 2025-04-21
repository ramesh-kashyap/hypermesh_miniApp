import React, { useState, useEffect } from "react";
import Api from "../services/Api";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const Earn = () => {
  const [tasks, setTasks] = useState([]);
  const [userBalance, setUsebalance] = useState(0);
  const [taskBonus, setTaskBonus] = useState(0);
  const [miningBonus, setMiningBonus] = useState(0);
  const [referralBonus, setreferralBonus] = useState(0);
  const [loadingTasks, setLoadingTasks] = useState({});
  const [claimableTasks, setClaimableTasks] = useState({});
  const telegram_id = localStorage.getItem("telegram_id");

  useEffect(() => {
    getTaskRecord();
    getUserBalance();
  }, []);

  const getTaskRecord = async () => {
    try {
      const response = await Api.post("auth/getTasks", { telegram_id });
      setTasks(response.data.buttonTask);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const getUserBalance = async () => {
    try {
      const response = await Api.get("auth/get-user-balance");
      if (response.data.success) {
        setUsebalance(response.data.userbalance);
        setTaskBonus(response.data.taskBonus);
        setMiningBonus(response.data.miningBonus);
        setreferralBonus(response.data.referralBonus);    
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleStart = async (taskId, taskUrl) => {
    window.open(taskUrl);
    setLoadingTasks((prev) => ({ ...prev, [taskId]: true }));
    const response = await Api.post("auth/startTask", { telegram_id, task_id: taskId });
    if (!response.data.success) 
      {
        setLoadingTasks((prev) => ({ ...prev, [taskId]: false }));
         toast.error(response.data.message);
      }
      else
      {
        setTimeout(() => {
          setLoadingTasks((prev) => ({ ...prev, [taskId]: false }));
          setClaimableTasks((prev) => ({ ...prev, [taskId]: true }));
        }, 5000);
      }
  
  };

  const handleClaim = async (taskId) => {
    try {
      setLoadingTasks((prev) => ({ ...prev, [taskId]: true }));
      await Api.post("auth/claimTask", { telegram_id, task_id: taskId });
      setTimeout(() => {
        setLoadingTasks((prev) => ({ ...prev, [taskId]: false }));
        toast.success('claimed successfully!');

        getUserBalance();
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, status: "completed" } : task
          )
        );
      }, 5000);
    } catch (error) {
      console.error("Error claiming task:", error);
    }
  };

  const pendingTasks = tasks.filter((task) => task.status !== "completed");
  const finishedTasks = tasks.filter((task) => task.status === "completed");

  return (
    <div className="flex-1 flex flex-col text-black bg-[#F1F1F1] h-screen pt-[10px]">
      {/* Rewards Header */}
      <div className="text-xl font-bold text-black mb-4 flex-1 w-full overflow-y-auto px-4 md:px-10 lg:px-10 xl:px-20 pt-5 pb-[88px] md:pb-[20px]">
        Rewards
        <div className="bg-white rounded-lg shadow p-4 mb-4 flex flex-col items-center">
          {/* Centered Text */}
          <div className="text-center mb-6">
            <h2 className="text-lg font-bold"> <img src="/icon/icons8-tether-48.png" width="18" height="18" style={{ marginRight: '-21px',float:'left',marginTop:'5px' }} /> {userBalance ? userBalance.toFixed(1) : "0.0"}</h2>
            <p className="text-sm text-gray-500">Wallet Balance</p>
          </div>

          {/* Three Boxes */}
          <div className="flex w-full justify-between space-x-4">
            {/* Box 1: Mining */}
            <div className="p-4 flex-1 text-center rounded-lg" style={{ background: 'rgb(240, 240, 240)' }}>

              <p className="text-gray-500 text-sm">mining</p>
              <p className="text-sm black-text">   {miningBonus ? miningBonus.toFixed(1) : "0.0"} USDT</p>
            </div>

            {/* Box 2: Task */}
            <div className=" p-4 flex-1 text-center rounded-lg " style={{ background: 'rgb(240, 240, 240)' }}>

              <p className="text-gray-500 text-sm">tasks</p>
              <p className="text-sm text black-text"> {taskBonus ? taskBonus.toFixed(1) : "0.0"}  USDT</p>
            </div>

            {/* Box 3: TLP */}
            <div className=" p-4 flex-1 text-center rounded-lg " style={{ background: 'rgb(240, 240, 240)' }}>

              <p className="text-gray-500 text-sm">referral</p>
              <p className="text-sm black-text"> {referralBonus ? referralBonus.toFixed(1) : "0.0"} USDT</p>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-3">

          {/* Available Tasks */}
          {pendingTasks.length > 0 && (
            <div className="w-full flex flex-col gap-3">
              <h4 className="text-base font-semibold text-neutral-1000">Available Tasks</h4>
              {pendingTasks.map((task) => (
                <div key={task.id} className="bg-white shadow rounded-xl p-4 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <img alt={task.name} src={task.icon} className="w-6 h-6" />
                    <div>
                      <p className="text-base font-semibold">{task.name}</p>
                      <p className="text-sm text-primary-600"><img src="/icon/icons8-tether-48.png" width="18" height="18" style={{ marginRight: '4px',float:'left',marginTop:'1px' }} />  {task.reward}</p>
                    </div>
                  </div>

                  <div class="max-w-30">
                  {claimableTasks[task.id] ? (
                    <button onClick={() => handleClaim(task.id)} className="w-full __className_4fd903 btn btn-primary btn-medium">
                        {loadingTasks[task.id] ? "Loading..." : "Claim"}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStart(task.id, task.link)}
                      className="w-full __className_4fd903 btn btn-secondary btn-medium"
                      disabled={loadingTasks[task.id]}
                    >
                      {loadingTasks[task.id] ? "Loading..." : "Start"}
                    </button>
                  )}
                  </div>


                </div>
              ))}
            </div>
          )}
        </div>


        <br></br>
        <div className="w-full flex flex-col gap-3">
    

          {/* Finished Tasks */}
          {finishedTasks.length > 0 && (
            <div className="w-full flex flex-col gap-3 mt-6">
              <h4 className="text-base font-semibold text-neutral-1000">Finished Tasks</h4>
              {finishedTasks.map((task) => (
                <div key={task.id} className="bg-white shadow rounded-xl p-4 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <img alt={task.name} src={task.icon} className="w-6 h-6" />
                    <div>
                      <p className="text-base font-semibold">{task.name}</p>
                      <p className="text-sm text-primary-600"><img src="/icon/icons8-tether-48.png" width="18" height="18" style={{ marginRight: '4px',float:'left',marginTop:'1px' }} />  {task.reward}</p>
                    </div>
                  </div>

                <div class="max-w-30"><button class="w-full __className_4fd903 btn btn-default btn-medium">Finished</button></div>
                </div>
              ))}
            </div>
          )}
        </div>

        <br></br>
        {/* <div class="w-full flex flex-col gap-3">
          <h4 class="text-base font-semibold text-neutral-1000">Invite friends</h4>
          <div class="w-full bg-white shadow rounded-xl py-5 px-4 flex flex-col gap-4">
            <div class="flex flex-col gap-1">
              <p class="text-base font-semibold text-neutral-1000">Invite 3 friends</p>
              <p class="text-sm font-medium text-primary-600">+100 POINT</p>
            </div>
            <div class="flex w-full justify-between">
              <div class="w-30">
                <Link to="/referral">
                <button class="w-full __className_4fd903 btn btn-secondary btn-medium">Invite</button>
                </Link>
                
                </div>
              <div class="border-progress-button"
                style={{
                  backgroundImage: "conic-gradient(rgb(23, 23, 23) 0%, rgb(241, 241, 241) 0%)",
                }}>
                <div class="content-progress-button flex items-center justify-center">
                  <p class="text-sm text-neutral-1000 font-medium">0/3</p>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full bg-white shadow rounded-xl py-5 px-4 flex flex-col gap-4">
            <div class="flex flex-col gap-1">
              <p class="text-base font-semibold text-neutral-1000">Invite 10 friends</p>
              <p class="text-sm font-medium text-primary-600">+300 POINT</p>
            </div>
            <div class="flex w-full justify-between">
              <div class="w-30"> <Link to="/referral">
                <button class="w-full __className_4fd903 btn btn-secondary btn-medium">Invite</button>
                </Link>
                </div>
              <div class="border-progress-button"
                style={{
                  backgroundImage: "conic-gradient(rgb(23, 23, 23) 0%, rgb(241, 241, 241) 0%)",
                }}>
                <div class="content-progress-button flex items-center justify-center">
                  <p class="text-sm text-neutral-1000 font-medium">0/10</p>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full bg-white shadow rounded-xl py-5 px-4 flex flex-col gap-4">
            <div class="flex flex-col gap-1">
              <p class="text-base font-semibold text-neutral-1000">Invite 100 friends</p>
              <p class="text-sm font-medium text-primary-600">+1000 POINT</p>
            </div>
            <div class="flex w-full justify-between">
              <div class="w-30">
              <Link to="/referral">
                <button class="w-full __className_4fd903 btn btn-secondary btn-medium">Invite</button>
                </Link>
                
              </div>
              <div class="border-progress-button"
                style={{
                  backgroundImage: "conic-gradient(rgb(23, 23, 23) 0%, rgb(241, 241, 241) 0%)",
                }}>
                <div class="content-progress-button flex items-center justify-center">
                  <p class="text-sm text-neutral-1000 font-medium">0/100</p>
                </div>
              </div>
            </div>
          </div>
        </div> */}



      </div>
    </div>
  );
};

export default Earn;
