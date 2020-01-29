import React, { useState } from "react";
import Loader from "../components/Loader";
import firebaseAPI from "../firebase/firebase";
import store from "../store";
import "./settings.scss";

const SettingRecord = ({ recordName, defaultValue, changer }) => {
  return (
    <>
      <label className="settings-label" htmlFor={recordName}>
        {recordName}:
      </label>
      <input
        className="settings-input"
        id={recordName}
        defaultValue={defaultValue}
        onChange={changer}
      />
    </>
  );
};

const Settings = () => {
  const [name, nameChange] = useState("");
  const [surname, surnameChange] = useState("");
  const [country, countryChange] = useState("");
  const [city, cityChange] = useState("");
  const currentUser = store.getState().currentUserReducer.currentUser;

  const saveChanges = () => {
    const user = {
      name: name || currentUser.name,
      surname: surname || currentUser.surname,
      country: country || currentUser.country,
      city: city || currentUser.city
    };
    firebaseAPI
      .database()
      .ref("users/" + currentUser.uid)
      .update(user);
  };

  const changeAvatar = e => {
    let file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      firebaseAPI
        .database()
        .ref("users/" + currentUser.uid)
        .update({ avatar: reader.result });
    };
    reader.onerror = function(error) {
      alert("Error: ", error);
    };
  };

  return (
    <div className="settings">
      {currentUser !== null ? (
        <>
          <div className="settings-header">General</div>
          <div className="settings-section">
            <label className="settings-label" htmlFor="input-file">
              Avatar:
            </label>
            <input
              id="input-file"
              className="settings-input-file"
              type="file"
              onChange={changeAvatar}
            />
          </div>
          <hr className="settings-hr" />
          <div className="settings-section">
            <SettingRecord
              recordName="Name"
              defaultValue={currentUser.name}
              changer={e => {
                e.preventDefault();
                nameChange(e.target.value);
              }}
            />
            <SettingRecord
              recordName="Surname"
              defaultValue={currentUser.surname}
              changer={e => {
                e.preventDefault();
                surnameChange(e.target.value);
              }}
            />
            <SettingRecord
              recordName="Country"
              defaultValue={currentUser.country}
              changer={e => {
                e.preventDefault();
                countryChange(e.target.value);
              }}
            />
            <SettingRecord
              recordName="City"
              defaultValue={currentUser.city}
              changer={e => {
                e.preventDefault();
                cityChange(e.target.value);
              }}
            />
          </div>
          <hr className="settings-hr" />
          <button className="settings-button" onClick={saveChanges}>
            Save
          </button>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Settings;
