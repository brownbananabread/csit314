import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "./ui/Table";

import { fetchRequest } from "../utils/fetchRequest";
import Badge from "./ui/Badge";
import { useState, useEffect } from "react";

interface Listing {
  listingId: number;
  customerId: number;
  title: string;
  description: string;
  price: number;
  location: string;
  category: string;
  serviceRequired?: string;
  status?: string;
}

export default function MyListingsTable() {
  const [listingsData, setListingsData] = useState<Listing[]>([]);
  const [, setIsLoading] = useState(true);

  // Fetch data when component mounts
  useEffect(() => {
    const fetchListings = async () => {
      try {
        setIsLoading(true);
        const { body, status } = await fetchRequest({
          method: "GET",
          url: "http://localhost:5174/api/listings",
        });
        console.log("Fetched listings:", body);
        
        if (status === 200) {
          setListingsData(body);
        }
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {["ID", "CustomerID", "Title", "Description", "Service", "Status", "Location"].map((column) => (
                  <TableCell
                    key={column}
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>
  
            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {listingsData.map((listing) => (
                <TableRow key={listing.listingId}>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {listing.listingId}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {listing.customerId}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {listing.title}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {listing.description}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {listing.serviceRequired}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={listing.status === "complete" ? "success" : "warning"}
                    >
                      {listing.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {listing.location}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
