import { useState, useEffect } from "react";
import Navbar from "../../nav/NavbarValidator";
import Footer from "../../layout/Footer";
import { ABRewardPendingCard } from "./Cards/ABRewardCard";
import { ABReservationPendingCard } from "./Cards/ABReservationCard";
import { EliteRewardPendingCard } from "./Cards/EliteRewardCard";
import { EliteReservationCard } from "./Cards/EliteReservationCard";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

// imagenes
import abGuruLogo from "../../../assets/images/abguru_logo.png";

// bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const GETCURRENTUSER_URL = "api/users/currentUser";

const Validator = () => {
  const [validator, setValidator] = useState("");
  const [validatorState, setValidatorState] = useState(false);

  // ABTA validator
  const [ABreservationsPending, setABReservationsPending] = useState([]);
  const [ABrewardsPending, setABRewardsPending] = useState([]);

  // ELITE validator
  const [eliteReservationsPending, setEliteReservationsPending] = useState([]);
  const [eliteRewardsPending, setEliteRewardsPending] = useState([]);

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
  const ABRESERVATIONSPENDING_URL = "api/sales/getAllSalesABpending";
  const ABREWARDPENDING_URL = "api/reward/getRewardsABpending";
  const ELITERESERVATIONSPENDING_URL = "api/sales/getAllSalesElitePending";
  const ELITEREWARDPENDING_URL = "api/reward/getRewardsElitePending";

  const getDataAB = async () => {
    try {
      const fetchReservation = await axiosPrivate.get(
        ABRESERVATIONSPENDING_URL
      );
      const fetchRewards = await axiosPrivate.get(ABREWARDPENDING_URL);
      setABReservationsPending(fetchReservation.data.reverse());
      setABRewardsPending(fetchRewards.data.reverse());
    } catch (err) {
      console.log(err);
    }
  };

  const getDataElite = async () => {
    try {
      const fetchReservation = await axiosPrivate.get(
        ELITERESERVATIONSPENDING_URL
      );
      const fetchRewards = await axiosPrivate.get(ELITEREWARDPENDING_URL);
      setEliteReservationsPending(fetchReservation.data.reverse());
      setEliteRewardsPending(fetchRewards.data.reverse());
      //setRewardListState(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    validator === "222AB" ? getDataAB() : getDataElite();
    //eslint-disable-next-line
  }, [validatorState]);

  const ABreservationPendingCardModel = ABreservationsPending.map(
    (ABreservationPending) => {
      return (
        <div key={ABreservationPending._id}>
          <ABReservationPendingCard {...ABreservationPending} />
          <br />
        </div>
      );
    }
  );

  const ABrewardPendingCardModel = ABrewardsPending.map(
    (ABrewardPending) => {
      return (
        <div key={ABrewardPending._id}>
          <ABRewardPendingCard {...ABrewardPending} />
          <br />
        </div>
      );
    }
  );

  const EliteReservationPendingCardModel = eliteReservationsPending.map(
    (eliteReservationPending) => {
      return (
        <div key={eliteReservationPending._id}>
          <EliteReservationCard {...eliteReservationPending} />
          <br />
        </div>
      );
    }
  );

  const EliteRewardPendingCardModel = eliteRewardsPending.map(
    (eliteRewardPending) => {
      return (
        <div key={eliteRewardPending._id}>
          <EliteRewardPendingCard {...eliteRewardPending} />
          <br />
        </div>
      );
    }
  );

  return (
    <div className="main_container">
      <div>
        <img src={abGuruLogo} alt="" className="logo_header" />
      </div>
      <section>
        <Navbar />
        <div className="section_container">
          {validator === "222AB" ? <h2 id="color-pink">Welcome A&BTA Validator</h2> : <h2 id="color-pink">Welcome Elite Validator</h2>}
          <br />
          {validator === "222AB" && (
            <div>
              <div>
                <Row>
                  <Col>
                    <h5 className="user_home_pending_bar" id="text-bold">
                      Reservations pending validation
                    </h5>
                  </Col>
                </Row>
                {ABreservationsPending.length === 0 ? (
                  <h5 id="padding_6px">No reservations pending validation.</h5>
                ) : (
                  <div
                    className="section_loadedsales_container"
                    id="padding_6px"
                  >
                    {ABreservationPendingCardModel}
                  </div>
                )}
              </div>
              <br />
              <div>
                <Row>
                  <Col>
                    <h5 className="user_home_pending_bar" id="text-bold">
                      Rewards pending validation
                    </h5>
                  </Col>
                </Row>
                {ABrewardsPending.length === 0 ? (
                  <h5 id="padding_6px">No rewards pending validation.</h5>
                ) : (
                  <div
                    className="section_loadedsales_container"
                    id="padding_6px"
                  >
                    {ABrewardPendingCardModel}
                  </div>
                )}
              </div>
            </div>
          )}

          {validator === "222ELT" && (
            <div>
              <div>
                <Row>
                  <Col>
                    <h5 className="user_home_pending_bar" id="text-bold">
                      Reservations pending validation
                    </h5>
                  </Col>
                </Row>
                {eliteReservationsPending.length === 0 ? (
                  <h5 id="padding_6px">No reservations pending validation.</h5>
                ) : (
                  <div
                    className="section_loadedsales_container"
                    id="padding_6px"
                  >
                    {EliteReservationPendingCardModel}
                  </div>
                )}
              </div>
              <div>
                <Row>
                  <Col>
                    <h5 className="user_home_pending_bar" id="text-bold">
                      Rewards pending validation
                    </h5>
                  </Col>
                </Row>
                {eliteRewardsPending.length === 0 ? (
                  <h5 id="padding_6px">No rewards pending validation.</h5>
                ) : (
                  <div
                    className="section_loadedsales_container"
                    id="padding_6px"
                  >
                    {EliteRewardPendingCardModel}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <br />
      </section>
      <Footer />
    </div>
  );
};

export default Validator;
