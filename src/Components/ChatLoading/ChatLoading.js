import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

const ChatLoading = () => {
  return (
    <Stack>
      <Skeleton height="58px" borderRadius={"8px"} />
      <Skeleton height="58px" borderRadius={"8px"} />
      <Skeleton height="58px" borderRadius={"8px"} />
      <Skeleton height="58px" borderRadius={"8px"} />
      <Skeleton height="58px" borderRadius={"8px"} />
      <Skeleton height="58px" borderRadius={"8px"} />
      <Skeleton height="58px" borderRadius={"8px"} />
      <Skeleton height="58px" borderRadius={"8px"} />
      <Skeleton height="58px" borderRadius={"8px"} />
    </Stack>
  );
};

export default ChatLoading;
