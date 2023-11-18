import CustomBreadcrumbs from "../../../Components/CustomBreadcrumbs/CustomBreadcrumbs";
import Stats from "../../../Components/Stats/Stats";
import todaysSales from "../../../assets/icons/sales.png";
import lastWeek from "../../../assets/icons/sales2.png";
import thisMonth from "../../../assets/icons/sales3.png";
const Analytics = () => {
  return (
    <>
      <CustomBreadcrumbs />
      <div className="flex justify-center md:justify-start gap-3 md:gap-10 flex-wrap mt-5">
        <Stats title="Today" amount={20} image={todaysSales} />
        <Stats title="Last 7 days" amount={20} image={lastWeek} />
        <Stats title="This month" amount={20} image={thisMonth} />
      </div>
    </>
  );
};

export default Analytics;
