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

interface Ticket {
  ticketId: number;
  eventId: number;
  customerId: number;
  ticketType: "free" | "standard" | "premium";
  status: "rejected" | "registered" | "payment_pending" | "confirmed";
  price: number;
  purchaseDate: string; // ISO string format
  notes: string | null;
}

export default function TicketsTable() {
  const [ticketsData, setTicketsData] = useState<Ticket[]>([]);
  const [, setIsLoading] = useState(true);

  // Fetch data when component mounts
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setIsLoading(true);
        const { body, status } = await fetchRequest({
          method: "GET",
          url: "http://localhost:5174/api/tickets",
        });
        console.log("Fetched tickets:", body);

        if (status === 200) {
          setTicketsData(body);
        }
      } catch (error) {
        console.error("Failed to fetch tickets:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {[
                  "Ticket ID",
                  "Event ID",
                  "Customer ID",
                  "Ticket Type",
                  "Status",
                  "Price",
                  "Purchase Date",
                  "Notes",
                ].map((column) => (
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
              {ticketsData.map((ticket) => (
                <TableRow key={ticket.ticketId}>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {ticket.ticketId}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {ticket.eventId}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {ticket.customerId}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {ticket.ticketType}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        ticket.status === "confirmed"
                          ? "success"
                          : ticket.status === "rejected"
                          ? "error"
                          : "warning"
                      }
                    >
                      {ticket.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    ${ticket.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {new Date(ticket.purchaseDate).toLocaleString()}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {ticket.notes || "N/A"}
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
