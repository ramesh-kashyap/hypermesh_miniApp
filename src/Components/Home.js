import React, { useState,useEffect } from 'react';
import CountdownTimer from './CountdownTimer';
import Api from '../services/Api';

function Home() {
  const [telegram_id] = useState(localStorage.getItem("telegram_id"));
  const [activeButton, setActiveButton] = useState('reward');
  const [value1, setValue1] = useState('0.00');  
  const [value2, setValue2] = useState('0.00');  
  const [text1, setText1] = useState('Todays Mining');  
  const [text2, setText2] = useState('Total Rewards');  

  const handleButtonClick = (button) => {
    setActiveButton(button);

    if (button === 'reward') {
      fetchMiningBonus();
     
    } else {
      setValue1('100');   
      setValue2('0.25 TH/s');   
      setText1('Network Difficulty');   
      setText2('Hash Rate');   
    }
  };

    useEffect(() => {
      fetchMiningBonus();
    }, []);
    const fetchMiningBonus = async () => {
      try {
        const response = await Api.get("auth/get-mining-bonus");
        if (response.data.success) {
          setText1('Todays Mining');   
          setText2('Total Rewards');  
          setValue1(response.data.todayBonus?response.data.todayBonus:0.0);
          setValue2(response.data.totalBonus?response.data.totalBonus:'0.0');
        }
      } catch (error) {
        console.error("❌ Error fetching lastTrade:", error);
      }
    };

  return (
    <>
           
      <div className="flex-1 flex flex-col text-black bg-[#F1F1F1] h-screen">
        <div className="flex-1 overflow-y-auto px-4 md:px-10 lg:px-10 xl:px-20 pt-5 pb-[88px] md:pb-[20px]">
          <div
            className="w-full"
            style={{  
              borderRadius: '20px',
              
              padding: '20px',
              textAlign: 'center',
              maxWidth: '1000px',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            {/* Countdown Section */}
            {/* Circular Progress Section */}
            
            <CountdownTimer depositAmount={100} /> 
           
         
            
            {/* Button Section */}
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
              <button
                onClick={() => handleButtonClick('reward')}
                style={{
                  backgroundColor: activeButton === 'reward' ? 'rgb(0, 0, 0)' : 'rgb(240, 240, 240)',
                  color: activeButton === 'reward' ? 'rgb(255, 255, 255)' : 'rgb(102, 102, 102)',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '5px 20px',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                Reward
              </button>
              <button
                onClick={() => handleButtonClick('status')}
                style={{
                  backgroundColor: activeButton === 'status' ? 'rgb(0, 0, 0)' : 'rgb(240, 240, 240)',
                  color: activeButton === 'status' ? 'rgb(255, 255, 255)' : 'rgb(102, 102, 102)',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '5px 26px',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                Status
              </button>
            </div>

            {/* Today Mining and Total Rewards Section */}
            <div
              style={{
                marginTop: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}
            >
              <div
                style={{
                  flex: 1,
                  background: '#f0f0f0',
                  borderRadius: '10px',
                  padding: '10px',
                  margin: '5px',
                }}
              >
                <span
                  style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: 'black',
                    display: 'block',
                  }}
                >
                  {value1} {/* Show the value based on active button */}
                </span>
                <p style={{ margin: '5px 0 0', fontSize: '12px', color: '#333' }}>
                {text1}
                </p>
              </div>
              <div
                style={{
                  flex: 1,
                  minWidth: '45%',
                  background: '#f0f0f0',
                  borderRadius: '10px',
                  padding: '10px',
                  margin: '5px',
                }}
              >
                <span
                  style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: 'black',
                    display: 'block',
                  }}
                >
                  {value2} {/* Show the value based on active button */}
                </span>
                <p style={{ margin: '5px 0 0', fontSize: '12px', color: '#333' }}>
                {text2}
                </p>
              </div>

              <div className="mt-8">
            <img alt="DNode Trading Now Live Banner" className="rounded-lg shadow-lg" src="/upnl/assets/images/bnner.png"/>
            </div>



            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
