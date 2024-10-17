export default function Reservation({ name, landowner, start, end, address, image }) {
    // Convert timestamps to 'Month Day, Year' format
    const formattedStartDate = new Date(start).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
    });
    const formattedEndDate = new Date(end).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    return (
        <section className="border-y-gray-500 border-1 mb-3 w-80 bg-white">

            <img src={image} alt="Listing" className="w-full h-auto" />

            <div className="p-3">
                <h2 className="text-xl font-bold">{name}</h2>
                <p>Listed by: {landowner}</p>
            </div>

            <div class="flex items-center border-y border-black p-3">

                <div className="w-2/4 border-r border-black m-1">
                    <p>{formattedStartDate} - </p>
                    <p>{formattedEndDate}</p>
                </div>

                <div className="w-2/4 px-2">

                    <p>{address}</p>
                </div>
            </div>
            <div className="text-center p-5">
                <button className="text-teal-600 text-xl font-bold text-center">View Details</button>
            </div>
        </section >
    );
}