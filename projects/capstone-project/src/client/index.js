import { handleSubmit } from "./js/formHandler";
import { getLocationData } from "./js/processData";
import { checkDate } from "./js/processData";
import { getForecastData } from "./js/processData";
import { getPhoto } from "./js/processData";
import { updateTripInformation } from "./js/updatePageContents";
import { updateCountdown } from "./js/updatePageContents";
import { setInvalidTravelDate } from "./js/updatePageContents";

// note to self: do not alphabetize these
import "./styles/resets.scss";
import "./styles/base.scss";
import "./styles/form.scss";
import "./styles/header.scss";
import "./styles/footer.scss";

export {
  checkDate,
  getForecastData,
  getLocationData,
  getPhoto,
  handleSubmit,
  setInvalidTravelDate,
  updateCountdown,
  updateTripInformation,
};
