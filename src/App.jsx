import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Tile from './Tile'
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function App() {
    const [ipInput, setIpInput] = useState('')
    const [trigger, setTrigger] = useState(null)

    function useIpify() {
        const { data } = useSWR(
            trigger
            ? `https://geo.ipify.org/api/v2/country,city?apiKey=at_8KaX4LwutCt36W8ku92leYw4DzcbZ&ipAddress=${trigger}`
            : `https://geo.ipify.org/api/v2/country,city?apiKey=at_8KaX4LwutCt36W8ku92leYw4DzcbZ&ipAddress`
            , fetcher
        );

        return { data };
    }
    const { data } = useIpify()

    return (
        <>
            <main className='pt-6 text-center font-rubik bg-[url(../images/pattern-bg-mobile.png)] sm:bg-[url(../images/pattern-bg-desktop.png)] bg-no-repeat text-lg min-h-screen flex flex-col'>
                <h1 className='text-white font-semibold text-3xl my-6'>IP Address Tracker</h1>

                <div className='m-6 mx-8'>
                    <div className='rounded-xl bg-white flex justify-start md:justify-between overflow-hidden focus-within:outline-1 shadow md:max-w-lg mx-auto '>
                        <input 
                            type="text" 
                            placeholder='Search for any IP address or domain' 
                            className='bg-white p-2 pl-4 focus:outline-none w-10/12 md:w-full'
                            onChange={(e) => setIpInput(e.target.value) }
                        />
                        <button 
                            onClick={() => setTrigger(ipInput)}
                            className='bg-black text-white text-center font-bold w-2/12 py-3.5 px-3 hover:bg-very-dark-grey active:bg-dark-grey md:max-w-12'
                        >
                            {'>'} 
                        </button>
                    </div>
                    {data && data.ip != undefined ?
                        (<div className="card max-lg:m-6 max-lg:mx-8 max-md:max-w-xl absolute z-1001 left-0 right-0 text-center shadow border border-slate-100 bg-white rounded-xl mt-6 p-3 py-5 text-very-dark-grey md:grid md:grid-cols-4 md:text-left md:max-w-3xl lg:max-w-5xl md:mx-auto md:py-0 md:p-4 md:pr-24">
                        
                                <>
                                    <Tile span={'Ip Address'} text={data.ip}/>
                                    <Tile span={'Location'} text={`${data.location.city}, ${data.location.region}`}/>
                                    <Tile span={'Timezone'} text={data.location.timezone + ' UTC'}/>
                                    <Tile span={'ISP'} text={data.isp} extraClass={'md:border-r-0'}/>
                                </>
                        </div>)
                        :
                        (
                            <div className="card max-lg:m-6 max-lg:mx-8 max-md:max-w-xl absolute z-1001 left-0 right-0 text-center shadow border border-slate-100 bg-white rounded-xl mt-6 p-3 py-5 text-very-dark-grey md:text-left md:max-w-3xl lg:max-w-5xl md:mx-auto md:py-0 md:p-4 md:pr-24">
                                <p className="text-4xl font-bold text-center p-10">{data?.messages}</p>
                            </div>
                        )
                    }   
                </div>

                <div id='map' className="map w-full relative mt-16 flex-1 flex"> {/** flex-1 so that it takes up the remaining space */}
                    {data && data.ip != undefined && (
                        <MapContainer center={[data.location.lat, data.location.lng]} zoom={13} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        
                        <Marker position={[data.location.lat, data.location.lng]}>
                            <Popup>
                            This is where you are
                            </Popup>
                        </Marker>
                    </MapContainer>
                    )} 


                </div>
            </main>
        </>
    )
}

export default App
