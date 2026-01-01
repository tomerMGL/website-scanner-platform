import { useScan } from "./WebScanContext";

export default function FailedScan({ onInit }) {
  const { scanData, resetScanData } = useScan();

  const onInitHandler = () => {
    resetScanData();
    onInit();
  }
  return (
    <section className="text-4xl text-white flex flex-col justify-center items-center text-center gap-5">

      {scanData.errorMsg && (
        <div className="w-11/12 text-xl flex flex-col items-center justify-center gap-5 mt-20">
          <h2 className="text-2xl">{scanData.errorMsg.title}</h2>
          <p className="">{scanData.errorMsg.content}</p>
          <button
          className="w-full md:w-2/6 h-12 flex justify-center items-center rounded-full bg-[#A9661C] relative text-xl"
          onClick={onInitHandler}
        >
          {scanData.errorMsg.cta}
        </button>
        </div>
      )}
    </section>
  );
}
