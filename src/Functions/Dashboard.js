import React from 'react';
import MainPanel from '../components/MainPanel';
import { getUser, removeUserSession } from '../Utilities/Common';
 
function Dashboard(props) {
  const user = getUser();
 
  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  }
 
  return (
    <div>
      Welcome {user.username}!<br /><br />
      <MainPanel/>
      {/* <input type="button" onClick={handleLogout} value="Logout" /> */}
    </div>
  );
}
 
export default Dashboard;