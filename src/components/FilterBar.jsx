import React from "react";

const FilterBar = ({
  typeFilter,
  setTypeFilter,
  priorityFilter,
  setPriorityFilter,
}) => {
  return (
    <div className="px-4 pt-3 md:px-6 pt-0.2 pb-0.2">
      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 md:px-4 py-2 shadow-sm flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 md:gap-5">
          {/* type filter */}
          <div className="flex items-center gap-1.5 md:gap-2">
            <label
              htmlFor="type-filter"
              className="hidden md:block text-[11px] font-bold text-gray-400 uppercase tracking-wider"
            >
              TÜR:
            </label>
            <div className="relative">
              <select
                id="type-filter"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="appearance-none bg-white  dark:bg-gray-700 border border-gray-200 dark:border-gray-700  text-gray-700 dark:text-gray-200 text-xs font-semibold rounded-lg pl-2.5 md:pl-3 pr-7 md:pr-8 py-1.5 focus:bg-white dark:focus:bg-gray-800 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-800  transition-all cursor-pointer outline-none"
              >
                <option value="all">Tümü</option>
                <option value="task">Görev</option>
                <option value="bug">Bug</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 md:px-2 text-gray-400">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>

          {/* priority filte <3*/}
          <div className="flex items-center gap-1.5 md:gap-2">
            <label
              htmlFor="priority-filter"
              className="hidden md:block text-[11px] font-bold text-gray-400 uppercase tracking-wider"
            >
              ÖNCELİK:
            </label>
            <div className="relative">
              <select
                id="priority-filter"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="appearance-none bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-700 text-gray-700  dark:text-gray-200 text-xs font-semibold rounded-lg pl-2.5 md:pl-3 pr-7 md:pr-8 py-1.5 focus:bg-white dark:focus:bg-gray-800 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-800 transition-all cursor-pointer outline-none"
              >
                <option
                  value="all"
                  className={priorityFilter === "all" ? "hidden md:block" : ""}
                >
                  {priorityFilter === "all" ? "Öncelik" : "Tümü"}
                </option>
                <option value="low">Düşük</option>
                <option value="mid">Orta</option>
                <option value="high">Yüksek</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 md:px-2 text-gray-400">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {(typeFilter !== "all" || priorityFilter !== "all") && (
          <button
            onClick={() => {
              setTypeFilter("all");
              setPriorityFilter("all");
            }}
            title="Filtreleri Temizle"
            className="p-1.5 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg font-semibold transition-colors cursor-pointer flex items-center gap-1 text-xs"
          >
            {/* Mobilde Görünecek Filtre Kaldırma İkonu */}
            <svg
              className="w-4 h-4 md:hidden"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6"
              />
            </svg>

            <span className="hidden md:inline">Filtreleri Temizle</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
