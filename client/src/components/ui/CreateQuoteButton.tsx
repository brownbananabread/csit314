import Button from "../ui/Button";

export default function CreateQuoteButton() {
    return (
        <div className="flex justify-end">
            <Button className="w-20px flex items-center justify-center gap-2" size="sm">
                Create Event
            </Button>
        </div>
    );
}