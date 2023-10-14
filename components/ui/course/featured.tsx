import { View, VStack, Heading, Text, Box, ScrollView } from "native-base";
import React, { useEffect, useState } from "react";
import { post } from "../../api/backend";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import Carousel, { Pagination } from "react-native-snap-carousel";

export function FeaturedCourses() {
  const [courses, setCourses] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const [user] = useAuthState(auth);

  useEffect(() => {
    loadFeaturedCourses();
  }, []);

  async function loadFeaturedCourses() {
    if (user == null) return;

    const token = await user.getIdToken();
    console.log(token);
    await post({
      endpoint: "customCourses/featured",
      body: {
        token: token,
      },
    })
      .then(async (res) => {
        const json = await res.json();
        console.log(json.courses.length);
        setCourses(json.courses);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function renderCourses() {
    const elements = [];
    courses.map((course, index) => {
      elements.push(<CourseItem item={course} index={index} />);
    });
    return elements;
  }

  return (
    <View>
      <VStack>
        <Heading>Featured Courses</Heading>
        <ScrollView mx={"-10px"} horizontal={true} mt={2} pb={3}>
          {renderCourses()}
        </ScrollView>
      </VStack>
    </View>
  );
}
function CourseItem({
  item,
  index,
}: {
  item: { title: string };
  index: number;
}) {
  return (
    <VStack w={"230px"} mx={2}>
      <Box
        key={index}
        bgColor={"violet.300"}
        h={"90px"}
        roundedTop={"xl"}
        display={"flex"}
        justifyItems={"end"}
      />
      <Box w={"full"} bgColor={"white"} roundedBottom={"xl"} p={"3"}>
        <Text fontWeight={"semibold"} textTransform={"capitalize"}>
          {item.name}
        </Text>
      </Box>
    </VStack>
  );
}
