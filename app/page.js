import UserDataForm from "../components/UserDataForm";
import CustomAttributesForm from "../components/CustomAttributesForm";
import TrackEventForm from "../components/TrackEventForm";
import TourForm from "../components/TourForm";
import BotButtons from "../components/BotButtons";
import ActionButtons from "../components/ActionButtons";

export default function Home() {
  return (
    <main className="about__display--row">
      <h1 style={{ textAlign: "center" }}>
        Intercom Test Site - NPM React installation
      </h1>
      <p style={{ textAlign: "center" }}>
        Please enter your details to log in to Intercom.
      </p>

      <div className="forms-container">
        <div className="form-column">
          <UserDataForm />
          <CustomAttributesForm />
          <ActionButtons />
        </div>

        <div className="form-column">
          <TrackEventForm />
          <TourForm />
        </div>
      </div>

      <BotButtons />
    </main>
  );
}
