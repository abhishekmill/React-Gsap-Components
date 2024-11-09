import ParallaxContainer from "./comp/TrackButton";
import { GiCoffeeCup } from "react-icons/gi";
import { FaYoutube } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai";
import ButtonComponent from "./comp/ButtonComp";
import AnimatedText from "./comp/TextAnim";
import Marquee from "./comp/Carousel";
import ScrollMarquee from "./comp/ScrollCarousl";
import Preloader from "./comp/Preloader";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <Preloader loading={loading} />

      {!loading && (
        <div className="w-full  h-[200vh] ">
          <div>
            <div className="flex h-screen items-center justify-center">
              <ParallaxContainer icon={<GiCoffeeCup className="text-xl" />} />
              <ParallaxContainer icon={<FaYoutube className="text-xl" />} />
              <ParallaxContainer icon={<AiFillGithub className="text-xl" />} />

              <ButtonComponent text="Abhishek" classname={"font-semibold"} />
            </div>
            <ScrollMarquee direction="right">
              <div className="flex justify-around w-[100vw]">
                <div>
                  <img className="w-16" src="./1.png" alt="" />
                </div>
                <div>
                  <img className="w-16" src="./2.png" alt="" />
                </div>
                <div>
                  <img className="w-16" src="./3.png" alt="" />
                </div>
              </div>
            </ScrollMarquee>
            <div
              className="w-full h-20
            "
            ></div>
            <ScrollMarquee direction="left">
              <div className="flex justify-around w-[100vw]">
                <div>
                  <img className="w-16" src="./1.png" alt="" />
                </div>
                <div>
                  <img className="w-16" src="./2.png" alt="" />
                </div>
                <div>
                  <img className="w-16" src="./3.png" alt="" />
                </div>
              </div>
            </ScrollMarquee>
          </div>
          <div className="m-10  ">
            <AnimatedText
              className={"font-semibold text-[5vw] md:text-3xl    "}
            >
              <span className="text-[10vw] md:my-10  ">Abhishek Verma</span>
              <p className="w-full">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque
                ad pariatur soluta rerum neque, molestias velit minima itaque,
                natus quod ea laboriosam doloremque consequuntur provident,
                placeat iure sint earum aut? asewdawd
              </p>
            </AnimatedText>
          </div>
          <Marquee hoverPause speed={5}>
            <div className="flex justify-around w-[100vw]">
              <div className="hover:rotate-45  duration-200">
                <img className="w-16" src="./1.png" alt="" />
              </div>
              <div className="hover:rotate-45  duration-200">
                <img className="w-16" src="./2.png" alt="" />
              </div>
              <div className="hover:rotate-45  duration-200">
                <img className="w-16" src="./3.png" alt="" />
              </div>
            </div>
          </Marquee>
          <div></div>
        </div>
      )}
    </>
  );
}

export default App;
