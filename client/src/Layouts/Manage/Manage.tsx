import { useState } from "react";
import {
  Drawer,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { Link, Outlet } from "react-router-dom";
import NavbarManage from "./NavbarManage";
import ActiveLink from "../../Components/ActiveLink/ActiveLink";
import { FaChartBar } from "react-icons/fa";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { ContainerMax } from "../../Components/Containers/ContainerMax";
import { useSelector } from "react-redux";
import { FcSalesPerformance } from "react-icons/fc";
const Manage = () => {
  const { user } = useSelector((state: any) => state.user);
  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  return (
    <>
      <div className="w-full min-h-screen h-full bg-teal-50">
        <NavbarManage openDrawer={openDrawer} />
        <Drawer open={open} onClose={closeDrawer}>
          <div className="mb-2 flex items-center justify-between p-4">
            <Typography
              as="h2"
              className="mr-4 cursor-pointer py-1.5 font-Knewave font-bold text-base md:text-2xl select-none"
            >
              <Link to="/">
                {" "}
                <span>AF</span> <span className="text-red-400">Sweets</span>
              </Link>
            </Typography>
            <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </IconButton>
          </div>
          <List>
            {user.user_role === "owner" ? (
              <>
                <ActiveLink to="/manage/analytics">
                  <ListItem>
                    <ListItemPrefix>
                      <FaChartBar />
                    </ListItemPrefix>
                    Analytics
                  </ListItem>
                </ActiveLink>
                <ActiveLink to="/manage/add-new-sweet">
                  <ListItem>
                    <ListItemPrefix>
                      <BiSolidMessageSquareAdd />
                    </ListItemPrefix>
                    Add new sweet
                  </ListItem>
                </ActiveLink>
              </>
            ) : (
              ""
            )}
            <ActiveLink to="/manage/add-sales">
              <ListItem>
                <ListItemPrefix>
                  <FcSalesPerformance />
                </ListItemPrefix>
                Add Sales
              </ListItem>
            </ActiveLink>
            <ListItem>
              <ListItemPrefix>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </ListItemPrefix>
              Profile
            </ListItem>
          </List>
        </Drawer>
        <ContainerMax>
          <div>
            <Outlet />
          </div>
        </ContainerMax>
      </div>
    </>
  );
};

export default Manage;
