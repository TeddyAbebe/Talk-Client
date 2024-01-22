import React, { useState } from "react";
import { TbUserSearch } from "react-icons/tb";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChatLoading from "../ChatLoading/ChatLoading";
import UserListItem from "../Users/UserListItem";
import { FaSearch } from "react-icons/fa";
import { getSender } from "../../Config/ChatLogics";
import NotificationBadge from "react-notification-badge/lib/components/NotificationBadge";
import { Effect } from "react-notification-badge";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    user,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
  } = ChatState();
  const toast = useToast();

  const logOutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter Something",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:5000/api/user?search=${search}`,
        config
      );

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/chat",
        {
          userId,
        },
        config
      );

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" w="100%">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          bg="#fff"
          w="90%"
          p="5px 10px 5px 10px"
          borderRadius={"lg"}
        >
          <Tooltip label="Search Users" hasArrow placement="left">
            <Button
              size={"sm"}
              variant="outline"
              colorScheme="facebook"
              onClick={onOpen}
            >
              <TbUserSearch />
              <Text display={{ base: "none", md: "flex" }} px="2">
                Search Users
              </Text>
            </Button>
          </Tooltip>

          <Text fontSize="2xl" fontFamily="Work sans" fontWeight="bold">
            Talk
          </Text>

          <div>
            <Menu>
              <MenuButton p={1}>
                <NotificationBadge
                  count={notification.length}
                  effect={Effect.SCALE}
                />
                <BellIcon fontSize="2xl" m={1} />
              </MenuButton>
              <MenuList pl={2}>
                {!notification.length && "No New Messages"}
                {notification.map((notify) => (
                  <MenuItem
                    key={notify._id}
                    onClick={() => {
                      setSelectedChat(notify.chat);
                      setNotification(notification.filter((n) => n !== notify));
                    }}
                  >
                    {notify.chat.isGroupChat
                      ? `New Message in ${notify.chat.chatName}`
                      : `New Message from ${getSender(
                          user,
                          notify.chat.users
                        )}`}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                colorScheme="facebook"
              >
                <Avatar
                  size="sm"
                  cursor="pointer"
                  name={user.name}
                  src={user.pic}
                />
              </MenuButton>

              <MenuList>
                <ProfileModal user={user}>
                  <MenuItem>My Profile</MenuItem>
                </ProfileModal>
                <MenuDivider />
                <MenuItem onClick={logOutHandler}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </div>
        </Box>
      </Box>

      <Drawer
        placement="left"
        onClose={onClose}
        isOpen={isOpen}
        isFullHeight="false"
        colorScheme={"whatsapp"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader textAlign={"center"} borderBottomWidth={"1px"}>
            Search Users
          </DrawerHeader>
          <DrawerBody>
            <Box display={"flex"} alignItems={"center"} pb={2}>
              <Input
                placeholder="Search by Name or Email"
                _placeholder={{ color: "#314E89" }}
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                colorScheme="facebook"
                variant="filled"
              />
              <Button size={"sm"} colorScheme="facebook" onClick={handleSearch}>
                <FaSearch />
              </Button>
            </Box>

            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}

            {loadingChat && (
              <Box
                display="flex"
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Spinner
                  size={"lg"}
                  my={5}
                  color="#314E89"
                  thickness="5px"
                  speed="0.65s"
                  emptyColor="gray.200"
                />
              </Box>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
