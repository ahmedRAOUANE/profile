import Link from "next/link"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-center">
              🎉 Signup Successful
            </h1>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Your account has been created successfully.
              check your email to confirm
            </p>

            <div className="mt-6 flex justify-center">
              <Link
                href="/login"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Go to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
