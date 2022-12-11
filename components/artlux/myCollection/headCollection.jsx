const HeadCollection = () => {
  return (
    <section className=" flex items-center min-h-[50vh] justify-center bg-white">
      <div className="mx-auto max-w-[43rem]">
        <div className="text-center">
          <p className="text-lg font-medium leading-8 text-indigo-600/95"></p>
          <h1 className="mt-3 text-[3.5rem] font-bold leading-[4rem] tracking-tight text-black">
            My Collections
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-400">
            Create, curate, and manage collections of unique NFTs to share and
            sell.
          </p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <a
            href="/collection/create"
            className="transform rounded-md bg-indigo-600/95 px-5 py-3 font-medium text-white transition-colors hover:bg-indigo-700">
            Create A Collection
          </a>
          <a
            href="/collection/explore_collection"
            className="transform rounded-md border border-slate-200 px-5 py-3 font-medium text-slate-900 transition-colors hover:bg-slate-50">
            {" "}
            Explore All Collections{" "}
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeadCollection;
