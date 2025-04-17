

export default function CreateQuoteButton() {
    return (
        <div className="flex justify-end mb-4">
            <button
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                onClick={() => alert("Create Quote Button Clicked")}
            >
                Create Quote
            </button>
        </div>
    )
}