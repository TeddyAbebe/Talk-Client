import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "../ChatLoading/ChatLoading";
import { getSender } from "../../Config/ChatLogics";
import { ChatState } from "../../Context/ChatProvider";
import GroupChatModal from "../Miscellaneous/GroupChatModal";
import { FaUsers, FaUser } from "react-icons/fa";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const [loading, setLoading] = useState(false);
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        "https://talk-server-inm8.onrender.com/api/chat",
        config
      );

      setChats(data);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir={"column"}
      alignItems={"center"}
      p={3}
      bg={"white"}
      w={{ base: "100%", md: "31%" }}
      borderRadius={"lg"}
      borderWidth={"1px"}
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily={"Work sans"}
        display={"flex"}
        w={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        My Chats
        <GroupChatModal>
          <Button
            display={"flex"}
            fontSize={{ base: "15px", md: "10px", lg: "15px" }}
            rightIcon={<AddIcon />}
            colorScheme="facebook"
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>

      <Box
        display={"flex"}
        flexDir={"column"}
        p={3}
        bg={"#F8F8F8"}
        w={"100%"}
        h={"100%"}
        borderRadius={"lg"}
        overflowY={"hidden"}
      >
        {loading ? (
          <ChatLoading skeletonHeight="40px" />
        ) : (
          <>
            {chats ? (
              <Stack overflowY={"scroll"}>
                {chats?.map((chat) => (
                  <Box
                    onClick={() => setSelectedChat(chat)}
                    cursor={"pointer"}
                    bg={selectedChat === chat ? "#314E89" : "#E8E8E8"}
                    color={selectedChat === chat ? "white" : "black"}
                    px={3}
                    py={2}
                    borderRadius={"lg"}
                    key={chat?._id}
                  >
                    <Text>
                      {!chat.isGroupChat ? (
                        <Box
                          display={"flex"}
                          alignItems={"center"}
                          gap={"10px"}
                          fontFamily={"Work sans"}
                          fontWeight={"bold"}
                        >
                          <FaUser />
                          {getSender(loggedUser, chat.users)}
                        </Box>
                      ) : (
                        <Box
                          display={"flex"}
                          alignItems={"center"}
                          gap={"10px"}
                          fontFamily={"Work sans"}
                          fontWeight={"bold"}
                        >
                          <FaUsers />
                          {chat.chatName}
                        </Box>
                      )}
                    </Text>
                  </Box>
                ))}
              </Stack>
            ) : (
              <></>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
