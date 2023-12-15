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
      <SAHeaderSection text={courseData?.name || ""} />
      <DescriptionSection bodyText={courseData?.description || ""} />

      <Text>Lessons</Text>

          {courseData?.lessons.map((lesson) => {
            return (
              <CustomButton
                  text={lesson.name}
                  buttonColor="white"
                  style={{marginTop: 10}}
                  onPress={ async () => 
                  {const token = await user?.getIdToken()
                    lessonFetchFun(token || "", lesson.id || "", setLessonData);
                  }
                }
              />
            )
          })}

          <CustomButton
        text="Start"
        buttonColor="white"
        onPress={() =>
          router.push({
            pathname: "/course/customlesson",
            params: {
              lessonId: courseData?.lessons[0]?.id || "",
            },
          })
        }
      />
    </View>
  );
}

// create a table that joins the two entities

// create a table that joins the two entities
