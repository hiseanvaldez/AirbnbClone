"use client";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div
      className="
        xm:px-2
        mx-auto
        max-w-[2500px]
        px-4
        md:px-10
        xl:px-20
      "
    >
      {children}
    </div>
  );
};

export default Container;
