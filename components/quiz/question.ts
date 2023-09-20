import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { generateUuid62 } from "../utils/uuid";
import { db } from "../firebase";

type QuestionType = "mcq" | "matching";

export abstract class Question {
  private id: string;
  private type: QuestionType | undefined;

  constructor(type?: QuestionType) {
    this.id = generateUuid62();
  }
  getId() {
    return this.id;
  }
  getType() {
    return this.type;
  }
}
export class QuestionMcq extends Question {
  private gesture: { gestureId: string; mediaRef: string };
  private choices: Array<string>;

  constructor(
    gesture: { gestureId: string; mediaRef: string },
    choices: Array<string>
  ) {
    super("mcq");
    this.gesture = gesture;
    this.choices = choices;
  }
  getGesture() {
    return this.gesture;
  }
  getChoices() {
    return this.choices;
  }
}

export class QuestionMatching extends Question {
  private gestures: [{ gestureId: string; mediaRef: string }];

  constructor(gestures: [{ gestureId: string; mediaRef: string }]) {
    super("matching");
    this.gestures = gestures;
  }
  getGestures() {
    return this.gestures;
  }
}

// translate GestureMedia object into prisma table
type GestureMedia = {
  id: string;
  type: "image" | "video";
  gestureId: string; // reference to gesture in prisma table
  mediaRef: string; // reference to media in firebase storage
};
// translate gesture object into prisma table
type Gesture = {
  id: string;
  phrase: string;
  topic: string;
};
