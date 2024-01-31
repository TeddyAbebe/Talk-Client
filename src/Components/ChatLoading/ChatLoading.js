import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

const ChatLoading = ({ skeletonHeight }) => {
  return (
    <Stack>
      <Skeleton height={skeletonHeight} borderRadius={"8px"} />
      <Skeleton height={skeletonHeight} borderRadius={"8px"} />
      <Skeleton height={skeletonHeight} borderRadius={"8px"} />
      <Skeleton height={skeletonHeight} borderRadius={"8px"} />
      <Skeleton height={skeletonHeight} borderRadius={"8px"} />
      <Skeleton height={skeletonHeight} borderRadius={"8px"} />
      <Skeleton height={skeletonHeight} borderRadius={"8px"} />
      <Skeleton height={skeletonHeight} borderRadius={"8px"} />
      <Skeleton height={skeletonHeight} borderRadius={"8px"} />
    </Stack>
  );
};

export default ChatLoading;
