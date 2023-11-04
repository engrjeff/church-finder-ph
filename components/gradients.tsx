function Gradients() {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-violet-700 to-violet-500 opacity-25 blur-[100px]"
      ></div>
      <div
        aria-hidden="true"
        className="absolute -right-60 -top-60 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-violet-700 to-violet-500 opacity-10 blur-[100px]"
      ></div>
    </>
  );
}

export default Gradients;
