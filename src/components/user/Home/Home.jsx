import { useState, useEffect } from "react";
import Navbar from "../../nav/NavbarUser";
import Footer from "../../layout/Footer";
import { ReservationCard } from "./Cards/ReservationCard";
import { RewardCard } from "./Cards/RewardCard";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

// imagenes
import abGuruLogo from "../../../assets/images/abguru_logo.png";

// bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// URL
const GETCURRENTUSER_URL = "api/users/currentUser";

const Home = () => {
  const [userData, setUserData] = useState("");
  const [userDataState, setUserDataState] = useState(false);
  const [salesList, setSalesList] = useState([]);
  const [rewardsList, setRewardsList] = useState([]);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const fetchUser = await axiosPrivate.get(GETCURRENTUSER_URL);
        setUserData(fetchUser.data);
        setUserDataState(true);
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
    //eslint-disable-next-line
  }, []);

  // URL
  const GETALLSALESBYID_URL = "api/sales/getSalesByUserId/" + userData._id;
  const GETALLREWARDSSBYID_URL =
    "api/reward/getRewardsByUserId/" + userData._id;

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchSales = await axiosPrivate.get(GETALLSALESBYID_URL);
        const fetchRewards = await axiosPrivate.get(GETALLREWARDSSBYID_URL);
        setSalesList(fetchSales.data.reverse());
        setRewardsList(fetchRewards.data.reverse());
      } catch (err) {
        console.log(err);
      }
    };
    getData();
    //eslint-disable-next-line
  }, [userDataState]);

  const reservationsCardModel = salesList.map((sale) => {
    return (
      <div key={sale._id}>
        <ReservationCard {...sale} />
        <br />
      </div>
    );
  });

  const rewardsCardModel = rewardsList.map((reward) => {
    return (
      <div key={reward._id}>
        <RewardCard {...reward} />
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
          <div className="userData_home_topbar">
            <h2 id="color-pink">
              Bienvenido {userData.firstName} {userData.lastName}
            </h2>
            <Container>
              <h4>
                <span id="text-bold">Puntos:</span> {userData.pointsEarned}
              </h4>
              {userData?.AB_Prize?.length !== 0 && (
                <div>
                  <h5 id="text-bold">Premio A&B Tourism Authority:</h5>{" "}
                  {userData?.AB_Prize?.map((prize, i) => (
                    <h5 id="AB_Prize_h5" value={prize} key={i}>
                      {prize}
                    </h5>
                  ))}
                </div>
              )}
            </Container>
          </div>
          <br />
          <div className="section_home_info">
            <h5 id="text-bold">
              Ya eres parte de nuestro programa de rewards en Latinoamérica
            </h5>
            <br />
            <p>
              <span id="color-pink">#AyBGurúsRewards</span> está diseñado para
              ayudar a los agentes y operadores a convertirse en expertos en
              este increíble destino.
            </p>
            <p>
              De la mano de{" "}
              <span id="text-bold">EM Marketing & Communication</span>, su
              agencia de Marketing y PR en Latinoamérica, Antigua y Barbuda
              presenta el desarrollo de su nuevo programa de recompensas para
              agentes de viajes de la región.
            </p>
          </div>
          <br />
          <div>
            {rewardsList.length > 0 && (
              <div>
                <Row>
                  <Col>
                    <h5 className="user_home_pending_bar" id="text-bold">
                      Recompensas
                    </h5>
                  </Col>
                </Row>
                <div className="section_loadedsales_container" id="padding_6px">
                  {rewardsCardModel}
                </div>
              </div>
            )}
          </div>
          <div>
            {salesList.length > 0 && (
              <div>
                <Row>
                  <Col>
                    <h5 className="user_home_pending_bar" id="text-bold">
                      Reservas
                    </h5>
                  </Col>
                </Row>
                <div>
                  <div
                    className="section_loadedsales_container"
                    id="padding_6px"
                  >
                    {reservationsCardModel}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
