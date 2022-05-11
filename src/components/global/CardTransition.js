import { Transition } from "@headlessui/react";

export const CardTransition = ({ children, className }) => {
  return (
    <Transition
      appear={true}
      show={true}
      enter="transition-opacity transition-transform duration-150"
      enterFrom="opacity-0 scale-50"
      enterTo="opacity-100 scale-100"
      leave="transition-opacity transition-transform duration-150"
      leaveFrom="opacity-100 scale-50"
      leaveTo="opacity-0 scale-0"
      className={className}
    >
      {children}
    </Transition>
  );
};
