import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text } from "native-base";
import React, { useState, useEffect } from "react";
// import { Image } from "react-native";
import SAHeaderSection from "../../../components/ui/selfAssessment/headerSection";
import DescriptionSection from "../../../components/ui/selfAssessment/descriptionSection";
import CustomButton from "../../../components/ui/selfAssessment/customButton";
import { useAuthState } from "react-firebase-hooks/auth";

// helper
import { auth } from "../../../components/firebase";
import { TouchableOpacity } from "react-native";

interface Course {
  id?: string;
  name: string;
  description: string;
  lessons: Lesson[];
}

interface Lesson {
  id?: string;
  name: string;
  description: string;
  courseId: string;

  gestures: any[];
}


const lessonFetchFun = async (token: string, lessonId: string, setLessonData: Function) => {
  
  console.log("lessonId inside LessonFetchFun: ", lessonId);

  const lessonResponse = await fetch("http://localhost:8080/lesson/getLesson", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, lessonId: lessonId }),
  })

  if (!lessonResponse.ok) {
    return Promise.reject("Server Error");
  }

  // EDIT
  //@ts-ignore
  const lessonData = await lessonResponse.json();
  console.log("lessonData inside LessonFetchFun: ", lessonData);  
  setLessonData(lessonData);
}

export default function Page() {
  const [courseData, setCourseData] = useState<Course>();
  const [lessonData, setLessonData] = useState<Lesson>();
  const [user] = useAuthState(auth);
  const router = useRouter();

  // Get courseId param
  const { courseId } = useLocalSearchParams();
  console.log(courseId);

  useEffect(() => {
    fetch("http://192.168.1.121:8080/customCourses/getCourse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ courseId }),
    })
      .then((response) => {
        // check for the response
        if (!response.ok) {
          return Promise.reject("Server Error");
        }
        return response.json();
      })
      .then((data) => {
        // .then accepts a callBack which returns a
        // set the courseData state variable to the fetched datafkdnjkdng
        console.log("Log before setCourseData:", data);
        setCourseData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // useEffect

  // if (courseData && courseData.lessons) {
  //   courseData.lessons.forEach((lesson, index) => {
  //     console.log(`Lesson ${index + 1}: ${lesson.name}`);
  //   });
  // }
  return (
    <View>
      <SAHeaderSection text={courseData?.name || ""} />
      <DescriptionSection bodyText={courseData?.description || ""} />

      <Text>Lessons</Text>

          {/* pass the index of the lesson to the lessonFetchFun */}
          {courseData?.lessons.map((lesson, index) => {
            return (
              <></>
            //   <CustomButton
            //       text={lesson.name}                
            //       buttonColor="white"
            //       style={{marginTop: 10}}
            //       onPress={ async () => 
            //       {

            //       const token = await user?.getIdToken()

            //       fetch("http://192.168.1.121:8080/progressRouter/startedALesson", {
            //             method: "POST",
            //             headers: {
            //       "Content-Type": "application/json",
            //         },
            //       body: JSON.stringify({ courseId, lessonId: lesson.id, currentIndex: index, gestureId: lesson.gestures[0].id, token: token }),
            //       })
            //       .then((response) => {
            //         // check for the response
            //       if (!response.ok) {
            //       return Promise.reject("Server Error");
            //     }
            //       return response.json();
            //   })
            //   .then((data) => {
            //   // .then accepts a callBack which returns a
            //   // set the courseData state variable to the fetched datafkdnjkdng
            //   console.log("Log before setCourseData:", data);
            //   setCourseData(data);
            // })
            // .catch((err) => {
            //   console.log(err);
            // });
 
            //         lessonFetchFun(token || "", lesson.id || "", setLessonData);
            //       }
            //     }
            //   />
            )
          })}

          {/* <CustomButton
        text="Start"
        buttonColor="white"
        onPress={ () =>
      
            router.push({
              pathname: "/course/customlesson",
              params: {
                lessonId: courseData?.lessons[0]?.id || "",
              },
            })
        }
      /> */}
    </View>
  );
}

// create a table that joins the two entities

// create a table that joins the two entities
