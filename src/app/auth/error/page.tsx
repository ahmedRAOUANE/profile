export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  const params = await searchParams;
  console.log("params from error page: ", params)

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      Error Page
    </div>
  );
}
