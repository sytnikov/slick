export const useGetStorageAssets = () => {
  const getSpecificWebsiteAsset = (folder: string, assetName: string) => {
    return `${process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL}/Website%20Assets/${folder}/${assetName}`;
  };

  return {
    getSpecificWebsiteAsset,
  };
};
