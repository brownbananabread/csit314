import { Helmet } from "react-helmet-async";
import SearchEvents from "../../components/SearchEventsTable";

export default function Blank() {
  
  return (
  <div>
    <Helmet>
    <title>CSCI334 | Dashboard</title>
    </Helmet>

    <h2 className="text-xl font-medium mb-4">
      Upcoming Events
    </h2>

    <div className="mb-10">
      <SearchEvents />
    </div>

  </div>
  );
}
