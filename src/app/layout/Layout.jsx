import React, { useEffect , useState} from 'react'
import styles from '../../styles/layout.module.css'
import SideBar from '../sidebar/SideBar'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useDispatch } from '../../api/hook'
const Layout = () => {
  const [authToken, setAuthToken] = useState("");
  const [loaded, setLoaded] = useState(false);


  useEffect(() => {
    const authState = localStorage.getItem("authState");
    const token = authState ? JSON.parse(authState).accessToken : "";
    if(token) {
      setAuthToken(token);
    }
    setLoaded(true);
  }, [])
 


  return (
    <>
      {
        (
          loaded ? (
            (authToken) ? (
              <div style={{ display: "flex"}}>
              
                <SideBar/>
                <div className={styles.right}>
                  <Outlet />
                </div>
              </div>
            ) : (
              <Navigate to={"/login"} />
            )
          ): null
        )
      }
    </>
  )
}

export default Layout