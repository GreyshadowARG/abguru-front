import { useState, useEffect } from "react";
import Navbar from "../../nav/NavbarValidator";
import Footer from "../../layout/Footer";
import { ABsaleCard } from "./Cards/ABsaleCard";
import { ABrewardCard } from "./Cards/ABrewardCard";
import { EliteRewardCard } from "./Cards/EliteRewardCard";
import { EliteSaleCard } from "./Cards/EliteSaleCard";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

// imagenes
import abGuruLogo from "../../../assets/images/abguru_logo.png";

const GETCURRENTUSER_URL = "api/users/currentUser";

const ValidationHistory = () => {
  const [validator, setValidator] = useState("");
  const [validatorState, setValidatorState] = useState(false);
  const [toggleDataType, setToggleDataType] = useState(false);

  // ABTA validator
  const [ABreservations, setABreservations] = useState([]);

  const [ABrewards, setABrewards] = useState([]);

  // ELITE validator
  const [eliteReservations, setEliteReservations] = useState([]);
  const [eliteRewards, setEliteRewards] = useState([]);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const fetchUser = await axiosPrivate.get(GETCURRENTUSER_URL);
        setValidator(fetchUser.data.identityNumber);
        setValidatorState(true);
      } catch (err) {
        console.log(err);
      }
    };

    getUserData();
    //eslint-disable-next-line
  }, []);

  // URL
  const ABRESERVATIONS_URL = "api/sales/getSalesABHistory";
  const ABREWARDS_URL = "api/reward/getRewardsABHistory";

  const ELITERESERVATIONS_URL = "api/sales/getSalesEliteHistory";
  const ELITEREWARDS_URL = "api/reward/getRewardsEliteHistory";

  const getReservationsAB = async () => {
    try {
      const fetchReservation = await axiosPrivate.get(ABRESERVATIONS_URL);
      setABreservations(fetchReservation.data.reverse());
    } catch (err) {
      console.log(err);
    }
  };

  const getRewardsAB = async () => {
    try {
      const fetchReservation = await axiosPrivate.get(ABREWARDS_URL);
      setABrewards(fetchReservation.data.reverse());
    } catch (err) {
      console.log(err);
    }
  };

  const getReservationsElite = async () => {
    try {
      const fetchReservation = await axiosPrivate.get(ELITERESERVATIONS_URL);
      setEliteReservations(fetchReservation.data.reverse());
    } catch (err) {
      console.log(err);
    }
  };

  const getRewardsElite = async () => {
    try {
      const fetchReservation = await axiosPrivate.get(ELITEREWARDS_URL);
      setEliteRewards(fetchReservation.data.reverse());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const setDataType = () => {
      if (validator === "222AB") {
        getReservationsAB();
        getRewardsAB();
      } else {
        getReservationsElite();
        getRewardsElite();
      }
    };

    setDataType();
    //eslint-disable-next-line
  }, [validatorState]);

  const ABsaleCardModel = ABreservations.map((ABreservation) => {
    return (
      <div key={ABreservation._id}>
        <ABsaleCard {...ABreservation} />
        <br />
      </div>
    );
  });

  const ABrewardCardModel = ABrewards.map((ABreward) => {
    return (
      <div key={ABreward._id}>
        <ABrewardCard {...ABreward} />
        <br />
      </div>
    );
  });

  const EliteSaleCardModel = eliteReservations.map((eliteReservation) => {
    return (
      <div key={eliteReservation._id}>
        <EliteSaleCard {...eliteReservation} />
        <br />
      </div>
    );
  });

  const EliteRewardsCardModel = eliteRewards.map((eliteReward) => {
    return (
      <div key={eliteReward._id}>
        <EliteRewardCard {...eliteReward} />
        <br />
      </div>
    );
  });

  return (
    <div className="main_container">
      <div>
        <img src={abGuruLogo} alt="" className="logo_header" />
      </div>
      <section>
        <Navbar />
        <div className="section_container">
          <div>
            <h2 id="color-pink">Validation history</h2>
            <button
              className="validation_history_button"
              onClick={() => setToggleDataType(!toggleDataType)}
            >
              {toggleDataType
                ? "Show Sales validation history"
                : "Show Rewards validation history"}
            </button>
          </div>
          <br />
          <div className="section_loadedsales_main">
            {toggleDataType === false && validator === "222AB" && (
              <div>
                <h4 id="text-bold">Reservations</h4>
                <hr />
                {ABsaleCardModel}
              </div>
            )}
            {toggleDataType === true && validator === "222AB" && (
              <div>
                <h4 id="text-bold">Rewards</h4>
                <hr />
                {ABrewardCardModel}
              </div>
            )}
            {toggleDataType === false && validator === "222ELT" && (
              <div>
                <h4 id="text-bold">Reservations</h4>
                <hr />
                {EliteSaleCardModel}
              </div>
            )}
            {toggleDataType === true && validator === "222ELT" && (
              <div>
                <h4 id="text-bold">Rewards</h4>
                <hr />
                {EliteRewardsCardModel}
              </div>
            )}

            {/*
            validator === "222ELT"
            {ABreservations.length === 0 ? (
              <div>
                <h3 className="hotelSelector_default">
                  No hay reservas cargadas por el momento
                </h3>
              </div>
            ) : (
              
            )}
            {eliteReservations.length === 0 ? (
              <div>
                <h3 className="hotelSelector_default">
                  No hay reservas cargadas por el momento
                </h3>
              </div>
            ) : (
              <div>
                {EliteSaleCardModel}
              </div>
            )}
            */}
          </div>
        </div>
        <br />
      </section>
      <Footer />
    </div>
  );
};

export default ValidationHistory;
