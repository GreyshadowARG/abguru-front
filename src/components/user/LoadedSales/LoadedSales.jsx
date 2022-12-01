import { useState, useEffect } from "react";
import Navbar from "../../nav/NavbarUser";
import Footer from "../../layout/Footer";
import { SaleCard } from "./SaleCard/SaleCard";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

// imagenes
import abGuruLogo from "../../../assets/images/abguru_logo.png";

// bootstrap
import Container from "react-bootstrap/Container";

const LoadedSales = () => {
  const [salesList, setSalesList] = useState([]);
  const [userID, setUserID] = useState("");
  const [deleteState, setDeleteState] = useState(false);
  const [userIDState, setUserIDState] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  // URL
  const GETCURRENTUSER_URL = "api/users/currentUser";

  useEffect(() => {
    const getUserData = async () => {
      try {
        const fetchUser = await axiosPrivate.get(GETCURRENTUSER_URL);
        setUserID(fetchUser.data._id);
        setUserIDState(true);
      } catch (err) {
        console.log(err);
      }
    };

    getUserData();
    //eslint-disable-next-line
  }, []);

  // URL
  const GETALLSALESBYID_URL = "api/sales/getSalesByUserId/" + userID;

  useEffect(() => {
    const getSales = async () => {
      try {
        const response = await axiosPrivate.get(GETALLSALESBYID_URL);
        setSalesList(response.data.reverse());
        setDeleteState(false);
      } catch (err) {
        console.log(err);
      }
    };

    getSales();

    // eslint-disable-next-line
  }, [userIDState, deleteState]);

  const saleCardModel = salesList.map((saleList) => {
    return (
      <div key={saleList._id}>
        <SaleCard getDeleteState={setDeleteState} {...saleList} />
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
          <h2>Reservas Cargadas</h2>
          <Container>
            <div className="section_loadedsales_main">
              {salesList.length === 0 ? (
                <div>
                  <h3 className="hotelSelector_default">
                    No hay reservas cargadas por el momento
                  </h3>
                </div>
              ) : (
                <div>
                  {saleCardModel}
                </div>
              )}
            </div>
          </Container>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LoadedSales;
