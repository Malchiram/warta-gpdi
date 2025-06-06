"use client";
import { setMinistry } from "@/libs/redux/ministryroster";
import { setScrollTarget } from "@/libs/redux/scroll";
import { RootState } from "@/libs/store/store";
import { CalendarIcon, HomeIcon, UsersIcon } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
interface ScheduleInterface {
  title: string;
  date: string;
  time?: string;
  keluarga?: string;
  location: string;
  onClickCustom?: () => void;
}
export interface PetugasIbadah {
  tanggal: string;
  ibadah_raya: string;
  wl: string;
  singer_1: string;
  singer_2: string;
  musik_1: string;
  musik_2: string;
  musik_3: string;
  kolektan_1: string;
  kolektan_2: string;
  tamborine_1: string;
  tamborine_2: string;
  multimedia_1: string;
  multimedia_2: string;
  pendoa_syafaat_1: string;
  pendoa_syafaat_2: string;
  penerima_tamu_1: string;
  penerima_tamu_2: string;
  pembaca_warta: string;
  perjamuan_1?: string;
  perjamuan_2?: string;
  perjamuan_3?: string;
  perjamuan_4?: string;
}

export interface Event {
  ID: number;
  eventName: string;
  event: EventDetail;
  dateEvent: string;
  komsel?: Komsel[];
}

export interface EventDetail {
  wl: string;
  singer: string[];
  music: string[];
  usher?: string[];
  kolekte: string[];
  pendoaSyafaat?: string[];
  multimedia: string[];
  tamborin?: string[];
  pembacaWarta?: string;
  perjamuan?: string[];
}

export interface Komsel {
  name: string;
  keluarga: string;
  dateKomsel: string;
  wl: string;
  music: string;
  alamat: string;
}

export const getTitle = (data: string) => {
  switch (data) {
    case "ibadahPagi":
      return "IBADAH I";
    case "ibadahSiang":
      return "IBADAH II";
    case "ibadahSore":
      return "IBADAH III";
    case "pemuda":
      return "Youth Service";
    default:
      return `Komsel ${data}`;
  }
};
function ScheduleCard({
  title,
  date,
  time,
  keluarga,
  location,
  onClickCustom,
}: ScheduleInterface) {
  return (
    <div
      onClick={onClickCustom}
      className=" min-h-44 flex flex-col cursor-pointer justify-between bg-gradient-to-br from-white to-blue-100 rounded-lg p-6 shadow-md border border-blue-200 hover:shadow-xl transition duration-300"
    >
      <div className="flex justify-between   items-start mb-4">
        <div>
          <h3 className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-indigo-800">
            {title}
          </h3>
          <p className="text-gray-600">{date}</p>
        </div>
        <span className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium">
          {time}
        </span>
      </div>
      {keluarga && keluarga !== "" && (
        <h4 className="text-base font-medium mb-2 text-gray-800">{keluarga}</h4>
      )}
      <p className="text-gray-600  flex items-center ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-1 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        {location}
      </p>
    </div>
  );
}

type Bulan =
  | "januari"
  | "februari"
  | "maret"
  | "april"
  | "mei"
  | "juni"
  | "juli"
  | "agustus"
  | "september"
  | "oktober"
  | "november"
  | "desember";

const bulanMap: { [key in Bulan]: string } = {
  januari: "January",
  februari: "February",
  maret: "March",
  april: "April",
  mei: "May",
  juni: "June",
  juli: "July",
  agustus: "August",
  september: "September",
  oktober: "October",
  november: "November",
  desember: "December",
};

