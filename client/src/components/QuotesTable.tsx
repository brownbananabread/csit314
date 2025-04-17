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

interface Quote {
  quoteId: number;
  listingId: number;
  soleTraderId: number;
  customerId: number;
  description: string;
  price: number;
  date: string;
  status: string;
  createdAt: string;
}

export default function QuotesTable() {
  const [quotesData, setQuotesData] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data when component mounts
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        setIsLoading(true);
        const { body, status } = await fetchRequest({
          method: "GET",
          url: "http://localhost:5174/api/quotes",
        });
        console.log("Fetched quotes:", body);
        
        if (status === 200) {
          setQuotesData(body);
        }
      } catch (error) {
        console.error("Failed to fetch quotes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {["Quote ID", "Listing ID", "Trader ID", "Description", "Price", "Date", "Status"].map((column) => (
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
              {quotesData.map((quote) => (
                <TableRow key={quote.quoteId}>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {quote.quoteId}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {quote.listingId}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {quote.soleTraderId}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {quote.description}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    ${quote.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {new Date(quote.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        quote.status === "accepted" ? "success" : "warning"
                      }
                    >
                      {quote.status}
                    </Badge>
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
