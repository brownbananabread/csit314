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

interface Event {
  eventId: number;
  organiser: number;
  title: string;
  description: string;
  eventType: string;
  status: "upcoming" | "completed" | "cancelled";
  location: string;
  date: string; // ISO string format
  createdAt: string; // ISO string format
}

export default function EventsTable() {
  const [eventsData, setEventsData] = useState<Event[]>([]);
  const [, setIsLoading] = useState(true);

  // Fetch data when component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const { body, status } = await fetchRequest({
          method: "GET",
          url: "http://localhost:5174/api/events",
        });
        console.log("Fetched events:", body);

        if (status === 200) {
          setEventsData(body);
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
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
                  "Event ID",
                  "Organiser ID",
                  "Title",
                  "Description",
                  "Event Type",
                  "Status",
                  "Location",
                  "Date",
                  "Created At",
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
              {eventsData.map((event) => (
                <TableRow key={event.eventId}>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {event.eventId}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {event.organiser}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {event.title}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {event.description}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {event.eventType}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        event.status === "completed"
                          ? "success"
                          : event.status === "cancelled"
                          ? "error"
                          : "warning"
                      }
                    >
                      {event.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {event.location}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {new Date(event.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {new Date(event.createdAt).toLocaleString()}
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
