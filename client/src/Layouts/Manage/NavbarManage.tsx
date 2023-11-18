import {
  Avatar,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Navbar,
} from "@material-tailwind/react";
import React from "react";
import { ContainerMax } from "../../Components/Containers/ContainerMax";
import { useDispatch, useSelector } from "react-redux";
import { FaBarsProgress } from "react-icons/fa6";
import { baseURL } from "../../Utils/utility";
import { clearUser } from "../../Redux/Features/User/userSlice";
const NavbarManage = ({
  openDrawer,
}: {
  openDrawer: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const signOut = async () => {
    try {
      await fetch(`${baseURL}/api/user/logout`, {
        method: "POST",
        credentials: "include",
      });
      dispatch(clearUser());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ContainerMax>
      <div className="pt-2">
        <Navbar className="sticky top-0 z-10 h-max w-full max-w-full px-4 py-2 lg:px-8 text-black rounded-md">
          <div className="flex justify-between items-center">
            <IconButton variant="gradient" onClick={openDrawer}>
              <FaBarsProgress />
            </IconButton>
            <Menu
              animate={{
                mount: { y: 0 },
                unmount: { y: 25 },
              }}
            >
              <MenuHandler>
                <Avatar
                  src={
                    user?.profile_pic
                      ? user?.profile_pic
                      : "https://i.ibb.co/hFyk81D/img-avatar.webp"
                  }
                  alt={user?.name}
                />
              </MenuHandler>
              <MenuList>
                <MenuItem>Menu Item 1</MenuItem>
                <MenuItem>Menu Item 2</MenuItem>
                <MenuItem onClick={signOut}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </div>
        </Navbar>
      </div>
    </ContainerMax>
  );
};

export default NavbarManage;
