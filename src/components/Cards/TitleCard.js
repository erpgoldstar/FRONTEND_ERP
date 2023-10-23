import Subtitle from "../Typography/Subtitle";

function TitleCard({ title, children, topMargin, TopSideButtons, SearchBar }) {
  return (
    <div
      className={
        "card w-full p-6 bg-base-100 shadow-xl " + (topMargin || "mt-6")
      }
    >
      {/* Title for Card */}
      <div
        className={`grid lg:grid-cols-${
          TopSideButtons ? 3 : 2
        } mt-2 md:grid-cols-${
          TopSideButtons ? 3 : 2
        } grid-cols-1 place-items-center gap-6`}
      >
        <h1 className="text-xl font-semibold">{title}</h1>

        {SearchBar && <>{SearchBar}</>}

        {/* Top side button, show only if present */}
        {TopSideButtons && <div className="">{TopSideButtons}</div>}
      </div>

      <div className="divider mt-2"></div>

      {/** Card Body */}
      <div className="h-full w-full pb-6 bg-base-100">{children}</div>
    </div>
  );
}

export default TitleCard;
