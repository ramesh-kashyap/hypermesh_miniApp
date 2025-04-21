import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <div
      className="fixed bottom-0 w-full bg-white flex md:hidden justify-around shadow-lg"
      style={{
      
      }}
    >
      {/* Overview link */}
      <NavLink
        to="/" // Replace with the actual route
        className="flex w-1/5 p-[12px] flex-col items-center nav-link"
        activeClassName="text-white"
        exact
      >
        <img
          alt="overview Icon"
          loading="lazy"
          width="20"
          height="20"
          decoding="async"
          src="upnl/assets/icons/icon-overview.svg"
        />
        <span className="text-xs mt-1">Nodes</span>
      </NavLink>

      {/* Market link */}
      <NavLink
        to="/earn" // Replace with the actual route
        className="flex w-1/5 p-[12px] flex-col items-center nav-link"
        activeClassName="text-white"
        exact
      >
        <img
          alt="my_nodes Icon"
          loading="lazy"
          width="20"
          height="20"
          decoding="async"
          src="upnl/assets/icons/icon-nodes.svg"
        />
        <span className="text-xs mt-1">Earn</span>
      </NavLink>

      {/* Referrals link */}
      <NavLink
        to="/referral" // Replace with the actual route
        className="flex w-1/5 p-[12px] flex-col items-center nav-link"
        activeClassName="text-white"
        exact
      >
        <img
          alt="referrals Icon"
          loading="lazy"
          width="20"
          height="20"
          decoding="async"
          src="upnl/assets/icons/icon-referrals.svg"
        />
        <span className="text-xs mt-1">Referrals</span>
      </NavLink>

      {/* Profile link */}
      <NavLink
        to="/profile" // Replace with the actual route
        className="flex w-1/5 p-[12px] flex-col items-center nav-link"
        activeClassName="text-white"
        exact
      >
        <img
          alt="profile Icon"
          loading="lazy"
          width="20"
          height="20"
          decoding="async"
          src="upnl/assets/icons/icon-profile.svg"
        />
        <span className="text-xs mt-1">Profile</span>
      </NavLink>
    </div>
  );
};

export default Footer;

const styles = `
  /* Base styles for the nav-link */
.nav-link {
  transition: all 0.3s ease;
  color: #373737; /* Default text color */
  padding: 12px;
}

/* When the link is active, set text color */
.nav-link.active {
  color: rgb(95, 202, 237); /* Set text color to rgb(95, 202, 237) when active */
}

/* For SVG images, apply color manipulation using the filter property */
.nav-link.active img {
  filter: brightness(5) invert(1) sepia(1) saturate(5) hue-rotate(180deg); /* Apply color filter to make the image appear in rgb(95, 202, 237) */
}

/* Transition for images */
.nav-link img {
  transition: filter 0.3s ease;
}

/* When the nav-link is active, apply the same color to the text (span) */
.nav-link.active span {
  color: rgb(95, 202, 237); /* Set text color to rgb(95, 202, 237) */
}

/* Optional: Responsive design */
@media (max-width: 600px) {
  .nav-link {
    padding: 10px;
  }
}

`;

// Append styles to the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
