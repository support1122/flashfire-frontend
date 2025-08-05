import React, { useEffect, useState } from "react";
import { us_cities, first_names, actions, products } from "../utils/PopupNotifications.js";
import { Dot, RadioTower } from "lucide-react";

export default function SalesPopup() {
  const generateNotification = () => {
    const [city, state, lat, lng] = us_cities[Math.floor(Math.random() * us_cities.length)];
    const name = first_names[Math.floor(Math.random() * first_names.length)];
    const action = actions[Math.floor(Math.random() * actions.length)];
    const product = products[Math.floor(Math.random() * products.length)];
    const time = `about ${Math.floor(Math.random() * 59) + 1} minutes ago`;
    const mapImg = `https://maps.locationiq.com/v3/staticmap?key=pk.03e54e0b1648fefc435ddeaaccdbf1e6&center=${lat},${lng}&zoom=150&size=600x400&format=png&maptype=streets`;

    return { name, location: `${city}, USA`, action, product, time, mapImg };
  };

  const [visibleSales, setVisibleSales] = useState(false);
  const [visibleOptimizer, setVisibleOptimizer] = useState(false);
  const [visibleVisitors, setVisibleVisitors] = useState(false);
  const [current, setCurrent] = useState(generateNotification());
  const [visitors, setVisitors] = useState(() => 300 + Math.floor(Math.random() * 300));

  useEffect(() => {
    const showSequence = () => {
  // Show Sales Notification
  setCurrent(generateNotification());
  setVisibleSales(true);
  setTimeout(() => {
    setVisibleSales(false);
  }, 3000); // hide after 3s

  // After 15s, show Optimizer Notification
  setTimeout(() => {
    setVisibleOptimizer(true);
    setTimeout(() => {
      setVisibleOptimizer(false);
    }, 3000); // hide after 3s
  }, 15000);

  // After 30s, show Visitor Count
  setTimeout(() => {
    setVisitors(100 + Math.floor(Math.random() * 151));
    setVisibleVisitors(true);
    setTimeout(() => {
      setVisibleVisitors(false);
    }, 3000); // hide after 3s
  }, 30000);
};

// Run first sequence immediately
showSequence();

// Then every 45 seconds (15s gap between each type * 3)
const interval = setInterval(showSequence, 45000);

return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Sales Popup */}
      <div
        className={`fixed bottom-6 left-6 bg-white shadow-lg border border-gray-200 rounded-lg p-3 w-80 flex items-center gap-3 transition-all duration-500 ${
          visibleSales ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
        }`}
        style={{ zIndex: 9999 }}
      >
        <img src={current.mapImg} alt="map" className="w-14 h-14 rounded-md object-cover" />
        <div className="flex flex-col text-sm">
          <span className="font-medium">
            {current.name} from {current.location}
          </span>
          <span>
            {current.action}{" "}
            <span className="text-gray-500 font-semibold">{current.product}</span>
          </span>
          <span className="text-gray-500 text-xs">{current.time}</span>
        </div>
      </div>

      {/* Optimizer Popup */}
      <div
  className={`fixed bottom-6 left-6 bg-white shadow-lg border border-gray-200 rounded-lg p-4 w-80 flex items-center gap-3 transition-all duration-500 ${
    visibleOptimizer ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
  }`}
  style={{ zIndex: 9998 }}
>
  <div className="bg-yellow-100 text-yellow-600 rounded-full p-2 text-xl">
    💡
  </div>
  <div className="flex flex-col text-sm">
    <span className="font-medium text-gray-800">Try our AI Optimizer</span>
    <span className="text-gray-500">Boost your resume instantly — it's free!</span>
  </div>
</div>


      {/* Visitor Count Popup */}
      <div
  className={`fixed bottom-6 left-6 bg-white shadow-lg border border-gray-200 rounded-lg p-4 w-80 flex items-center gap-3 transition-all duration-500 ${
    visibleVisitors ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
  }`}
  style={{ zIndex: 9997 }}
>
  <div className="bg-green-100 text-green-600 rounded-full p-2 text-xl">
    🟢
  </div>
  <div className="flex flex-col text-sm">
    <span className="font-medium text-gray-800">
      {visitors} users online
    </span>
    <span className="text-gray-500">
      exploring FlashFireJobs right now
    </span>
  </div>
</div>

    </>
  );
}
