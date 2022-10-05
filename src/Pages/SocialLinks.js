import React, { Component } from "react";
import { socials } from "../Components/Helpers/socials";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useUser } from "../Contexts/userContext";
import "../Styles/Socials.css";

function SocialLinks() {
  const { data } = useUser();

  const config = {
    headers:{
      uid : data[0].userId
    }
  }
  return (
    <div className="socials">
      {/* <LinkedInIcon /> */}
      <div>
        {socials.map((link) => (
          <div className="socialsInput">
            <div className="socialsInputHeader">
              <div>
                {React.createElement(link.component, { fontSize: "medium" })}
              </div>
              <div>
                <label>{link.name}</label>
              </div>
            </div>
            <div className="socialsLink">
              <input
                type="text"
                value={data[0].socialLinks[link.name]}
                placeholder={`${link.name} link`}
              />
              <div className="socialsEdit">
                <EditOutlinedIcon />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="socialButton">
        <button>Add Link</button>
      </div>
    </div>
  );
}

export default SocialLinks;
