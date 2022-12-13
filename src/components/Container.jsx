export const Container = ({ size = "lg", className, ...props }) => {
  const width = size === "lg" ? "max-w-5xl" : "max-w-2xl";

  return (
    <div
      className={`mx-auto px-5 lg:px-0 ${width} w-full ${className}`}
      {...props}
    >
      {props.children}
    </div>
  );
};
