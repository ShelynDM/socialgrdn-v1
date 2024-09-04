export default function Reservation({ name, landowner, start, end, address, image }) {
    return (
        <section className="border-y-gray-500 border-1 mb-3 w-80 bg-white">

            <img src={image} alt="Listing" className="w-full h-auto" />

            <div className="p-3">
                <h2 className="text-xl font-bold">{name}</h2>
                <p>Listed by: {landowner}</p>
            </div>

            <div class="flex items-center border-y border-black p-3">

                <div className="w-2/4 border-r border-black m-1">
                    <p>{start} - </p>
                    <p>{end}</p>
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
