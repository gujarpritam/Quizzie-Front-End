import ShowQuiz from "../../components/ShowQuiz/ShowQuiz";
import { useParams } from "react-router-dom";
import styles from "./QuizPage.module.css";

function QuizPage() {
  const { id } = useParams();
  return (
    <div>
      <ShowQuiz id={id} />
    </div>
  );
}

export default QuizPage;
