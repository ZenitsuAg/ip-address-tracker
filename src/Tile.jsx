export default function Tile({ span, text, extraClass }) {
    return (
        <div className="md:pl-4 md:my-7">
            <span className="text-[10px] md:text-sm font-bold tracking-widest uppercase text-dark-grey">
                {span}
            </span>
            <div className={`mx-auto md:border-r md:border-slate-300 md:min-h-14 md:flex justify-start items-center ${extraClass}`}>
                <h1 className="text-2xl md:max-xl:text-xl font-semibold ">{text}</h1>
            </div>
        </div>
    );
}
