import { AdjustmentsIcon } from "@heroicons/react/solid";

function Search({ search, setSearch }) {
  return (
    <div className="xl:max-w-[1140px] xl:min-w-[1000px] min-w-[300px] flex flex-grow flex-row items-center justify-center rounded-full bg-[#0D0D0D] border-2 border-gray-900 overflow-hidden p-2 pr-8 shadow-2xl">
      <div className="rounded-full h-5 w-5 animate-pulse border-4 flex-shrink-0 ml-2" />
      <input
        type="text"
        value={search}
        placeholder="Search music"
        onChange={(e) => setSearch(e.target.value)}
        className="bg-[#0D0D0D] focus:ring-0 outline-none border-0 text-gray-400 placeholder:text-gray-400 placeholder:tracking-widest w-full px-2 text-sm"
      ></input>
      <div className="flex flex-row items-center justify-center space-x-1 text-gray-400 cursor-pointer text-sm">
        <AdjustmentsIcon className="h-5 w-5" />
        <span>Filters</span>
      </div>
    </div>
  );
}
export default Search;
