import TextScramble from "../../components/TextScramble/TextScramble";

export default function Reg() {
  return (
    <div className="text-white w-screen h-screen flex flex-col justify-center items-center max-w-[400px] m-auto p-auto text-2xl">
      <TextScramble>
        Il vento... ora lo capisco: è come se la sua voce, rimasta imprigionata
        in questi luoghi, stesse cercando di comunicare con me. Forse voleva che
        la verità venisse finalmente svelata.
      </TextScramble>
      <div className="my-4"></div>
      <TextScramble>Ed è solo l'inizio.</TextScramble>
    </div>
  );
}
