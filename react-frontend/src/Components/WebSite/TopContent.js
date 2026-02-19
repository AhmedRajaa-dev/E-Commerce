import contentImg from "../../Assits/mike-petrucci-c9FQyqIECds-unsplash.jpg";
export default function TopContent() {
  return (
    <div className=" w-full md:h-[500px] flex items-center justify-around bg-black">
      <div className="bg-slate-400 text-center p-2 ">
        <h1 className="text-white text-3xl md:text-5xl font-bold mb-8">
          تشكيلة الصيف الجديدة
        </h1>
        <h3></h3>
        <button className=" bg-white text-black px-9   py-2.5 rounded-full font-medium hover:bg-orange-500 hover:text-white transition-all">
          Shop Now
        </button>
      </div>
      <div className="img w-96 h-96 bg-slate-900 rounded-3xl">
        <img
          src={contentImg}
          alt="contentImg"
          className="w-full h-full object-cover  transition-transform duration-700 hover:scale-105 cursor-pointer"
        />
      </div>
    </div>
  );
}
