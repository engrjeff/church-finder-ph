function Gradients() {
  return (
    <>
      <div
        aria-hidden="true"
        className="fixed left-0 top-0 -z-10 size-[500px] rounded-full bg-gradient-to-tr from-violet-700 to-violet-500 opacity-15 blur-[100px]"
      ></div>
      <div
        aria-hidden="true"
        className="fixed -right-60 -top-60 -z-10 size-[500px] rounded-full bg-gradient-to-tr from-violet-700 to-violet-500 opacity-10 blur-[100px]"
      ></div>
    </>
  );
}

export default Gradients;
