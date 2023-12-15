import { useLocalSearchParams, useRouter } from "expo-router";
// import { Text, VStack, View, FlatList } from "native-base";
import { View } from "native-base";
import React, { useState, useEffect } from "react";
// import { Image } from "react-native";
import SAHeaderSection from "../../components/ui/selfAssessment/headerSection";
import DescriptionSection from "../../components/ui/selfAssessment/descriptionSection";
import CustomButton from "../../components/ui/selfAssessment/customButton";
import { useAuthState } from "react-firebase-hooks/auth";
import { StyleSheet } from 'react-native';

// helper
import { auth } from "../../components/firebase";

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
}

//@ts-ignore
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

  const lessonData = await lessonResponse.json();
  console.log("lessonData inside LessonFetchFun: ", lessonData);  
  setLessonData(lessonData);
}

export default function Page() {
  const [courseData, setCourseData] = useState<Course>();

  // @ts-ignore
  const [lessonData, setLessonData] = useState<Lesson>();
  const [user] = useAuthState(auth); 
  const router = useRouter();

  // Get courseId param
  const { courseId } = useLocalSearchParams();
  console.log(courseId);

  useEffect(() => {
    fetch("http://localhost:8080/customCourses/getCourse", {
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
  console.log("Course Data log before Return:", courseData);
  return (
        <View>
          <SAHeaderSection text={courseData?.name || ''} />
          <DescriptionSection bodyText={courseData?.description || ''} />


          {courseData?.lessons.map((lesson) => {
            return (
              <CustomButton
                  key={lesson.id}
                  text={lesson.name}
                  buttonColor="white"
                  style={styles.button}
                  onPress={ async () => 
                  {const token = await user?.getIdToken()
                    lessonFetchFun(token || "", lesson.id || "", setLessonData);
                    router.push(`/course/customlesson?lessonId=${lesson.id}`);
                  }
                }
              />
            )
          })}
        </View>
      );

    }

      const styles = StyleSheet.create({
        button: { // because i dont have width: it will use the one from the parent aka customButton styling. 
        height: '10%',
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center', 
        padding: 29,
        marginLeft: 14,
        marginRight: 14,
        marginBottom:0,
        marginTop: '5%',
        backgroundColor: "white",
        borderWidth:1,
        borderColor:'#D8D8D8',
      },
      buttonText: {
        color: 'black',
        fontSize: 22,
        fontWeight: 'bold'
      },
    });
