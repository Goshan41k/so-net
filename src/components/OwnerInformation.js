import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./OwnerInformation.scss";
import userPic from "../images/userPic.png";

const OwnerInformation = ({ ownerId }) => {
  const [avatar, setAvatar] = useState(userPic);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    const fetchOwnerInformation = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_DATABASE_URL}/users.json`
      );
      const users = Object.values(res.data);
      users.map(user => {
        if (user.id.toString() === ownerId.toString()) {
          setAvatar(user.avatar);
          setName(user.name + " " + user.surname);
          setCountry(user.country);
          setCity(user.city);
        }
        return null;
      });
    };
    fetchOwnerInformation();
  }, [ownerId]);

  return (
    <div className="owner-information">
      <img className="owner-avatar" src={avatar} alt="#" />
      <div className="owner-name">{name}</div>
      <div className="owner-id">@/id{ownerId}</div>
      <div className="owner-location">
        Country: {country}
        <br /> City: {city}
      </div>
    </div>
  );
};

export default OwnerInformation;

OwnerInformation.propTypes = {
  ownerId: PropTypes.string
};
