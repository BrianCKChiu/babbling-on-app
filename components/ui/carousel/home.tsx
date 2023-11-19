import { useRouter } from "expo-router";
import { Box, Pressable, View, Text } from "native-base";
import React, { useState } from "react";
import Carousel, { Pagination } from "react-native-snap-carousel";

export function HomeCarousel() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardItems] = useState([
    {
      path: "/quiz/",
      title: "Daily Quiz",
    },
    {
      path: "/quiz/",
      title: "Weekly Quiz",
    },
    {
      path: "/lessons",
      title: "Start Learning",
    },
  ]);

  function cardItem({
    item,
    index,
  }: {
    item: { path: string; title: string };
    index: number;
  }) {
    return (
      <View>
        <Pressable
          key={index}
          w={"full"}
          h={"200px"}
          borderRadius={"xl"}
          bgColor={"blue.200"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          onPress={() => {
            router.push({
              pathname: item.path,
            } as never);
          }}
        >
          <Box>
            <Text fontSize="2xl" fontWeight="bold">
              {item.title}
            </Text>
          </Box>
        </Pressable>
      </View>
    );
  }
  return (
    <View>
      <Carousel
        layout={"default"}
        data={cardItems}
        renderItem={cardItem}
        sliderWidth={400}
        itemWidth={400}
        windowSize={1}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
      <Pagination
        dotsLength={cardItems.length}
        activeDotIndex={activeIndex}
        containerStyle={{
          backgroundColor: "transparent",
          paddingVertical: 10,
          marginBottom: 12,
        }}
        dotStyle={{
          width: 7,
          height: 7,
          borderRadius: 5,
          marginHorizontal: -10,

          backgroundColor: "rgba(0, 0, 0, 0.92)",
        }}
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
}
