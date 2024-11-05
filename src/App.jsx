import ParallaxContainer from "./comp/TrackButton";
import { GiCoffeeCup } from "react-icons/gi";
import { FaYoutube } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai";
import ButtonComponent from "./comp/ButtonComp";
import AnimatedText from "./comp/TextAnim";

function App() {
  return (
    <>
      <div className="w-full  h-screen flex flex-col items-center justify-center">
        <div className="flex">
          <ParallaxContainer icon={<GiCoffeeCup className="text-xl" />} />
          <ParallaxContainer icon={<FaYoutube className="text-xl" />} />
          <ParallaxContainer icon={<AiFillGithub className="text-xl" />} />

          <ButtonComponent text="Abhishek" classname={"font-semibold"} />
        </div>
        <div className="m-10">
          <AnimatedText className={"font-semibold text-3xl "}>
            <span className="text-[100px] my-10">Abhishek Vrma</span>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque ad
            pariatur soluta rerum neque, molestias velit minima itaque, natus
            quod ea laboriosam doloremque consequuntur provident, placeat iure
            sint earum aut?
          </AnimatedText>
        </div>
      </div>
    </>
  );
}

export default App;
