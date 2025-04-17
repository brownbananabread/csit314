import { Helmet } from "react-helmet-async";
import MyEventsTable from "../../components/EventsTable";
import MyTicketsTable from "../../components/TicketsTable";
import { useProfile } from "../../context/ProfileContext";

export default function Blank() {
  const { profile } = useProfile();
  
  return (
  <div>
    <Helmet>
    <title>CSCI334 | Dashboard</title>
    </Helmet>

    {profile?.role === "organiser" ? (
      <>
      <h2 className="text-xl font-medium mb-4">
        My Organised Events
      </h2>
      </>
    ) : (
      <h2 className="text-xl font-medium mb-4">
      My Events
      </h2>
    )}

    <div className="mb-10">
      <MyEventsTable />
    </div>

    {profile?.role === "customer" ? (
      <div>
        <h2 className="text-xl font-medium mb-4">
          My Tickets
        </h2>
        <div className="mb-10">
          <MyTicketsTable />
        </div>
      </div>
    ) : null}
  </div>
  );
}
