import { Link } from "react-router-dom";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";
function Home() {
  return (
    <>
      <section className="heading">
        <h1>A Dentist Booking System</h1>
      </section>
      <Link to="/new-ticket" className="btn btn-reverse btn-block">
        <FaQuestionCircle />
        Create New Appointment
      </Link>
      <Link to="/tickets" className="btn btn-block">
        <FaTicketAlt />
        View My Appointment
      </Link>
    </>
  );
}
export default Home;
