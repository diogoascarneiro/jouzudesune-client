import { useContext, useState } from "react";
import { DefaultTransition } from "../../components/global/DefaultTransition";
import { SectionHeader } from "../../components/global/SectionHeader";
import { UserContext } from "../../context/user.context";
import { PracticeSeen } from "../../components/landing/PracticeSeen";
import { PracticeSeenLocked } from "../../components/landing/PracticeSeenLocked";
import { PracticeRandom } from "../../components/landing/PracticeRandom";
import { ThemedDecks } from '../../components/landing/ThemedDecks';

export const StartPage = () => {
  const { user } = useContext(UserContext);
  const [randomDeckRange, setRandomDeckRange] = useState(10);
  const [seenDeckRange, setSeenDeckRange] = useState(10);
  const [seenDeckType, setSeenDeckType] = useState(null);

  return (
    <DefaultTransition className="p-5 h-[90vh]">
      <SectionHeader><span className="text-xl lg:text-3xl">Welcome back {user.username}! Let's get started.</span></SectionHeader>
      <div className="flex w-full flex-wrap lg:flex-nowrap gap-x-5 h-[85%] mb-20">
        <ThemedDecks     />
        <div className="divider divider-horizontal mt-16 hidden lg:flex">OR</div>
        <div className="flex flex-col w-full lg:w-4/6">
          <h4 className="mt-5 mb-5 lg:mt-2 lg:mb-2 text-center">Free practice</h4>
          <div className="flex flex-wrap lg:flex-nowrap gap-x-10 gap-y-5 text-center lg:h-full">
            <PracticeRandom user={user} randomDeckRange={randomDeckRange} setRandomDeckRange={setRandomDeckRange}  />
            {user.decks.length > 0 ? <PracticeSeen user={user} setSeenDeckType={setSeenDeckType} seenDeckRange={seenDeckRange} setSeenDeckRange={setSeenDeckRange} seenDeckType={seenDeckType}  /> : <PracticeSeenLocked/>}
          </div>
        </div>
      </div>
    </DefaultTransition>
  );
};
  