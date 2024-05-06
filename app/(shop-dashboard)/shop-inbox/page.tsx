export default function ShopInbox() {
  return (
    <div
      className={"flex min-h-screen w-screen flex-row items-center bg-gray-100"}
    >
      <div className={"h-screen w-[20%] border-l-2 border-r-2 border-gray-200"}>
        <div
          className={
            "flex h-[10%] w-full flex-row items-center justify-start bg-white pl-8"
          }
        >
          <h1 className={"text-2xl"}>Messages</h1>
        </div>
      </div>
      <div
        className={"flex h-screen w-full flex-col items-center justify-start"}
      >
        <div
          className={
            "flex h-[10%] w-full flex-col items-start justify-center bg-white pl-8"
          }
        ></div>
      </div>
    </div>
  );
}
