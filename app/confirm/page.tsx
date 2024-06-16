export default function Confirm({
  searchParams,
}: {
  searchParams: { con: string };
}) {
  return (
    <div className="w-full sm:max-w-md px-5 justify-center">
      <h1 className="text-2xl mt-10 mb-6 font-bold">
        Verify Your Emial to Get Started
      </h1>
      <p className="bg-white p-5 text-justify">
        A confirmation link has been sent to your email address{" "}
        {searchParams.con}. Click the link to verify your account and unlock
        full access.
      </p>
    </div>
  );
}
