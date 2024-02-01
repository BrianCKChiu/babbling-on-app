import React, { useState, useEffect } from "react";
import { DefaultLayout } from "@/layout/defaultLayout";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View, Box, ScrollView } from "native-base";

import { useRouter } from "expo-router";
import { useAuthState } from "react-firebase-hooks/auth";

// helper
import { auth } from "@/firebase";

// types
import { Course } from "../../components/types/course/course";
import { CourseItem } from "../../components/ui/course/courseItem";

// explore
const ExploreCourses = () => {
  const [exploreCourses, setExploreCourses] = useState<Course[]>([]);
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const [user] = useAuthState(auth); 
  const router = useRouter();

  console.log("inside explore courses constructor");

  useEffect(() => {
    if (user == null) return;
    const getCoursesURL = "http://192.168.1.121:8080/customCourses/exploreCoursesRoute";

    const fetchCourses = async () => {
      const token = await user.getIdToken();
      if (!token || token === "") {
        console.log("Token is empty or undefined");
        return;
      }
      console.log(token);
      try {
        const response = await fetch(getCoursesURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) {
          console.log("SERVER ERROR");
          return Promise.reject("Server Error");
        }

        const { exploreCourses, featuredCourses } = await response.json();

        setExploreCourses(exploreCourses);
        setFeaturedCourses(featuredCourses);

        console.log("explore Courses after setExploreCourses:", exploreCourses);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourses(); // calling it 
  }, [user]);

  console.log("featured courses before render featured courses: ", featuredCourses); // null

  function renderFeaturedCourses() {
    console.log("featured courses before map: ", featuredCourses);

    // const courses: JSX.Element[] = [];
    return featuredCourses.map((course: Course, index) => {
      // courses.push(
        return <CourseItem key={index} course={course}></CourseItem>
      // );
    });
    // return courses;
  }

  console.log("explore courses before render explore courses: ", featuredCourses);

  function renderExploreCourses() {
    console.log("explore courses before map: ", exploreCourses);

    // const courses: JSX.Element[] = [];
    return exploreCourses.map((course: Course, index) => {
      // courses.push(
        return <CourseItem key={index} course={course}></CourseItem>        
      // );
    });
    // return courses;
  }

  // check the explore courses after the update
  useEffect(() => {
    console.log("exploreCourses after update: ", exploreCourses);
  }, [exploreCourses]);
  
  // const onPressHandler = () => {
  //   router.push("/course/allCourses/");
  // };
  return (
    <ScrollView>
      {/* Button for see more courses */}
      {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
        style={{
          width: Dimensions.get('window').width - 20,
          padding: 15,
          backgroundColor: 'yellow',
          borderRadius: 10,
          alignItems: 'center',
        }}
      >
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>See More</Text>
          </TouchableOpacity>
      </View> */}

        <Text
          fontWeight="semibold"
          fontSize={20}
          >
            Explore Courses
          </Text>
      {renderExploreCourses()}

      <TouchableOpacity
      style = {{margin: 10}}
      onPress={() =>
        router.push({
          pathname: "/course/allCourses", 
        })
      }
      >
      <Box
        h={"50px"}
        w={"380px"} // make this flexible later
        borderRadius={"30px"}
        backgroundColor={"#FFE500"}
        padding={"15px"}
      >
        <Text
        fontSize={"16px"}
        fontWeight={"semibold"}
        textAlign={"center"}
        >More Courses</Text>
      </Box>
      </TouchableOpacity>

    <Text
    fontWeight="semibold"
    fontSize={20}
    >
     Featured Courses
    </Text>
      {renderFeaturedCourses()}
    </ScrollView>
  );
}

// custom courses 
const CustomCourses = () => {
  const [otherCourses, setOtherCourses] = useState<Course[]>([]);
  const [myCourses, setMyCourses] = useState<Course[]>([]);
  const [user] = useAuthState(auth); 
  const router = useRouter();

  console.log("inside custom courses constructor");

  // const otherCoursesElements = renderCustomCourses();
  // const myCoursesElements = renderCourseHistory();

  // pathname
  // const pathname = "/courses/CustomCourses";

  useEffect(() => { 
    if (user == null) return;
    const getCoursesURL = "http://192.168.1.121:8080/customCourses/customCoursesRoute";

    const fetchCourses = async () => {
      const token = await user.getIdToken();
      if (!token || token === "") {
        console.log("Token is empty or undefined");
        return;
      }

      console.log(token);
      try {
        const response = await fetch(getCoursesURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) {
          console.log("SERVER ERROR");
          return Promise.reject("Server Error");
        }
        
        const { myCourses, otherCourses } = await response.json();

        setOtherCourses(otherCourses);
        setMyCourses(myCourses);

      } catch (error) {
        console.error(error);
      }
    };
    fetchCourses();
  }, [user]);

  // render courses taken by the user
  function renderCourseHistory() {

    console.log("my courses before map: ", myCourses);
    // const myCoursesElements: JSX.Element[] = [];
    return myCourses?.map((course: Course, index) => {
      // myCoursesElements.push(
        return <CourseItem key={index} course={course}></CourseItem>
      // );
    });
    console.log("my courses: ", myCourses);
    // return myCourses;
  }


  // render all other custom courses
  function renderCustomCourses() {
    // const otherCoursesElements: JSX.Element[] = [];
    console.log("other courses before map: ", otherCourses);
    return otherCourses?.map((course: Course, index) => { 
      // otherCoursesElements.push( 
        return <CourseItem key={index} course={course}></CourseItem>
      // );
    });

    console.log("other courses: ", otherCourses);
    // return otherCourses;
  }

  return (
    <ScrollView>
    {/* {otherCoursesElements} */}

    <Text
    fontWeight="semibold"
    fontSize={20}
    >
      My Courses
    </Text>
    {renderCourseHistory()}

    {/* button here */}
    <TouchableOpacity
      style = {{margin: 10}}
      onPress={() =>
        router.push({
          pathname: "/course/allCourses", 
        })
      }
      >
      <Box
        h={"50px"}
        w={"380px"} // make this flexible later
        borderRadius={"30px"}
        backgroundColor={"#FFE500"}
        padding={"15px"}
      >
        <Text
        fontSize={"16px"}
        fontWeight={"semibold"}
        textAlign={"center"}
        >More Courses</Text>
      </Box>
      </TouchableOpacity>
    
    <Text
    fontWeight="semibold"
    fontSize={20}
    >
     Custom Courses
    </Text>
    {renderCustomCourses()}
    {/* {myCoursesElements} */}
    </ScrollView>
  );
}

export default function LessonScreen() {

  const [showCustom, setShowCustom] = useState(false);

  // const [user] = useAuthState(auth); 
  // const router = useRouter();

  return (
    <ScrollView>
    <DefaultLayout style = {{ backgroundColor: "#FFFFFF" }}>

      <View style={styles.horizontalFlexMenu}>
        {/* Horizontal flexbox for the menu */}

        <TouchableOpacity onPress={() => setShowCustom(false)}>
        {/* <View style={styles.leftItem}> */}
          <Text style={styles.title}>Explore Courses</Text>
        {/* </View> */}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowCustom(true)}>
        <Text style={styles.title}>Custom Courses</Text>
        </TouchableOpacity>
      </View> 

      {showCustom ? (
        <CustomCourses /> // this is what you render when showCustom is true
      ) : (
        <ExploreCourses /> // this is what you render when showCustom is false
      )}

      {/* <Button
        onPress={() => setShowCustom(true)}> 
        <Text>Show Custom</Text>
        </Button>

      <Button 
        onPress={() => setShowCustom(false)}>
        <Text>Show Explore</Text>
        </Button> */}

    </DefaultLayout> 
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewAllFlexBox: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
  },
  horizontalFlexMenu: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 10,
  },
  horizontalFlexCourses: {
    flexDirection: "row",
    // flex: 1, vb
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  leftItem: {
    flex: 1,
    paddingLeft: 10,
    paddingTop: 10,
  },
  rightItem: {
    flex: 1,
    alignItems: "flex-end",
    paddingRight: 25,
    paddingTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Arial",
  },
  menu: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  menuImage: {
    width: 50,
    height: 50,
  },
  fishImage: {
    width: 50,
    height: 50,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "black",
  },
  circleStyle: {
    flex: 1,
    alignItems: "flex-end",
    paddingRight: 10,
    paddingTop: 10,
  },
  courseList: {
    flex: 1,
    // ...
    // Add other course list styles here
  },
  courseItemHorizontal: {
    padding: 10,
    borderBottomWidth: 1,
    backgroundColor: "#FFDC5F",
    height: 110,
    borderRadius: 5,
  },
  courseTitle: {
    fontSize: 16,
  },

  verticalFlex: {
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 15,
    gap: 20,
  },

  verticalItem: {
    padding: 10,
    height: 80,
    // width: 360,
    backgroundColor: "#F4F4F4",
    borderRadius: 5,
  },

  courseName: {
    color: "black",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Nunito",
  },

  courseLessonCount: {
    color: "#808080",
    fontSize: 12,
    fontFamily: "Nunito",
  },

  button: {

  }
});
