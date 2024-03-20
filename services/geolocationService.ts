import { RepairShop } from "@/types";

export default async function getGeolocation(shops: RepairShop[] | null) {
  const coordinatesPromises = shops?.map(async (shop) => {
    const address = encodeURIComponent(
      shop.street_address + " " + shop.postal_code + " " + shop.city,
    );

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
    );

    const data = await response.json();

    if (data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return {
        name: shop.name,
        lat: location.lat,
        lng: location.lng,
      };
    } else {
      return null;
    }
  });

  // @ts-ignore
  const coordinates = (await Promise.all(coordinatesPromises)).filter(
    (coord) => coord !== null,
  );

  return coordinates;
}
