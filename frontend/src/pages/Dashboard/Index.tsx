import { Helmet } from "react-helmet-async";
import ListingsTable from "../../components/ListingTable";
import QuotesTable from "../../components/QuotesTable";
import CreateQuoteButton from "../../components/ui/CreateQuoteButton";
import { useProfile } from "../../context/ProfileContext";

export default function Blank() {
  const { profile } = useProfile();
  
  return (
  <div>
    <Helmet>
    <title>CSCI334 | Dashboard</title>
    </Helmet>
    
    <h2 className="text-xl font-medium mb-4">My Listings</h2>
    
    <div className="mb-10">
    <ListingsTable />
    </div>

    <div>
    <h2 className="text-xl font-medium mb-4">My Quotes</h2>

    {profile?.role === "soleTrader" && (
      <CreateQuoteButton />
    )}
    <QuotesTable />
    </div>
  </div>
  );
}
