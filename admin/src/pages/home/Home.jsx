import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
// import Featured from "../../components/featured/Featured";
// import Chart from "../../components/chart/Chart";
// import Table from "../../components/table/Table";
const Home = () => {
  const [stats, setStats] = useState({
    users: 0,
    bus: 0
  })
  console.log(stats)
  useEffect(() => {
    const getStats = async () => {
      try{
        const response = await axios.get(`http://localhost:8800/api/commonroute/data-count`);
        setStats(response.data)
      }catch(err){  
        console.error(err);
      }
    }
    getStats();
  }, [])
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        {/* <Navbar /> */}
        <div className="widgets">
          <Widget type="user" count={stats.users}/>
          <Widget type="bus" count={stats.bus}/>
        </div>
        {/* <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div> */}
        {/* <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div> */}
      </div>
    </div>
  );
};

export default Home;
