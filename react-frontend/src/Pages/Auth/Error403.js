export default function Error403() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-12 py-8 bg-gray-50">
      <svg
        className="h-[50vh] aspect-video text-gray-800"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 500"
        fill="currentColor"
      >
        {/* background */}
        <g>
          <path
            d="M55.48,273.73s2.32,72,62.43,120,143.41,51.43,210.84,56,119.23-33.62,127-91.32-43.72-74.64-71.68-140.33S358.64,130.8,299.49,90.4,147.8,74.81,99.29,144,55.48,273.73,55.48,273.73Z"
            fill="#ffffff"
            opacity="0.7"
          />
        </g>

        {/* lock */}
        <g>
          <path
            d="M83.61,179.69V153.92c0-18.24,15.16-33.08,33.79-33.08s33.79,14.84,33.79,33.08v25.77h13.47V153.92c0-25.51-21.2-46.27-47.26-46.27s-47.26,20.76-47.26,46.27v25.77Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.16"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* أي path آخر بدون fill سيأخذ currentColor تلقائيًا */}
      </svg>

      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl font-medium text-center text-gray-800">
          You are not authorized
        </h1>

        <p className="text-xl text-center text-gray-600 max-w-xl">
          You tried to access a page you did not have prior authorization for.
        </p>
      </div>
    </div>
  );
}
