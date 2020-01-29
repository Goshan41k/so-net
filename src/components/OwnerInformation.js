import React, { useEffect } from "react";
import { connect } from "react-redux";
import store from "../store";
import "./OwnerInformation.scss";

const OwnerInformation = ({ owner }) => {
  useEffect(() => {
    store.dispatch({ type: "PAGE_OWNER_CLEAR" });
    store.dispatch({ type: "FETCH_PAGE_OWNER" });
  }, []);

  return (
    <div className="owner-information">
      {owner !== null ? (
        <>
          <img className="owner-avatar" src={owner.avatar} alt="#" />
          <div className="owner-name">{owner.name + " " + owner.surname}</div>
          <div className="owner-id">@/id{owner.id}</div>
          <div className="owner-location">
            Country: {owner.country}
            <br /> City: {owner.city}
          </div>
        </>
      ) : null}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    owner: state.ownerPageReducer.pageOwnerData
  };
};

export default connect(mapStateToProps)(OwnerInformation);
