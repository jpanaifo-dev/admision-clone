interface ProgressCircleProps {
  percentage: number
  size?: number
  strokeWidth?: number
}

export const ProgressCircle = ({
  percentage,
  size = 160, // 32px * 4 to match the previous size
  strokeWidth = 10,
}: ProgressCircleProps) => {
  // Calculate the circle's properties
  const center = size / 2
  const radius = center - strokeWidth / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        className="-rotate-90"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          className="stroke-current text-gray-100"
          cx={center}
          cy={center}
          fill="none"
          r={radius}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <circle
          className="stroke-current text-green-500"
          cx={center}
          cy={center}
          fill="none"
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex flex-col items-center p-6">
        <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 text-gray-400"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <span className="text-3xl font-bold text-green-500">{percentage}%</span>
        <span className="text-sm text-green-500">Completado</span>
      </div>
    </div>
  )
}
