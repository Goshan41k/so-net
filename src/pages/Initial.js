import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import "./initial.scss";
import firebaseAPI from "../firebase/firebase";
import userPic from "../images/userPic.png";

const InputField = props => {
  return (
    <input
      placeholder={props.fieldType}
      defaultValue={props.fieldValue ? props.fieldValue : ""}
      id={props.fieldType}
      type={props.fieldType}
      className="input-field"
      onChange={e => props.handlerChangeState(e.target.value)}
    ></input>
  );
};

const InitialPage = () => {
  let history = useHistory();
  const [currentForm, currentFormChange] = useState(false);
  const [email, emailChange] = useState("");
  const [password, passwordChange] = useState("");
  const [name, nameChange] = useState("");
  const [surname, surnameChange] = useState("");
  const [country, countryChange] = useState("");
  const [city, cityChange] = useState("");

  const authorization = () => {
    firebaseAPI
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push("/feed");
      })
      .catch(error => {
        alert(error.message);
      });
  };

  const registration = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_DATABASE_URL}/users.json`
    );
    let newUserId = res.data !== null ? Object.keys(res.data).length + 1 : 1;
    firebaseAPI
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebaseAPI
          .database()
          .ref("users/" + firebaseAPI.auth().currentUser.uid)
          .set({
            uid: firebaseAPI.auth().currentUser.uid,
            id: newUserId,
            email: email,
            name: name,
            surname: surname,
            country: country,
            city: city,
            avatar: userPic
          });
      })
      .then(() => {
        authorization();
      })
      .catch(error => alert(error.message));
  };

  return (
    <div className="initial-page">
      <div className="initial-form-container">
        <div className="initial-form-header">Logotype</div>
        <div className="initial-form-center">
          <InputField fieldType="email" handlerChangeState={emailChange} />
          <InputField
            fieldType="password"
            handlerChangeState={passwordChange}
          />
          {currentForm ? (
            <>
              <InputField
                fieldValue={name}
                fieldType="name"
                handlerChangeState={nameChange}
              />
              <InputField
                fieldValue={surname}
                fieldType="surname"
                handlerChangeState={surnameChange}
              />
              <InputField
                fieldValue={country}
                fieldType="country"
                handlerChangeState={countryChange}
              />
              <InputField
                fieldValue={city}
                fieldType="city"
                handlerChangeState={cityChange}
              />
            </>
          ) : null}
        </div>
        <div className="initial-form-bottom">
          {currentForm ? (
            <button onClick={registration} className="initial-page-button">
              Sign up
            </button>
          ) : (
            <button onClick={authorization} className="initial-page-button">
              Sign in
            </button>
          )}
        </div>
        <div className="footer-form">
          {currentForm ? "Have account?" : "Don't have an account?"}
          <p
            className="form-footer-p"
            onClick={() => {
              currentFormChange(!currentForm);
            }}
          >
            {currentForm ? "login" : "registration"}
          </p>
        </div>
      </div>
      <div className="initial-page-footer">
        This application created with react-create-app. All right reserved ©
        <br /> Yedziuey Heorhi 2019
      </div>
    </div>
  );
};

export default InitialPage;

InputField.propTypes = {
  fieldType: PropTypes.string
};
