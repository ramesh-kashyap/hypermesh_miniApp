import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../c0vj7n5t-removebg-preview.png';

export default function Sidebar() {
  return (
    <>
      <div class="hidden max-h-screen md:flex flex-col text-black transition-all duration-300 justify-between w-[264px]">
        
              <div className="flex items-center justify-between border-b border-gray-200">
                <Link
                  className="flex items-center py-5 pl-[22px] h-[80px]"
                 to="/"
                  style={{ width: "180px" }}
                >
                  <img className='logo'
                    alt="Logo"
                    loading="lazy"
                    
                    decoding="async"
                    data-nimg="1"
                    src={logo}
                  />
                </Link>
                <button
                  className="text-black bg-gray-200 w-6 h-8 text-[20px] rounded-l-lg"
                  fdprocessedid="cgvemq"
                >
                  <img
                    alt="close"
                    loading="lazy"
                    width="40"
                    height="40"
                    decoding="async"
                    data-nimg="1"
                    src="upnl/assets/icons/icon_left.svg"
                    style={{ color: "transparent" }}
                  />
                </button>
              </div>
             
              <nav className="my-5 px-5 text-sm font-medium text-[#555]">
                <div className="text-gray-400 text-xs mb-2">MENU</div>
                <Link
                  className="flex items-center py-2 px-3 mb-2 rounded-md  text-white"
                  to="/"  style={{
                    backgroundColor: "#0093E9",
                    backgroundImage: "linear-gradient(315deg, #0093E9 0%, #80D0C7 100%)",
                  }}
                >
                  <img
                    alt="overview Icon"
                    loading="lazy"
                    width="16"
                    height="16"
                    decoding="async"
                    data-nimg="1"
                    src="upnl/assets/icons/icon-overview_active.svg"
                    style={{ color: "transparent" }}
                  />
                  <span className="ml-4">Overview</span>
                </Link>
                <Link
                  className="flex items-center py-2 px-3 mb-2 rounded-md hover:bg-gray-100"
                  to="/earn"
                >
                  <img
                    alt="my_nodes Icon"
                    loading="lazy"
                    width="16"
                    height="16"
                    decoding="async"
                    data-nimg="1"
                    src="upnl/assets/icons/icon-nodes.svg"
                    style={{ color: "transparent" }}
                  />
                  <span className="ml-4">Nodes</span>
                </Link>
                <Link
                  className="flex items-center py-2 px-3 mb-2 rounded-md hover:bg-gray-100"
                  to="/"
                >
                  <img
                    alt="rewards Icon"
                    loading="lazy"
                    width="16"
                    height="16"
                    decoding="async"
                    data-nimg="1"
                    src="upnl/assets/icons/icon-rewards.svg"
                    style={{ color: "transparent" }}
                  />
                  <span className="ml-4">Rewards</span>
                </Link>
                <Link
                  className="flex items-center py-2 px-3 mb-2 rounded-md hover:bg-gray-100"
                  to="/referral"
                >
                  <img
                    alt="referrals Icon"
                    loading="lazy"
                    width="16"
                    height="16"
                    decoding="async"
                    data-nimg="1"
                    src="upnl/assets/icons/icon-referrals.svg"
                    style={{ color: "transparent" }}
                  />
                  <span className="ml-4">Referrals</span>
                </Link>
                <Link
                  className="flex items-center py-2 px-3 mb-2 rounded-md hover:bg-gray-100"
                  to="/"
                >
                  <img
                    alt="wallet Icon"
                    loading="lazy"
                    width="16"
                    height="16"
                    decoding="async"
                    data-nimg="1"
                    src="upnl/assets/icons/icon-wallet.svg"
                    style={{ color: "transparent" }}
                  />
                  <span className="ml-4">Wallet</span>
                </Link>
                <Link
                  className="flex items-center py-2 px-3 mb-2 rounded-md hover:bg-gray-100"
                  to="/profile"
                >
                  <img
                    alt="profile Icon"
                    loading="lazy"
                    width="16"
                    height="16"
                    decoding="async"
                    data-nimg="1"
                    src="upnl/assets/icons/icon-profile.svg"
                    style={{ color: "transparent" }}
                  />
                  
                  <span className="ml-4">Profile</span>
                </Link>
              </nav>
              <footer className="my-5 px-5 text-sm font-medium text-[#555] ">
              <div className="text-gray-400 text-xs mb-2">FOLLOW US</div>
             
           
              <a
                className="flex items-center py-2 px-3 mb-4 rounded"
                href="#"
              >
                <img
                  alt="Discord Icon"
                  loading="lazy"
                  width="16"
                  height="16"
                  decoding="async"
                  data-nimg="1"
                  src="upnl/assets/icons/icon_discord.svg"
                  style={{ color: "transparent" }}
                />
                <span className="ml-4">Discord</span>
              </a>
              {/* <div
                style={{
                  borderTop: "1px solid rgb(241, 241, 241)",
                  margin: "20px 0px",
                }}
              ></div> */}
              <div>
                <a
                  className="flex items-center py-2 px-3 mb-4 rounded"
                  href="{{ route('logout') }}"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('logout-form').submit();
                  }}
                >
                  <img
                    alt="Contact Us Icon"
                    loading="lazy"
                    width="16"
                    height="16"
                    decoding="async"
                    data-nimg="1"
                    src="upnl/assets/icons/customer-service.svg"
                    style={{ color: "transparent" }}
                  />
                  <span className="ml-4">Log out</span>
                </a>
              </div>

              <form
                id="logout-form"
                action="{{ route('logout') }}"
                method="POST"
                className="d-none"
              >
             
              </form>
            </footer>
          
            </div>   
            
    </>
  );
}

