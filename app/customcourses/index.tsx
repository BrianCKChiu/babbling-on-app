import { Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { SvgUri } from "react-native-svg";

import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, VStack, View, FlatList } from "native-base";
import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';

// FOR TOKEN
import { useUserStore } from '../../components/stores/userStore';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../../components/firebase';

// IMPORT ALL COURSES PAGE
import allCourses from "../allCourses"

// define an interface for course data (used for typescript at times)
// refers to each individual course entry i'm trying to pull from the db (there is more to it though)
interface Course {
  id: string;
  name: string;
}

export default function Page() {

  const [otherCourses, setOtherCourses] = useState<Course[]>([]);
  const [myCourses, setMyCourses] = useState<Course[]>([]);

  const {token} = useUserStore();
  const router = useRouter();
  // the difference is whenever this page rerenders 31 it will reinitialize this reference. 
  // and create a new reference for this customCoursess variable and assign a new empty array to it 

  // GET THE TOKEN
  // const {token} = useUserStore();
  // const [user] = useAuthState(auth);
  // const token = await user?.getIdToken();

  useEffect( () => {

    console.log("------------------------------Before fetch requests");
    const getCoursesURL = "http://localhost:8080/customCourses/getMyCourses";

    const fetchCourses = async () => {
      if (!token || token === "") {
        console.log("Token is empty or undefined");
        return;
      }
    try {
      const response = await fetch(getCoursesURL, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({token}),
      });

      // IF REQUEST DOES NOT RETURN ANYTHING IT IS REJECTED
      if (!response.ok){
        console.log("SERVER ERROR")
        return Promise.reject("Server Error"); // STUCK HEREEEEE
      }

      // IF IT DOES DATA IS THE PARSED JSON DATA 
      const { myCourses, otherCourses } = await response.json();

      // SET COURSES
      setOtherCourses(otherCourses);
      setMyCourses(otherCourses);
    
      console.log("data is set"); //  not getting here
    } catch(error) {
      console.error(error);
    }
      // const fetchCustomCourses = fetch(getCustomCoursesURL, {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
  
      // const fetchMyCourses = fetch(getMyCoursesURL, {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   // body: JSON.stringify({ token }),
      // });

    // Promise.all([fetchCustomCourses, fetchMyCourses])
    // .then((responses) => { // CAN ONLY RUN IF THE FETCH RETURNS SOMETHING

    //   console.log("responses",responses); // not getting here 

    //   const [customCoursesResponse, myCoursesResponse] = responses;

    //   if (!customCoursesResponse.ok || !myCoursesResponse.ok) {
    //     console.log("SERVER ERROR")
    //     return Promise.reject('Server Error');
    //   }

    //   return Promise.all([
    //     customCoursesResponse.json(),
    //     myCoursesResponse.json()
    //   ]);
    // })
    // // WILL BE SKIPPED IF THE FETCH REQUEST RETURNS NULL 
    // .then(([customCourses, myCourses]) => {
    //   // SET COURSES 
    //   setCustomCourses(customCourses);
    //   setMyCourses(myCourses);

    //   console.log("data is set");
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
      // }, [token]); // use Effect needs []. inside it can be a dependency or variable that if it changes useEffect runs again (a condition for useEffect to run)
  };
  fetchCourses();
}, [token]);

  // updates customCourses
  useEffect(() => {
    console.log("otherCourses", otherCourses);
  }, [otherCourses]);

  const onPressHandler = () => {
    router.push("/allCourses/");
  };

  return (
    <><View style={styles.horizontalFlexMenu}>
      {/* Horizontal flexbox for the menu */}
      <View style={styles.leftItem}>
        <Text style={styles.title}>My Courses</Text>
        {/* <SvgUri
  width="100%"
  height="100%"
  uri='assets/customCourses/filter-list.svg'
    /> */}
      </View>
      <View style={styles.circleStyle}>
        {/* Circle */}
        <View style={styles.circle} />
      </View>

    </View>

    {/* Horizontal flex box for View All */}
    <View style={styles.viewAllFlexBox}>
      <Pressable style={styles.rightItem} onPress={() => onPressHandler()}>
        <Text>View All</Text>
      </Pressable>
    </View>

    {/* Horizontal flex box for the courses taken */}
    <View style={styles.horizontalFlexCourses}>
        {myCourses.map((myCourse) => (
          <View style={styles.courseItemHorizontal} key={myCourse.id}>
            <Text>{myCourse.name || "No name"}</Text>
    </View>
        ))}
    </View> 

    <View>
      {/* Vertical Flex Box */}
      <View style={styles.verticalFlex}>
      {
        otherCourses.map(otherCourse => (
          <View style={styles.verticalItem} key={otherCourse.id}>
            <Text>{otherCourse.name || "No name"}</Text>
          </View>
        ))
      }
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  viewAllFlexBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10
  },
  horizontalFlexMenu: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center', 
    padding: 10,
  },
  horizontalFlexCourses: {
    flexDirection: 'row',
    // flex: 1, vb
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 15, 
  },
  leftItem: {
    flex: 1,
    paddingLeft: 10, 
    paddingTop: 10,
  },
  rightItem: {
    flex: 1, 
    alignItems: 'flex-end', 
    paddingRight: 25, 
    paddingTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'normal',
    fontFamily: 'Arial'
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'center',
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
    backgroundColor: 'black',
  },
  circleStyle: {
    flex: 1, 
    alignItems: 'flex-end', 
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
    backgroundColor: '#FFDC5F',
    height: 110,
    borderRadius: 5,
  },
  courseTitle: {
    fontSize: 16,
  },

  verticalFlex: {
    flexDirection: 'column', // Vertical layout
    justifyContent: 'space-between', 
    padding: 15,
    gap: 20, // Added a background color for clarity
  },
  verticalItem: {
    padding: 20, 
    height: 80,
    width: 360,
    backgroundColor: '#FFDC5F',
    borderRadius: 5,
    // borderWidth: 1,
    borderColor: 'black',
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: "80%",
//   },
// });
