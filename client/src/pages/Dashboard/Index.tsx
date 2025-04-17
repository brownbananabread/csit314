import { Helmet } from "react-helmet-async";
import ListingsTable from "../../components/ListingTable";
// import { useProfile } from "../../context/ProfileContext";

export default function Blank() {
  // const { profile } = useProfile();
  
  return (
  <div>
    <Helmet>
    <title>CSCI334 | Dashboard</title>
    </Helmet>
    
    <h2 className="text-xl font-medium mb-4">My Tickets</h2>
    
    <div className="mb-10">
    <ListingsTable />
    </div>
  </div>
  );
}
