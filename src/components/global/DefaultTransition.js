import { Transition } from "@headlessui/react";

export const DefaultTransition = ({ children, className }) => {
  return (
    <Transition
      appear={true}
      show={true}
      enter="transition-opacity duration-1000"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-1000"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className={className}
    >
      {children}
    </Transition>
  );
};
