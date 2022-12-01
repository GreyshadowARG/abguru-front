import { useState, useEffect } from "react";
import Navbar from "../../nav/NavbarValidator";
import Footer from "../../layout/Footer";
import { ABRewardPendingCard } from "./RewardsCard/ABRewardPendingCard";
import { EliteRewardPendingCard } from "./RewardsCard/EliteRewardPendingCard";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

// imagenes
import abGuruLogo from "../../../assets/images/abguru_logo.png";

// URL
const GETCURRENTUSER_URL = "api/users/currentUser";

const ValidateReward = () => {
  const [validator, setValidator] = useState("");
  const [validatorState, setValidatorState] = useState(false);

  const [rewardsABPendingList, setRewardsABPendingList] = useState([]);
  const [ABrewardsPendingListState, setABRewardsPendingListState] =
    useState(false);
  const [eliteRewardsPendingList, setEliteRewardsPendingList] = useState([]);
  const [eliteRewardsPendingListState, setEliteRewardsPendingListState] =
    useState(false);
  const [approvedState, setApprovedState] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  // URL
  const ABREWARDPENDING_URL = "api/reward/getRewardsABpending";
  const ELITEREWARDPENDING_URL = "api/reward/getRewardsElitePending";

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

  const getABRewardsPending = async () => {
    try {
      const response = await axiosPrivate.get(ABREWARDPENDING_URL);
      setRewardsABPendingList(response.data.reverse());
      response?.data?.length === 0 ? setABRewardsPendingListState(false) : setABRewardsPendingListState(true)
      setApprovedState(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getEliteRewardsPending = async () => {
    try {
      const response = await axiosPrivate.get(ELITEREWARDPENDING_URL);
      setEliteRewardsPendingList(response.data.reverse());
      response?.data?.length === 0 ? setEliteRewardsPendingListState(false) : setEliteRewardsPendingListState(true)
      setApprovedState(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    validator === "222AB" ? getABRewardsPending() : getEliteRewardsPending();

    // eslint-disable-next-line
  }, [validatorState, approvedState]);

  const ABrewardPendingCardModel = rewardsABPendingList.map(
    (ABrewardPendingList) => {
      return (
        <div key={ABrewardPendingList._id}>
          <ABRewardPendingCard
            getApprovedState={setApprovedState}
            {...ABrewardPendingList}
          />
          <br />
        </div>
      );
    }
  );

  const EliteRewardPendingCardModel = eliteRewardsPendingList.map(
    (EliteRewardPendingList) => {
      return (
        <div key={EliteRewardPendingList._id}>
          <EliteRewardPendingCard
            getApprovedState={setApprovedState}
            {...EliteRewardPendingList}
          />
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
          <h2>Validate rewards</h2>
          <div className="section_loadedsales_main">
            {validator === "222AB" && ABrewardsPendingListState && (
              <div>
                {ABrewardPendingCardModel}
                <p className="validate_rewards_legal">
                  If the reward is approved, the agent will receive a
                  notification.{" "}
                  <span id="text-bold">
                    The validator must communicate by email to agree on the
                    prize delivery conditions.
                  </span>
                </p>
              </div>
            )}
            {validator === "222AB" && ABrewardsPendingListState === false && (
              <div>
                <h3 className="hotelSelector_default">No rewards loaded.</h3>
              </div>
            )}

            {validator === "222ELT" && eliteRewardsPendingListState && (
              <div>
                {EliteRewardPendingCardModel}
                <p className="validate_rewards_legal">
                  If the reward is approved, the agent will receive a
                  notification.{" "}
                  <span id="text-bold">
                    The validator must communicate by email to agree on the
                    prize delivery conditions.
                  </span>
                </p>
              </div>
            )}
            {validator === "222ELT" && eliteRewardsPendingListState === false && (
              <div>
                <h3 className="hotelSelector_default">No rewards loaded.</h3>
              </div>
            )}
          </div>
        </div>
        <br />
      </section>
      <Footer />
    </div>
  );
};

export default ValidateReward;
