import { StyleSheet, TouchableOpacity } from "react-native";
import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../../../components/firebase";
import { SvgUri } from "react-native-svg";

import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, VStack, View, FlatList } from "native-base";
import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { useUserStore } from '../../components/stores/userStore';

// IMPORT ALL COURSES PAGE
import allCourses from "../allCourses"

// define an interface for course data (used for typescript at times)
// refers to each individual course entry i'm trying to pull from the db (there is more to it though)
interface Course {
  id: string;
  name: string;
}

export default function Page() {

  // when using useState the first thing is the variable and the second is the function to set the data to that variable
  const [courseData, setCourseData] = useState<Course[]>([]); // initializing as an empty array
  // when this component is rerendered the data in courseData will be kept

  const router = useRouter();
  // the difference is whenever this page rerenders 31 it will reinitialize this reference. 
  // and create a new reference for this courseDatas variable and assign a new empty array to it 
  const courseDatas = [];

  // get the token 
  const {token} = useUserStore();

  // loads when you open the page 
  useEffect(() => {
    fetch("http://localhost:8080/customCourses/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((response) => {
      // check for the response
      if (!response.ok) {
        return Promise.reject('Server Error');
      }
      return response.json();
    })
    .then(data => { // .then accepts a callBack which returns a 
      // set the courseData state variable to the fetched datafkdnjkdng
      setCourseData(data); 
    })
    .catch((err) => {
      console.log(err);
    });
  }, []); // use Effect needs []. inside it can be a dependency or variable that if it changes useEffect runs again (a condition for useEffect to run)

    console.log(courseData);

  // async function handleExit(){
  // // add authentication to verify the data the user pulls is theirs

  // // get all the courses in a list
  // fetch("http://localhost:8080/course/get", {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json"
  //   }
  // }).catch((err) => {
  //   console.log(err);
  // });
  // console.log("fetch custom courses 'get' method ran");
  // }

  // return (
  //   <View style={styles.container}>
  //     <FlatList
  //       data={[
  //         {key: 'Devin'},
  //         {key: 'Dan'},
  //         {key: 'Dominic'},
  //         {key: 'Jackson'},
  //         {key: 'James'},
  //         {key: 'Joel'},
  //         {key: 'John'},
  //         {key: 'Jillian'},
  //         {key: 'Jimmy'},
  //         {key: 'Julie'},
  //       ]}
  //       renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
  //     />
  //   </View>
  // );

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
      {/* <TouchableOpacity onPress={() => navigation.navigate('ViewAllCourses')}>
        <Text>View All</Text>
      </TouchableOpacity> */}

      <TouchableOpacity style= {styles.rightItem} onPress={() => router.push("/allCourses/")}>
        <Text>View All</Text>
      </TouchableOpacity>
    </View>

    {/* Horizontal flex box for the courses taken */}
    <View style={styles.horizontalFlexCourses}>
      <View style={styles.courseItemHorizontal}>
          <Text>Course One</Text>  
      </View>
      <View style={styles.courseItemHorizontal}>
          <Text>Course Two</Text>
      </View>
      <View style={styles.courseItemHorizontal}>
          <Text>Course Three</Text>
      </View>
    </View>

    <View>
      {/* Vertical Flex Box */}
      <View style={styles.verticalFlex}>
      {
        courseData.map(el => (
          <View style={styles.verticalItem}>
            <Text>{el.name}</Text>
          </View>
        ))
      }
        <View style={styles.verticalItem}>
          <Text>Vertical Item 1</Text>
        </View>
        <View style={styles.verticalItem}>
          <Text>Vertical Item 2</Text>
        </View>
        <View style={styles.verticalItem}>
          <Text>Vertical Item 3</Text>
        </View>
        <View style={styles.verticalItem}>
          <Text>Vertical Item 4</Text>
        </View>
        <View style={styles.verticalItem}>
          <Text>Vertical Item 5</Text>
        </View>
        <View style={styles.verticalItem}>
          <Text>Vertical Item 6</Text>
        </View>
      </View>
    </View></>
    
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
