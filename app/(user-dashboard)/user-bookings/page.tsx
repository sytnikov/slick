import { getUser, getUsersBookings } from "@/server/user-authentication/actions"

export default async function UserBookings() {
  const user = await getUser()
  const bookings2 = await getUsersBookings()
  
  return (
    <div
      className={"flex h-full w-full flex-col items-start justify-start p-12"}
    >
      <div className={"flex w-full flex-row justify-between"}>
        <p className={"mb-6 animate-fadeInUp text-3xl  font-bold"}>Bookings</p>
      </div>
      <div className={"h-full w-full animate-fadeInUp "}>
       
       {bookings2.map(booking => (
        <div key={booking.id}>
          {booking.shop_service_id}
        </div>
       ))}
      </div>
    </div>
  )
}
