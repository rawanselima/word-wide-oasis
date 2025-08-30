import { memo } from "react";

function Results({ icon, color, label, statics }) {
  const colorClasses = {
    blue: {
      text: "text-blue-800",
      bg: "bg-blue-800/15",
    },
    green: {
      text: "text-green-700",
      bg: "bg-green-700/15",
    },
    sky: {
      text: "text-sky-600",
      bg: "bg-sky-600/15",
    },
    orange: {
      text: "text-yellow-700",
      bg: "bg-yellow-400/15",
    },
  };

  return (
    <div className="flex items-center bg-white p-3 rounded border-2 border-gray-100">
      <div
        className={`mr-3 text-4xl ${colorClasses[color].text} ${colorClasses[color].bg}  p-3 rounded-full`}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 font-bold uppercase"> {label} </p>
        <p className="text-2xl text-gray-800 font-semibold"> {statics} </p>
      </div>
    </div>
  );
}

export default memo(Results);
