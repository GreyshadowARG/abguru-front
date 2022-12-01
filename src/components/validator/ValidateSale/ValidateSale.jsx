import { useState, useEffect } from "react";
import Navbar from "../../nav/NavbarValidator";
import Footer from "../../layout/Footer";
import { ABSalePendingCard } from "./SalesCard/ABSalePendingCard";
import { EliteSalePendingCard } from "./SalesCard/EliteSalePendingCard";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

// imagenes
import abGuruLogo from "../../../assets/images/abguru_logo.png";

// URL
const GETCURRENTUSER_URL = "api/users/currentUser";

const ValidateSale = () => {
  const [validator, setValidator] = useState("");
  const [validatorState, setValidatorState] = useState(false);

  const [ABSalesPendingList, setABSalesPendingList] = useState([]);
  const [ABSalesPendingListState, setABSalesPendingListState] = useState(false);
  const [eliteSalesPendingList, setEliteSalesPendingList] = useState([]);
  const [eliteSalesPendingListState, setEliteSalesPendingListState] =
    useState(false);

  const [approvedState, setApprovedState] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  // URL
  const GETABPENDING_URL = "api/sales/getAllSalesABpending";
  const GETELITEPENDING_URL = "api/sales/getAllSalesElitePending";

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

  const getABSalesPending = async () => {
    try {
      const response = await axiosPrivate.get(GETABPENDING_URL);
      setABSalesPendingList(response.data.reverse());
      response?.data?.length === 0
        ? setABSalesPendingListState(false)
        : setABSalesPendingListState(true);
      setApprovedState(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getEliteSalesPending = async () => {
    try {
      const response = await axiosPrivate.get(GETELITEPENDING_URL);
      setEliteSalesPendingList(response.data.reverse());
      response?.data?.length === 0
        ? setEliteSalesPendingListState(false)
        : setEliteSalesPendingListState(true);
      setApprovedState(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    validator === "222AB" ? getABSalesPending() : getEliteSalesPending();

    // eslint-disable-next-line
  }, [validatorState, approvedState]);

  const ABSalePendingCardModel = ABSalesPendingList.map((ABSalePendingList) => {
    return (
      <div key={ABSalePendingList._id}>
        <ABSalePendingCard
          getApprovedState={setApprovedState}
          {...ABSalePendingList}
        />
        <br />
      </div>
    );
  });

  const EliteSalePendingCardModel = eliteSalesPendingList.map(
    (eliteSalePendingList) => {
      return (
        <div key={eliteSalePendingList._id}>
          <EliteSalePendingCard
            getApprovedState={setApprovedState}
            {...eliteSalePendingList}
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
          <h2>Validate reservation</h2>
          <div className="section_loadedsales_main">
            {validator === "222AB" && ABSalesPendingListState && (
              <div>{ABSalePendingCardModel}</div>
            )}
            {validator === "222AB" && ABSalesPendingListState === false && (
              <div>
                <h3 className="hotelSelector_default">
                  No reservations loaded.
                </h3>
              </div>
            )}
            {validator === "222ELT" && eliteSalesPendingListState && (
              <div>{EliteSalePendingCardModel}</div>
            )}
            {validator === "222ELT" && eliteSalesPendingListState === false && (
              <div>
                <h3 className="hotelSelector_default">
                  No reservations loaded.
                </h3>
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

export default ValidateSale;