export default function WorshipSchedules({ data, ibadahData }: { data: Event[], ibadahData:PetugasIbadah[] }) {
  const dataMinistry = useSelector((state: RootState) => state.ministry);
  const dispatch = useDispatch();
  // const today = new Date()
  const today = new Date().getTime();
 
  function formatDate(str: string): Date {
    const [tanggal, bulan, tahun] = str.toLowerCase().split(" ") as [
      string,
      Bulan,
      string
    ];
    const bulanInggris = bulanMap[bulan];
    return new Date(`${tanggal} ${bulanInggris} ${tahun}`);
  }
   const komselData = data
    .map((a) => a.komsel || [])
    .flat()
    .filter((komsel) => {
      const komselDate = formatDate(komsel.dateKomsel);
      return komselDate.setHours(23, 59, 59, 999) >= today;
    })
    .sort((a, b) => {
      const firstDate = formatDate(a.dateKomsel);
      const secondDate = formatDate(b.dateKomsel);
      return firstDate.getTime() - secondDate.getTime();
    });

  useEffect(() => {
    if ( ibadahData) {
      dispatch(
        setMinistry({
          activeTab: "umum",
          ministry: ibadahData.filter(
            (a) =>
               formatDate(a?.tanggal).setHours(23, 59, 59, 999) >= today
          )[0],
          dateEvent: ibadahData.filter(
            (a) =>
               formatDate(a?.tanggal).setHours(23, 59, 59, 999) >= today
          )[0].tanggal,
          eventName: ibadahData.filter(
            (a) =>
               formatDate(a?.tanggal).setHours(23, 59, 59, 999) >= today
          )[0].ibadah_raya,
        })
      );
    }
  }, [ibadahData]);
  const tabStyle = (isActive: boolean) =>
    `flex items-center px-4 py-2 rounded-md mx-1 mb-2 cursor-pointer z-20 transition duration-300 ${
      isActive
        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md "
        : "bg-gray-100 text-gray-500 hover:bg-gray-300 "
    }`;
  return (
    <section
      id="jadwal"
      className="py-12 md:py-16 bg-gradient-to-b from-white via-blue-50 to-white"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-indigo-800">
          Jadwal Ibadah
        </h2>
        <div className="flex flex-wrap justify-center mb-8">
          <button
            className={tabStyle(dataMinistry.activeTab === "umum")}
            onClick={() => {
              dispatch(
                setMinistry({
                  activeTab: "umum",
                  ministry: data.filter(
                    (a) =>
                      ["ibadahPagi", "ibadahSiang", "ibadahSore"].includes(
                        a.eventName
                      ) &&
                      formatDate(a.dateEvent).setHours(23, 59, 59, 999) >= today
                  )[0].event,
                  dateEvent: data.filter(
                    (a) =>
                      ["ibadahPagi", "ibadahSiang", "ibadahSore"].includes(
                        a.eventName
                      ) &&
                      formatDate(a.dateEvent).setHours(23, 59, 59, 999) >= today
                  )[0].dateEvent,
                  eventName: data.filter(
                    (a) =>
                      ["ibadahPagi", "ibadahSiang", "ibadahSore"].includes(
                        a.eventName
                      ) &&
                      formatDate(a.dateEvent).setHours(23, 59, 59, 999) >= today
                  )[0].eventName,
                })
              );
            }}
          >
            <CalendarIcon className="h-4 w-4 mr-2" />
            Ibadah Umum
          </button>
          {data.filter(
            (a) =>
              a.eventName === "pemuda" &&
              formatDate(a.dateEvent).setHours(23, 59, 59, 999) >= today
          ).length > 0 && (
            <button
              className={tabStyle(dataMinistry.activeTab === "pemuda")}
              onClick={() =>
                dispatch(
                  setMinistry({
                    activeTab: "pemuda",
                    ministry: data.filter(
                      (a) =>
                        a.eventName === "pemuda" &&
                        formatDate(a.dateEvent).setHours(23, 59, 59, 999) >=
                          today
                    )[0].event,
                    dateEvent: data.filter(
                      (a) =>
                        a.eventName === "pemuda" &&
                        formatDate(a.dateEvent).setHours(23, 59, 59, 999) >=
                          today
                    )[0].dateEvent,
                    eventName: data.filter(
                      (a) =>
                        a.eventName === "pemuda" &&
                        formatDate(a.dateEvent).setHours(23, 59, 59, 999) >=
                          today
                    )[0].eventName,
                  })
                )
              }
            >
              <UsersIcon className="h-4 w-4 mr-2" />
              Ibadah Pemuda
            </button>
          )}
          <button
            className={tabStyle(dataMinistry.activeTab === "keluarga")}
            onClick={() => {
              dispatch(
                setMinistry({
                  activeTab: "keluarga",
                  ministry: komselData[0],
                  dateEvent: komselData[0].dateKomsel,
                  eventName: komselData[0].name,
                })
              );
            }}
          >
            <HomeIcon className="h-4 w-4 mr-2" />
            Ibadah Komsel
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dataMinistry.activeTab === "umum" && (
            <>
              {ibadahData.map((e, i) => (
                  <ScheduleCard
                    key={i}
                    title={e.ibadah_raya}
                    date={e.tanggal}
                    time={
                      e.ibadah_raya === "Ibadah I"
                        ? "06:00 WIB"
                        : e.ibadah_raya === "Ibadah II"
                        ? "10:00 WIB"
                        : e.ibadah_raya === "Ibadah III"
                        ? "17:00 WIB"
                        : ""
                    }
                    // theme="Hidup dalam Kasih Kristus"
                    location="GPdI Shekinah Graha Harapan"
                    onClickCustom={() => {
                      dispatch(
                        setMinistry({
                          activeTab: "umum",
                          dateEvent: e.tanggal,
                          ministry:e,
                          eventName: e.ibadah_raya,
                        })
                      );
                      dispatch(setScrollTarget("pelayanan"));
                    }}
                  />
                ))}
            </>
          )}
          {dataMinistry.activeTab === "pemuda" && (
            <>
              {data
                .filter(
                  (a) =>
                    a.eventName === "pemuda" &&
                    formatDate(a.dateEvent).setHours(23, 59, 59, 999) >= today
                )
                .map((e, i) => (
                  <ScheduleCard
                    key={i}
                    title={e.eventName}
                    date={e.dateEvent}
                    time="19:00 WIB"
                    location="GPdI Shekinah Graha Harapan"
                    onClickCustom={() => {
                      dispatch(
                        setMinistry({
                          activeTab: "pemuda",
                          ministry: e.event,
                          dateEvent: e.dateEvent,
                          eventName: e.eventName,
                        })
                      );
                    }}
                  />
                ))}
            </>
          )}
          {dataMinistry.activeTab === "keluarga" && (
            <>
              {komselData.map((e, i) => (
                <ScheduleCard
                  key={i}
                  title={e.name}
                  date={e.dateKomsel}
                  // time="19:00 WIB"
                  keluarga={e.keluarga}
                  location={e.alamat}
                  onClickCustom={() => {
                    dispatch(
                      setMinistry({
                        activeTab: "keluarga",
                        ministry: e,
                        dateEvent: e.dateKomsel,
                        eventName: e.name,
                      })
                    );
                  }}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
