import { TwoTabBtnProps } from '@/app/types/Buttons';

export default function TwoTabBtn({
  tab1,
  tab2,
  isFirstTab,
  setIsFirstTab,
}: TwoTabBtnProps) {
  const tabs = [
    { name: tab1, active: isFirstTab, onClick: () => setIsFirstTab(true) },
    { name: tab2, active: !isFirstTab, onClick: () => setIsFirstTab(false) },
  ];

  return (
    <div className="flex justify-around gap-3 mb-5">
      {tabs.map((tab, index) => (
        <div
          key={index}
          className="grow p-1 cursor-pointer"
          onClick={tab.onClick}
        >
          <h1
            className={`text-3xl font-bold rounded-lg transition-all duration-500 ease-in-out ${
              tab.active ? 'left text-white' : 'right'
            }`}
          >
            {tab.name}
          </h1>
        </div>
      ))}
    </div>
  );
}
