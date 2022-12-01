import { Routes, Route } from "react-router-dom";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import TermsAndConditions from "./components/auth/TermsAndConditions";

//user
import Home from "./components/user/Home/Home";
import Prizes from "./components/user/Prizes/Prizes";
import LoadedSales from "./components/user/LoadedSales/LoadedSales";
import NewSale from "./components/user/NewSale/NewSale";
import RedeemPoints from "./components/user/RedeemPoints/RedeemPoints";

//validator
import Validator from "./components/validator/Home/Validator";
import ValidateSale from "./components/validator/ValidateSale/ValidateSale";
import ValidateReward from "./components/validator/ValidateReward/ValidateReward";
import ValidationHistory from "./components/validator/ValidationHistory/ValidationHistory";

import RequireAuth from "./components/auth/RequireAuth";

const ROLES = {
  User: 2001,
  Admin: 5150,
  Validator: 1984,
};

function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="termsandconditions" element={<TermsAndConditions />} />

      {/* rutas user */}
      <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
        <Route path="/" element={<Home />} />
        <Route path="/user/Prizes" element={<Prizes />} />
        <Route path="/user/LoadedSales" element={<LoadedSales />} />
        <Route path="/user/NewSale" element={<NewSale />} />
        <Route path="/user/RedeemPoints" element={<RedeemPoints />} />
      </Route>
      {/* rutas validator */}
      <Route element={<RequireAuth allowedRoles={[ROLES.Validator]} />}>
        <Route path="/validator" element={<Validator />} />
        <Route path="/validator/ValidateSale" element={<ValidateSale />} />
        <Route path="/validator/ValidateReward" element={<ValidateReward />} />
        <Route
          path="/validator/ValidationHistory"
          element={<ValidationHistory />}
        />
      </Route>

      {/* rutas admin y validator */}
      <Route
        element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Validator]} />}
      >
      </Route>
    </Routes>
  );
}

export default App;
